<script setup lang="ts">
  import TagChip from '@/components/TagChip.vue'
  import LinkTitleBtn from '@/components/LinkTitleBtn.vue'
  import LinkBtn from '@/components/LinkBtn.vue'

  const props = defineProps<{
    title?: string
    img?: string
    icon?: string
    href: string
    description: string
    youtube?: string
    headImg?: string
    footImg?: string
    readMore?: boolean
    tags?: { [key: string]: string[] }
  }>()
</script>

<template>
  <v-card class="mb-2" variant="outlined" elevation="0">
    <v-card-title class="pl-1 custom-card-title" v-if="props.title">
      <link-title-btn :href="props.href" :img="props.img" :icon="props.icon">
        {{ props.title }}
      </link-title-btn>
    </v-card-title>
    <a
      :href="props.href"
      target="_blank"
      rel="noopener noreferrer"
      v-if="props.headImg"
    >
      <v-img class="mx-4 ma-4" v-if="props.headImg" :src="props.headImg" />
    </a>
    <v-card-text v-html="props.description" />
    <v-container v-if="props.youtube" class="responsive-style">
      <v-lazy>
        <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${props.youtube}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </v-lazy>
    </v-container>
    <v-img class="mx-4" v-if="props.footImg" :src="props.footImg" />
    <v-card-actions v-if="props.readMore">
      <v-spacer />
      <link-btn :href="props.href">続きを読む</link-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-actions v-if="props.tags">
      <v-item-group>
        <tag-chip
          v-for="(children, parent) in props.tags"
          :key="parent"
          :parent="`${parent}`"
          :children="children"
        />
      </v-item-group>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
  .custom-card-title {
    display: block;
  }
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
