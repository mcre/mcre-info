import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "@playwright/test";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const distAssetsPath = path.join(repositoryRoot, "dist", "assets");

const rssArticles = [
  {
    title: "Generated article",
    link: "https://example.com/article",
    description: "Article description",
    published: 1_710_000_000,
    enclosure: "https://example.com/article.webp",
  },
];

test.beforeEach(async ({ page }) => {
  await page.route("https://api.mcre.info/v1/rss/**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(rssArticles),
    });
  });
});

test("profile page renders with SEO-visible content", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/mcre\.info/);
  await expect(page.getByRole("heading", { name: "mcre.info" })).toBeVisible();
  await expect(page.getByText("ものづくり欲と、ものがたり欲。")).toBeVisible();
  await expect(page.getByText("Profile")).toBeVisible();
  await expect(page.getByText("Skills")).toBeVisible();

  const face = page.getByAltText("mcre (FUJITA Shinya) の顔写真");
  await expect(face).toBeVisible();

  const faceBox = await face.boundingBox();
  expect(faceBox?.width).toBeGreaterThanOrEqual(120);
  expect(faceBox?.x).toBeGreaterThan(400);

  const firstCard = page.locator(".v-card").first();
  await expect(firstCard).toBeVisible();

  const cardBox = await firstCard.boundingBox();
  expect(cardBox?.width).toBeGreaterThan(500);
});

test("AIO and search artifacts are generated", async ({ request }) => {
  const llms = await request.get("/llms.txt");
  expect(llms.ok()).toBe(true);
  expect(await llms.text()).toContain("# mcre.info");

  const llmsFull = await request.get("/llms-full.txt");
  expect(llmsFull.ok()).toBe(true);
  expect(await llmsFull.text()).toContain("## Career");

  const markdown = await request.get("/profile.md");
  expect(markdown.ok()).toBe(true);
  expect(await markdown.text()).toContain("# mcre (FUJITA Shinya)");

  const profileJson = await request.get("/profile.json");
  expect(profileJson.ok()).toBe(true);
  expect(await profileJson.json()).toMatchObject({
    siteName: "mcre.info",
    displayName: "mcre (FUJITA Shinya)",
  });

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("User-agent: OAI-SearchBot");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("https://mcre.info/");
});

test("site uses system fonts without local webfont assets", async () => {
  const packageJson = JSON.parse(
    await readFile(path.join(repositoryRoot, "package.json"), "utf8"),
  );
  expect(packageJson.dependencies).not.toHaveProperty(
    "@fontsource/zen-maru-gothic",
  );

  const assetNames = await readdir(distAssetsPath);
  expect(
    assetNames.filter((assetName) => assetName.startsWith("fonts-")),
  ).toHaveLength(0);
  expect(
    assetNames.filter((assetName) => assetName.startsWith("zen-maru-gothic-")),
  ).toHaveLength(0);
  expect(
    assetNames.filter((assetName) => assetName.endsWith(".woff2")),
  ).toHaveLength(0);
  expect(
    assetNames.filter((assetName) => assetName.endsWith(".woff")),
  ).toHaveLength(0);

  const html = await readFile(
    path.join(repositoryRoot, "dist", "index.html"),
    "utf8",
  );
  expect(html).not.toContain("fonts-");
  expect(html).not.toContain("zen-maru-gothic");
  expect(html).not.toContain("Zen Maru Gothic");

  const appCssName = assetNames.find(
    (assetName) => assetName.startsWith("app-") && assetName.endsWith(".css"),
  );
  expect(appCssName).toBeDefined();

  const appCss = await readFile(
    path.join(distAssetsPath, appCssName ?? ""),
    "utf8",
  );
  expect(Buffer.byteLength(appCss, "utf8")).toBeLessThan(360 * 1024);
  expect(appCss).not.toContain("@font-face");
  expect(appCss).not.toContain("zen-maru-gothic-");
  expect(appCss).not.toContain("Zen Maru Gothic");
  expect(appCss).toContain("system-ui");
});

test("page does not request local webfonts", async ({ page }) => {
  const fontRequests: string[] = [];

  page.on("request", (request) => {
    const url = request.url();
    if (
      url.includes("/assets/fonts-") ||
      url.includes("/assets/zen-maru-gothic-")
    ) {
      fontRequests.push(url);
    }
  });

  await page.goto("/");
  await page.waitForTimeout(3000);

  expect(fontRequests).toEqual([]);
});

test("client hydrates the SSG markup instead of remounting it", async ({
  page,
}) => {
  const hydrationWarnings: string[] = [];

  page.on("console", (message) => {
    const text = message.text();
    if (
      ["error", "warning"].includes(message.type()) &&
      /hydration|mismatch/i.test(text)
    ) {
      hydrationWarnings.push(text);
    }
  });

  const mainTs = await readFile(path.join(repositoryRoot, "src", "main.ts"), {
    encoding: "utf8",
  });

  expect(mainTs).toContain("hydration: true");

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(hydrationWarnings).toEqual([]);
});

