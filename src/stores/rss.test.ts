import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRssStore } from "./rss";

const apiMocks = vi.hoisted(() => ({
  noteGet: vi.fn(),
  zennGet: vi.fn(),
}));

vi.mock("@/composables/useApi", () => ({
  useApi: () => ({
    publicApiClient: () => ({
      v1: {
        rss: {
          note: { $get: apiMocks.noteGet },
          zenn: { $get: apiMocks.zennGet },
        },
      },
    }),
  }),
}));

describe("useRssStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    apiMocks.noteGet.mockReset();
    apiMocks.zennGet.mockReset();
  });

  it("fetches and stores note RSS articles", async () => {
    apiMocks.noteGet.mockResolvedValue([
      {
        title: "note article",
        link: "https://note.com/m_cre/n/example",
        description: "note description",
        published: 1_710_000_000,
        enclosure: "https://example.com/note.webp",
      },
    ]);

    const store = useRssStore();
    await store.fetchRss("note");

    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.articles.note).toHaveLength(1);
    expect(store.articles.note[0].title).toBe("note article");
  });

  it("keeps a readable error when fetching RSS fails", async () => {
    apiMocks.zennGet.mockRejectedValue(new Error("network down"));

    const store = useRssStore();
    await store.fetchRss("zenn");

    expect(store.loading).toBe(false);
    expect(store.articles.zenn).toEqual([]);
    expect(store.error).toContain("RSSの取得に失敗しました");
  });
});
