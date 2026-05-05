<template>
  <nav aria-label="外部プロフィール">
    <v-row justify="center">
      <v-col
        v-for="link in links"
        :key="link.url"
        class="d-flex justify-center"
        cols="3"
        sm="1"
      >
        <a
          v-if="link.image"
          :aria-label="socialLinkLabel(link)"
          class="social-link"
          :href="link.url"
          rel="noopener noreferrer"
          target="_blank"
          :title="link.title"
        >
          <img
            :alt="link.title"
            :class="socialIconClasses(link)"
            height="28"
            loading="lazy"
            sizes="28px"
            :src="link.image"
            :srcset="socialImageSrcset(link)"
            width="28"
          />
        </a>

        <Avatar
          v-else
          :href="link.url"
          :icon="link.icon || '$mdiWeb'"
          :tooltip="link.title"
        />
      </v-col>
    </v-row>
  </nav>
</template>

<script setup lang="ts">
import type { ProfileLink } from "@/content/profile";
import { getHighDensityImageSrcset } from "@/utils/imageSrcset";

defineProps<{
  links: ProfileLink[];
}>();

const socialLinkLabel = (link: ProfileLink) =>
  `${link.title} を新しいウィンドウで開く`;

const socialIconModifier = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const socialIconClasses = (link: ProfileLink) => [
  "social-link__icon",
  `social-link__icon--${socialIconModifier(link.title)}`,
];

const socialImageSrcset = (link: ProfileLink) =>
  link.image ? getHighDensityImageSrcset(link.image) : "";
</script>

<style lang="scss" scoped>
.social-link {
  align-items: center;
  background: rgb(var(--v-theme-surface));
  border-radius: 50%;
  box-shadow:
    0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  display: inline-flex;
  height: 40px;
  justify-content: center;
  overflow: hidden;
  text-decoration: none;
  width: 40px;
}

.social-link:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 3px;
}

.social-link__icon {
  display: block;
  flex: 0 0 auto;
  height: 28px;
  object-fit: contain;
  width: 28px;
}

.social-link__icon--x {
  height: 28px;
  width: 28px;
}

.social-link__icon--line {
  height: 26px;
  width: 26px;
}
</style>