test("SSG-only layout reserves app bar space before hydration", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { height: 900, width: 1280 },
  });
  const page = await context.newPage();

  try {
    await page.goto("http://127.0.0.1:4173/");

    const main = page.locator(".profile-main");
    await expect(main).toHaveCSS("padding-top", "64px");

    const appBarBox = await page.locator(".v-app-bar").boundingBox();
    const faceBox = await page
      .getByAltText("mcre (FUJITA Shinya) の顔写真")
      .boundingBox();

    if (!appBarBox || !faceBox) {
      throw new Error("app bar or profile image box was not available");
    }

    expect(faceBox.y).toBeGreaterThanOrEqual(appBarBox.height);
  } finally {
    await context.close();
  }
});

test("offscreen profile cards defer their rendering work", async () => {
  const html = await readFile(
    path.join(repositoryRoot, "dist", "index.html"),
    "utf8",
  );
  const deferredCardCount = html.match(/deferred-card/g)?.length ?? 0;
  expect(deferredCardCount).toBeGreaterThanOrEqual(8);

  const assetNames = await readdir(distAssetsPath);
  const appCssName = assetNames.find(
    (assetName) => assetName.startsWith("app-") && assetName.endsWith(".css"),
  );
  expect(appCssName).toBeDefined();

  const appCss = await readFile(
    path.join(distAssetsPath, appCssName ?? ""),
    "utf8",
  );
  expect(appCss).toContain("content-visibility:auto");
  expect(appCss).toContain("contain-intrinsic-size:auto 320px");
});

test("RSS sections keep the same card surface as other profile cards", async ({
  page,
}) => {
  await page.goto("/");

  for (const title of ["Zenn", "note"]) {
    const rssCard = page.locator(".v-card").filter({
      has: page.locator(".v-card-title", { hasText: title }),
    });

    await expect(rssCard).toHaveCount(1);
    await expect(rssCard).toHaveClass(/deferred-card/);
    await expect(rssCard).toHaveClass(/mb-4/);
  }
});

test("SSG HTML keeps lightweight RSS links in the initial response", async ({
  request,
}) => {
  const response = await request.get("/");
  expect(response.ok()).toBe(true);

  const html = await response.text();
  expect(html).toContain('<html lang="ja">');
  expect(html).toContain('"rss"');
  expect(html).toContain('"note"');
  expect(html).toContain('"zenn"');
  expect(html).toContain("https://note.com/");
  expect(html).toContain("https://zenn.dev/");
  expect(html).not.toContain("Article description");
  expect(html).not.toContain("assets.st-note.com");
  expect(html).not.toContain("res.cloudinary.com");
  expect(html).not.toContain('"enclosure"');
  expect(html).not.toContain(
    'rel="preconnect" href="https://www.googletagmanager.com"',
  );
  expect(html).toContain(
    "https://www.googletagmanager.com/gtag/js?id=G-EVL1PP92QT",
  );
});

test("SSG HTML avoids Vuetify SSR regressions", async ({ request }) => {
  const response = await request.get("/");
  expect(response.ok()).toBe(true);

  const html = await response.text();
  expect(html).not.toContain("data-allow-mismatch");
  expect(html).not.toContain("NaN");
  expect(html).not.toContain("opacity:NaN");
});

test("LCP profile image is prioritized in the initial HTML", async ({
  page,
}) => {
  await page.goto("/");

  const face = page.getByAltText("mcre (FUJITA Shinya) の顔写真");
  await expect(face).toHaveAttribute("fetchpriority", "high");
  await expect(face).toHaveAttribute("loading", "eager");
});

test("profile images provide high-density variants", async ({ page }) => {
  await page.goto("/");

  const face = page.getByAltText("mcre (FUJITA Shinya) の顔写真");
  await expect(face).toHaveAttribute(
    "srcset",
    "/img/face01.webp, /img/face01-2x.webp 2x",
  );
  await expect(face).toHaveAttribute("sizes", "128px");

  const avatarSources = {
    LAPRAS: "lapras",
    WakaTime: "wakatime",
    Wantedly: "wantedly",
    X: "x",
    Zenn: "zenn",
    note: "note",
  };

  for (const [label, fileName] of Object.entries(avatarSources)) {
    const avatar = page.getByAltText(label).first();
    await expect(avatar).toHaveAttribute(
      "srcset",
      `/img/${fileName}.webp, /img/${fileName}-2x.webp 2x`,
    );
    await expect(avatar).toHaveAttribute("sizes", "28px");
  }

  const xAvatars = await page.locator('img[alt="X"]').evaluateAll((images) =>
    images.map((image) => ({
      sizes: image.getAttribute("sizes"),
      srcset: image.getAttribute("srcset"),
    })),
  );
  expect(xAvatars.length).toBeGreaterThan(1);
  expect(
    xAvatars.every(
      (image) =>
        image.sizes === "28px" &&
        image.srcset === "/img/x.webp, /img/x-2x.webp 2x",
    ),
  ).toBe(true);
});

