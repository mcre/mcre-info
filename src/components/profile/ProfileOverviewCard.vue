<template>
  <v-card title="Profile">
    <template #prepend>
      <Avatar icon="$mdiAccountTie" />
    </template>

    <v-card-text class="pt-0">
      <v-list density="compact" lines="three" role="list">
        <ListItem
          v-for="item in content.profileItems"
          :key="item.title"
          :av-href="xLink?.url"
          :av-img="
            item.title === content.displayName ? xLink?.image : undefined
          "
          :av-tooltip="item.title === content.displayName ? 'X' : undefined"
          :texts="item.description"
          :title="item.title"
        />

        <Subheader class="mt-8" text="職歴" />

        <ListItem
          v-for="item in content.career"
          :key="item.title"
          :texts="timelineTexts(item)"
          :title="item.title"
        />

        <Subheader class="mt-8" text="学歴" />

        <ListItem
          v-for="item in content.education"
          :key="item.title"
          :texts="timelineTexts(item)"
          :title="item.title"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ProfileContent, ProfileTimelineItem } from "@/content/profile";

const props = defineProps<{
  content: ProfileContent;
}>();

const xLink = computed(() =>
  props.content.socialLinks.find((link) => link.title === "X"),
);

const timelineTexts = (item: ProfileTimelineItem) => [
  ...item.description,
  ...(item.note ? [`<small>${item.note}</small>`] : []),
];
</script>
