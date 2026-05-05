import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLlmsFullText,
  buildLlmsText,
  buildProfileJson,
  buildProfileMarkdown,
  buildRobotsTxt,
  buildSitemapXml,
  profile,
} from "../src/content/profile";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

try {
  process.loadEnvFile(resolve(rootDir, envFile));
} catch {
  // VITE_DISTRIBUTION_DOMAIN_NAME is optional because mcre.info is the canonical domain.
}

const distributionDomain =
  process.env.VITE_DISTRIBUTION_DOMAIN_NAME || "mcre.info";
const canonicalProfile = {
  ...profile,
  url: `https://${distributionDomain}`,
  image: `https://${distributionDomain}/img/face01.webp`,
};

const writePublicFile = (relativePath: string, content: string) => {
  const outputPath = resolve(rootDir, "public", relativePath);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, content);
};

writePublicFile("sitemap.xml", buildSitemapXml(canonicalProfile));
writePublicFile("robots.txt", buildRobotsTxt(canonicalProfile));
writePublicFile("llms.txt", buildLlmsText(canonicalProfile));
writePublicFile("llms-full.txt", buildLlmsFullText(canonicalProfile));
writePublicFile("profile.md", buildProfileMarkdown(canonicalProfile));
writePublicFile(
  "profile.json",
  `${JSON.stringify(buildProfileJson(canonicalProfile), null, 2)}\n`,
);
