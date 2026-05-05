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
        <Avatar
          :href="link.url"
          :icon="link.icon || '$mdiWeb'"
          :img="link.image"
          :tooltip="link.title"
        />
      </v-col>
    </v-row>
  </nav>
</template>

<script setup lang="ts">
import type { ProfileLink } from "@/content/profile";

defineProps<{
  links: ProfileLink[];
}>();
</script>
