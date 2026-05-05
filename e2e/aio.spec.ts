import { readdir, readFile } from "node:fs/promises";
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

  const zenFontFaceBlocks =
    appCss.match(
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

test("SSG HTML keeps RSS payload out of the initial response", async ({
  request,
}) => {
  const response = await request.get("/");
  expect(response.ok()).toBe(true);

  const html = await response.text();
  expect(html).toContain('<html lang="ja">');
  expect(html).not.toContain("Generated article");
  expect(html).not.toContain("assets.st-note.com");
  expect(html).not.toContain("res.cloudinary.com");
  expect(html).not.toContain('"pinia":{"rss"');
});

test("LCP profile image is prioritized in the initial HTML", async ({
  page,
}) => {
  await page.goto("/");

  const face = page.getByAltText("mcre (FUJITA Shinya) の顔写真");
  await expect(face).toHaveAttribute("fetchpriority", "high");
  await expect(face).toHaveAttribute("loading", "eager");
});
