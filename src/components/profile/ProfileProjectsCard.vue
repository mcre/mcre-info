<template>
  <v-card :title="title">
    <template #prepend>
      <Avatar
        :href="avatarHref"
        :icon="icon"
        :img="image"
        :tooltip="avatarTooltip"
      />
    </template>

    <v-card-text>
      <ItemCard
        v-for="project in projects"
        :key="project.url"
        :description="project.description"
        :foot-img="project.footImage"
        :foot-img-aspect-ratio="project.footImageAspectRatio"
        :href="project.url"
        :icon="project.icon"
        :img="project.image"
        :tags="project.tags"
        :title="project.title"
        :youtube="project.youtube"
      />
    </v-card-text>

    <v-card-actions v-if="moreHref">
      <v-spacer />
      <MoreBtn :href="moreHref" />
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { ProfileProject } from "@/content/profile";

defineProps<{
  avatarHref?: string;
  avatarTooltip?: string;
  icon?: string;
  image?: string;
  moreHref?: string;
  projects: ProfileProject[];
  title: string;
}>();
</script>
