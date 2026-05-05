import type { ProfileLink } from "@/content/profile";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SocialLinks from "./SocialLinks.vue";

const rowStub = {
  template: "<div><slot /></div>",
};

const colStub = {
  template: "<div><slot /></div>",
};

const avatarStub = {
  props: ["href", "icon", "img", "imgSrcset", "tooltip"],
  template: '<span data-testid="avatar" />',
};

const tooltipStub = {
  props: ["text"],
  template:
    '<span data-testid="tooltip"><slot name="activator" :props="{}" /></span>',
};

describe("SocialLinks", () => {
  it("renders image based SNS links as fixed img icons without Vuetify avatars", () => {
    const links: ProfileLink[] = [
      {
        title: "X",
        url: "https://x.com/m_cre",
        description: "連絡先",
        image: "/img/x.webp",
      },
      {
        title: "LINE",
        url: "https://line.me/R/share",
        description: "共有",
        image: "/img/line.webp",
      },
      {
        title: "GitHub",
        url: "https://github.com/m-cre",
        description: "開発リポジトリ",
        icon: "$mdiGithub",
      },
    ];

    const wrapper = mount(SocialLinks, {
      props: { links },
      global: {
        stubs: {
          Avatar: avatarStub,
          VCol: colStub,
          VRow: rowStub,
          VTooltip: tooltipStub,
        },
      },
    });

    const imageLinks = wrapper.findAll("a.social-link");
    expect(imageLinks).toHaveLength(2);
    expect(imageLinks[0].attributes("aria-label")).toBe(
      "X を新しいウィンドウで開く",
    );

    const xIcon = wrapper.get('img[alt="X"]');
    expect(xIcon.attributes()).toMatchObject({
      height: "28",
      loading: "lazy",
      sizes: "28px",
      src: "/img/x.webp",
      srcset: "/img/x.webp, /img/x-2x.webp 2x",
      width: "28",
    });
    expect(xIcon.classes()).toEqual(
      expect.arrayContaining(["social-link__icon", "social-link__icon--x"]),
    );
    expect(xIcon.element.closest(".v-avatar")).toBeNull();

    const lineIcon = wrapper.get('img[alt="LINE"]');
    expect(lineIcon.classes()).toEqual(
      expect.arrayContaining(["social-link__icon", "social-link__icon--line"]),
    );
    expect(lineIcon.element.closest(".v-avatar")).toBeNull();

    expect(wrapper.findAll('[data-testid="avatar"]')).toHaveLength(1);
    expect(wrapper.findAll('[data-testid="tooltip"]')).toHaveLength(2);
  });
});
