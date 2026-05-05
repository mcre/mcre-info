<template>
  <v-card
    class="my-2 mx-n2 mx-n2 mx-md-2"
    elevation="0"
    :href="href"
    rel="noopener noreferrer"
    target="_blank"
    variant="outlined"
  >
    <template v-if="title && (img || icon)" #prepend>
      <Avatar
        :icon="icon"
        :img="img"
        :img-srcset="getHighDensityImageSrcset(img)"
      />
    </template>

    <template #title>
      <span class="wordwrap">{{ title }}</span>
    </template>

    <img
      v-if="headImg"
      :alt="imgAlt"
      loading="lazy"
      :src="headImg"
      :style="{ aspectRatio: headImgAspectRatio, width: '100%' }"
    />

    <v-card-text class="wordwrap" v-text="plainDescription" />

    <v-container v-if="youtube" class="responsive-style">
      <v-lazy>
        <iframe
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
          "
          allowfullscreen
          frameborder="0"
          height="315"
          :src="`https://www.youtube.com/embed/${youtube}`"
          title="YouTube video player"
          width="560"
        />
      </v-lazy>
    </v-container>

    <img
      v-if="footImg"
      :alt="imgAlt"
      loading="lazy"
      :src="footImg"
      :style="{ aspectRatio: footImgAspectRatio, width: '100%' }"
    />

    <v-card-actions v-if="Object.keys(tags).length > 0">
      <v-item-group>
        <TagChip
          v-for="(children, parent) in tags"
          :key="parent"
          :children="children"
          :parent="`${parent}`"
        />
      </v-item-group>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { getHighDensityImageSrcset } from "@/utils/imageSrcset";

const props = defineProps({
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

const plainDescription = computed(() => {
  // descriptionのHTMLタグを除去しプレーンテキストにする（SSR環境でも動作させるため正規表現で処理）
  return props.description
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
