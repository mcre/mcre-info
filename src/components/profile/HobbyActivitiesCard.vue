<template>
  <v-card title="Hobbies / Activities">
    <template #prepend>
      <Avatar icon="$mdiGamepadVariantOutline" />
    </template>

    <v-card-text class="pt-0">
      <v-list density="compact" lines="three" role="list">
        <template v-for="section in sections" :key="section.title">
          <Subheader
            :class="{ 'mt-8': section !== sections[0] }"
            :text="section.title"
          />

          <ListItem
            v-for="item in section.items"
            :key="item.title"
            :bullet="item.bullet"
            :texts="item.description"
            :title="item.title"
          />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ProfileTextSection } from "@/content/profile";

defineProps<{
  sections: ProfileTextSection[];
}>();
</script>
