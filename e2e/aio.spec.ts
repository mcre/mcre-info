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

test("webfont assets are split by unicode range", async () => {
  const assetNames = await readdir(distAssetsPath);
  expect(
    assetNames.some((assetName) =>
      assetName.includes("zen-maru-gothic-japanese-400-normal"),
    ),
  ).toBe(false);
  expect(
    assetNames.some((assetName) =>
      assetName.includes("zen-maru-gothic-japanese-700-normal"),
    ),
  ).toBe(false);
  expect(
    assetNames.filter(
      (assetName) =>
        assetName.startsWith("zen-maru-gothic-") && assetName.endsWith(".woff"),
    ),
  ).toHaveLength(0);

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
  expect(appCss).toContain("rss-search-index");
  expect(appCss).toContain("font-family:system-ui");

  const fontCssNames: string[] = [];
  for (const assetName of assetNames) {
    if (
      assetName === appCssName ||
      !assetName.startsWith("fonts-") ||
      !assetName.endsWith(".css")
    ) {
      continue;
    }

    const assetCss = await readFile(
      path.join(distAssetsPath, assetName),
      "utf8",
    );
    if (assetCss.includes("Zen Maru Gothic")) {
      fontCssNames.push(assetName);
    }
  }
  expect(fontCssNames).toHaveLength(1);

  const html = await readFile(
    path.join(repositoryRoot, "dist", "index.html"),
    "utf8",
  );
  expect(html).not.toContain(fontCssNames[0]);

  const zenFontFaceBlocks =
    (
      await readFile(path.join(distAssetsPath, fontCssNames[0] ?? ""), "utf8")
    ).match(
      /@font-face\{[^}]*font-family:(?:"Zen Maru Gothic"|Zen Maru Gothic)[^}]*\}/g,
    ) ?? [];
  expect(zenFontFaceBlocks.length).toBeGreaterThan(2);
  expect(zenFontFaceBlocks.length).toBeLessThanOrEqual(80);
  expect(
    zenFontFaceBlocks.every((fontFaceBlock) =>
      fontFaceBlock.includes("unicode-range:"),
    ),
  ).toBe(true);

  const fontWeights = new Set(
    zenFontFaceBlocks.map((fontFaceBlock) => {
      const fontWeight = fontFaceBlock.match(/font-weight:(\d+)/)?.[1];
      expect(fontWeight).toBeDefined();
      return Number(fontWeight);
    }),
  );
  expect(fontWeights).toEqual(new Set([400, 700]));
});

test("webfont loading stays out of the initial performance window", async ({
  page,
}) => {
  const earlyFontRequests: string[] = [];

  page.on("request", (request) => {
    const url = request.url();
    if (
      url.includes("/assets/fonts-") ||
      url.includes("/assets/zen-maru-gothic-")
    ) {
      earlyFontRequests.push(url);
    }
  });

  await page.goto("/");
  await page.waitForTimeout(3000);

  expect(earlyFontRequests).toEqual([]);
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
    "/img/face01.webp 1x, /img/face01-2x.webp 2x",
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
      `/img/${fileName}.webp 1x, /img/${fileName}-2x.webp 2x`,
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
        image.srcset === "/img/x.webp 1x, /img/x-2x.webp 2x",
    ),
  ).toBe(true);
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
