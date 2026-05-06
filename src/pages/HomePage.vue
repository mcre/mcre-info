<template>
  <v-app>
    <v-app-bar class="brand-app-bar" collapse color="primary">
      <h1 class="font-weight-bold mx-2" style="font-size: 1.25rem">
        mcre.info
      </h1>
    </v-app-bar>

    <v-main class="profile-main">
      <v-container class="page-container">
        <v-row justify="center">
          <v-avatar size="128">
            <img
              alt="mcre (FUJITA Shinya) の顔写真"
              decoding="async"
              fetchpriority="high"
              height="128"
              loading="eager"
              sizes="128px"
              src="/img/face01.webp"
              :srcset="getHighDensityImageSrcset('/img/face01.webp')"
              width="128"
            />
          </v-avatar>
        </v-row>

        <v-row class="mt-10" justify="center">
          <p>{{ profile.catchphrase }}</p>
        </v-row>

        <SocialLinks class="mt-6" :links="profile.socialLinks" />

        <v-row class="mt-10" justify="center">
          <v-col cols="12" lg="6" md="6" sm="10">
            <ProfileOverviewCard
              class="deferred-card mb-4"
              :content="profile"
            />

            <HobbyActivitiesCard
              class="deferred-card mb-4"
              :sections="profile.hobbySections"
            />

            <ProfileRssCard
              class="deferred-card mb-4"
              href="https://zenn.dev/m_cre"
              image="/img/zenn.webp"
              source="zenn"
              title="Zenn"
            />

            <ProfileProjectsCard
              avatar-href="https://github.com/mcre"
              avatar-tooltip="Github - mcre"
              class="deferred-card mb-4"
              icon="$mdiGithub"
              more-href="https://github.com/mcre"
              :projects="profile.githubProjects"
              title="GitHub"
            />

            <ProfileProjectsCard
              class="deferred-card mb-4"
              icon="$mdiWeb"
              :projects="profile.webapps"
              title="Webapp 開発"
            />

            <ProfileProjectsCard
              class="deferred-card mb-4"
              icon="$mdiYoutube"
              :projects="profile.youtubeProjects"
              title="Youtube Channel"
            />
          </v-col>

          <v-col cols="12" lg="6" md="6" sm="10">
            <SkillsCard
              class="deferred-card mb-4"
              :sections="profile.skillSections"
            />

            <ProfileRssCard
              class="deferred-card mb-4"
              href="https://note.com/m_cre/"
              image="/img/note.webp"
              source="note"
              title="note"
            />

            <WakaTimeCard class="deferred-card mb-4" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { getHighDensityImageSrcset } from "@/utils/imageSrcset";

const jsonLd = computed(() => JSON.stringify(buildProfileJsonLd(profile)));

useHead({
  htmlAttrs: { lang: "ja" },
  title: profile.title,
  meta: [
    { name: "description", content: profile.description },
    { property: "og:title", content: profile.title },
    { property: "og:description", content: profile.description },
    { property: "og:type", content: "profile" },
    { property: "og:url", content: profile.url },
    { property: "og:image", content: profile.image },
    { property: "og:site_name", content: profile.siteName },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [
    { rel: "canonical", href: profile.url },
    {
      rel: "preload",
      href: "/img/face01.webp",
      as: "image",
      imagesizes: "128px",
      imagesrcset: getHighDensityImageSrcset("/img/face01.webp"),
    },
  ],
  script: [{ type: "application/ld+json", innerHTML: jsonLd }],
});
</script>

<style scoped>
.brand-app-bar {
  min-width: 128px;
}

.profile-main {
  /* Vuetify 4はSSG時点でapp barのlayout offsetを0pxにするため、初期描画だけ上に詰まる。 */
  --v-layout-top: 64px !important;
}

.page-container {
  max-width: 1185px;
}

.deferred-card {
  content-visibility: auto;
  contain-intrinsic-size: auto 320px;
}
</style>
