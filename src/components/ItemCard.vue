<script setup lang="ts">
  import TagChip from '@/components/TagChip.vue'
  import LinkBtn from '@/components/LinkBtn.vue'

  const props = defineProps<{
    title: string
    img?: string
    href: string
    description: string
    youtube?: string
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
    <v-container v-if="props.youtube" class="responsive-style">
      <iframe
        width="560"
        height="315"
        :src="`https://www.youtube.com/embed/${props.youtube}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </v-container>
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

<style lang="scss" scoped>
  .responsive-style {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 50%;
  }
  .responsive-style iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
