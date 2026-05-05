import { describe, expect, it } from "vitest";
import {
  buildLlmsFullText,
  buildLlmsText,
  buildProfileJson,
  buildProfileJsonLd,
  buildProfileMarkdown,
  profile,
} from "./profile";

describe("profile content and AIO artifacts", () => {
  it("keeps the profile identity and authoritative sameAs links in one source", () => {
    expect(profile.siteName).toBe("mcre.info");
    expect(profile.displayName).toBe("mcre (FUJITA Shinya)");
    expect(profile.sameAs).toEqual(
      expect.arrayContaining([
        "https://x.com/m_cre",
        "https://github.com/m-cre",
        "https://zenn.dev/m_cre",
        "https://note.com/m_cre/",
      ]),
    );
  });

  it("generates ProfilePage + Person JSON-LD from the same content", () => {
    const jsonLd = buildProfileJsonLd(profile);

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("ProfilePage");
    expect(jsonLd.mainEntity).toMatchObject({
      "@type": "Person",
      name: profile.displayName,
      alternateName: profile.handle,
      url: profile.url,
      sameAs: profile.sameAs,
    });
  });

  it("generates llms.txt, llms-full.txt, profile.md, and profile.json consistently", () => {
    const llmsText = buildLlmsText(profile);
    const llmsFullText = buildLlmsFullText(profile);
    const markdown = buildProfileMarkdown(profile);
    const json = buildProfileJson(profile);

    expect(llmsText).toContain("# mcre.info");
    expect(llmsText).toContain(
      "[Profile markdown](https://mcre.info/profile.md)",
    );
    expect(llmsText).toContain(
      "[Profile JSON](https://mcre.info/profile.json)",
    );
    expect(llmsFullText).toContain("## Profile");
    expect(llmsFullText).toContain("## Career");
    expect(markdown).toContain("# mcre (FUJITA Shinya)");
    expect(markdown).toContain("## Skills");
    expect(json).toMatchObject({
      siteName: profile.siteName,
      displayName: profile.displayName,
      sameAs: profile.sameAs,
    });
  });
});
