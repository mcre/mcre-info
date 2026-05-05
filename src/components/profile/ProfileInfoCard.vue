<template>
  <v-card :title="title">
    <template #prepend>
      <ProfileAvatar :icon="icon" :label="title" />
    </template>

    <v-card-text>
      <v-list density="compact" lines="three" :role="null">
        <template v-for="item in items" :key="item.title">
          <v-list-item>
            <v-list-item-title class="font-weight-bold">
              {{ item.title }}
            </v-list-item-title>

            <v-list-item-subtitle
              v-for="text in item.description"
              :key="text"
              class="wordwrap"
            >
              {{ text }}
            </v-list-item-subtitle>

            <v-list-item-subtitle v-if="item.note" class="text-medium-emphasis">
              {{ item.note }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ProfileTimelineItem } from "@/content/profile";

defineProps<{
  icon: string;
  items: ProfileTimelineItem[];
  title: string;
}>();
</script>
