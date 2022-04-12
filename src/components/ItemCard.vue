<script setup lang="ts">
  import TagChip from '@/components/TagChip.vue'
  import LinkBtn from '@/components/LinkBtn.vue'

  const props = defineProps<{
    title: string
    img?: string
    href: string
    description: string
    tags?: { [key: string]: string[] }
  }>()
</script>

<template>
  <v-card class="mb-2">
    <v-card-title class="pl-1">
      <link-btn :href="props.href" :img="props.img">
        {{ props.title }}
      </link-btn>
    </v-card-title>
    <v-card-text>
      {{ props.description }}
    </v-card-text>
    <v-card-actions v-if="props.tags">
      <v-item-group>
        <tag-chip
          v-for="(children, parent) in props.tags"
          :key="parent"
          :parent="parent"
          :children="children"
        />
      </v-item-group>
    </v-card-actions>
  </v-card>
</template>
