import {
  mdiAccountTie,
  mdiArmFlex,
  mdiChevronRight,
  mdiDog,
  mdiGamepadVariantOutline,
  mdiGithub,
  mdiLinkedin,
  mdiNewspaper,
  mdiWeb,
  mdiYoutube,
} from "@mdi/js";
import { createHead } from "@unhead/vue/client";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi-svg";
import { profile } from "@/content/profile";
import HomePage from "./HomePage.vue";

describe("HomePage", () => {
  it("renders the profile headline and major sections from profile content", () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [
          createHead(),
          createVuetify({
            components,
            directives,
            icons: {
              defaultSet: "mdi",
              aliases: {
                mdiAccountTie,
                mdiArmFlex,
                mdiChevronRight,
                mdiDog,
                mdiGamepadVariantOutline,
                mdiGithub,
                mdiLinkedin,
                mdiNewspaper,
                mdiWeb,
                mdiYoutube,
              },
              sets: {
                mdi,
              },
            },
          }),
        ],
        stubs: {
          ProfileRssCard: true,
          WakaTimeCard: true,
        },
      },
    });

    expect(wrapper.text()).toContain(profile.displayName);
    expect(wrapper.text()).toContain(profile.catchphrase);
    expect(wrapper.text()).toContain("Profile");
    expect(wrapper.text()).toContain("Skills");
    expect(wrapper.text()).toContain("職歴");
    expect(wrapper.text()).toContain("Hobbies / Activities");
    expect(wrapper.text()).toContain("GitHub");
    expect(wrapper.text()).toContain("Webapp 開発");
  });
});
