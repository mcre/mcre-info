<template>
  <v-card
    class="my-2 mx-n2 mx-n2 mx-md-2"
    variant="outlined"
    elevation="0"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <template v-slot:prepend v-if="title && (img || icon)">
      <avatar :img="img" :icon="icon" />
    </template>
    <template v-slot:title>
      <span class="wordwrap">{{ title }}</span>
    </template>
    <img
      v-if="headImg"
      :src="headImg"
      :alt="imgAlt"
      :style="{ aspectRatio: headImgAspectRatio, width: '100%' }"
      loading="lazy"
    />

    <v-card-text v-html="description" />
    <v-container v-if="youtube" class="responsive-style">
      <v-lazy>
        <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${youtube}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </v-lazy>
    </v-container>
    <img
      v-if="footImg"
      :src="footImg"
      :alt="imgAlt"
      :style="{ aspectRatio: footImgAspectRatio, width: '100%' }"
      loading="lazy"
    />

    <v-card-actions v-if="Object.keys(tags).length > 0">
      <v-item-group>
        <tag-chip
          v-for="(children, parent) in tags"
          :key="parent"
          :parent="`${parent}`"
          :children="children"
        />
      </v-item-group>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
  img: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  youtube: {
    type: String,
    default: "",
  },
  headImg: {
    type: String,
    default: "",
  },
  headImgAspectRatio: {
    type: String,
    default: "1 / 1",
  },
  footImg: {
    type: String,
    default: "",
  },
  footImgAspectRatio: {
    type: String,
    default: "1 / 1",
  },
  imgAlt: {
    type: String,
    default: "image",
  },
  tags: {
    type: Object as () => { [key: string]: string[] },
    default: () => ({}),
  },
});
</script>

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
