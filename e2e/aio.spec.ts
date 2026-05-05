import { expect, test } from "@playwright/test";

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
