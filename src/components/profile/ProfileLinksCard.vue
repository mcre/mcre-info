<template>
  <v-card :title="title">
    <template #prepend>
      <ProfileAvatar :icon="icon" :label="title" />
    </template>

    <v-card-text>
      <v-row density="comfortable">
        <v-col v-for="link in links" :key="link.url" cols="12">
          <v-card border flat>
            <div class="link-card">
              <v-img
                v-if="link.image"
                :alt="link.title"
                class="link-card__image"
                cover
                :src="link.image"
              />

              <v-icon
                v-else
                class="link-card__icon"
                :icon="link.icon || '$mdiWeb'"
              />

              <div class="link-card__body">
                <a
                  class="link-card__title"
                  :href="link.url"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {{ link.title }}
                </a>

                <p class="ma-0 text-body-2 text-medium-emphasis">
                  {{ link.description }}
                </p>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ProfileLink } from "@/content/profile";

defineProps<{
  icon: string;
  links: ProfileLink[];
  title: string;
}>();
</script>

<style scoped>
.link-card {
  align-items: center;
  display: grid;
  gap: 12px;
  grid-template-columns: 72px minmax(0, 1fr);
  min-height: 72px;
  padding: 8px;
}

.link-card__image {
  aspect-ratio: 1;
  border-radius: 6px;
  width: 72px;
}

.link-card__icon {
  font-size: 32px;
  justify-self: center;
}

.link-card__body {
  min-width: 0;
}

.link-card__title {
  color: rgb(var(--v-theme-primary));
  display: inline-block;
  font-weight: 700;
  margin-bottom: 4px;
  overflow-wrap: anywhere;
  text-decoration: none;
}
</style>