test("social image link icons fit inside their buttons after preview build", async ({
  page,
}) => {
  const imageLabels = ["X", "WakaTime", "Zenn", "note", "LAPRAS", "Wantedly"];
  const viewports = [
    { height: 900, width: 1280 },
    { height: 844, width: 390 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const socialNav = page.getByRole("navigation", {
      name: "外部プロフィール",
    });

    for (const label of imageLabels) {
      const icon = socialNav.getByAltText(label);
      const link = socialNav.getByRole("link", {
        name: `${label} を新しいウィンドウで開く`,
      });

      await expect(icon).toBeVisible();
      await expect(link).toBeVisible();
      await expect(icon).toHaveCSS("display", "block");
      await expect(icon).toHaveCSS("object-fit", "contain");

      const imageState = await icon.evaluate((image) => {
        const htmlImage = image as HTMLImageElement;
        return {
          hasAvatarAncestor: Boolean(htmlImage.closest(".v-avatar")),
          naturalHeight: htmlImage.naturalHeight,
          naturalWidth: htmlImage.naturalWidth,
        };
      });
      expect(imageState.hasAvatarAncestor).toBe(false);
      expect(imageState.naturalWidth).toBeGreaterThan(0);
      expect(imageState.naturalHeight).toBeGreaterThan(0);

      const iconBox = await icon.boundingBox();
      const linkBox = await link.boundingBox();
      if (!iconBox || !linkBox) {
        throw new Error(`${label} icon or link box was not available`);
      }

      expect(iconBox.width).toBeLessThanOrEqual(32);
      expect(iconBox.height).toBeLessThanOrEqual(32);
      expect(iconBox.x).toBeGreaterThanOrEqual(linkBox.x);
      expect(iconBox.y).toBeGreaterThanOrEqual(linkBox.y);
      expect(iconBox.x + iconBox.width).toBeLessThanOrEqual(
        linkBox.x + linkBox.width,
      );
      expect(iconBox.y + iconBox.height).toBeLessThanOrEqual(
        linkBox.y + linkBox.height,
      );
    }
  }
});

test("avatar links show Vuetify tooltips on hover", async ({ page }) => {
  await page.goto("/");

  const socialNav = page.getByRole("navigation", {
    name: "外部プロフィール",
  });

  await socialNav
    .getByRole("link", { name: "X を新しいウィンドウで開く" })
    .hover();
  await expect(page.getByRole("tooltip", { name: "X" })).toBeVisible();

  await socialNav
    .getByRole("link", { name: "GitHub を新しいウィンドウで開く" })
    .hover();
  await expect(page.getByRole("tooltip", { name: "GitHub" })).toBeVisible();

  const wakaTimeCard = page.locator(".v-card").filter({
    has: page.locator(".v-card-title", { hasText: "WakaTime" }),
  });
  await wakaTimeCard
    .getByRole("link", { name: "WakaTime を新しいウィンドウで開く" })
    .hover();
  await expect(page.getByRole("tooltip", { name: "WakaTime" })).toBeVisible();
});

test("large lazy project image stays compressed", async () => {
  const image = await stat(
    path.join(repositoryRoot, "dist", "img", "aiwolf-4th-nlp.webp"),
  );

  expect(image.size).toBeLessThan(40 * 1024);
});

test("profile page avoids known accessibility regressions", async ({
  page,
}) => {
  await page.goto("/");

  const orphanListItems = await page
    .locator('[role="listitem"]')
    .evaluateAll((items) =>
      items
        .filter((item) => !item.closest('[role="list"], ol, ul'))
        .map((item) => item.textContent?.trim() ?? ""),
    );
  expect(orphanListItems).toEqual([]);

  const emptyTooltips = await page
    .locator('[role="tooltip"]')
    .evaluateAll((tooltips) =>
      tooltips
        .filter((tooltip) => {
          const accessibleText =
            tooltip.textContent?.trim() ||
            tooltip.getAttribute("aria-label") ||
            tooltip.getAttribute("aria-labelledby") ||
            tooltip.getAttribute("title");
          return !accessibleText;
        })
        .map((tooltip) => tooltip.id || tooltip.outerHTML),
    );
  expect(emptyTooltips).toEqual([]);

  await expect(page.getByRole("link", { name: /mcre-info/ })).toHaveAttribute(
    "href",
    "https://github.com/mcre/mcre-info",
  );
  await expect(
    page.locator('a.v-card[aria-label="image へのリンク"]'),
  ).toHaveCount(0);
});
