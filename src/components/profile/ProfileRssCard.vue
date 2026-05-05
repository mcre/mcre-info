<template>
  <v-card ref="rootCard" :title="title">
    <template #prepend>
      <Avatar
        :href="href"
        :img="image"
        :img-srcset="getHighDensityImageSrcset(image)"
        :tooltip="`${title} - mcre`"
      />
    </template>

    <v-card-text>
      <v-alert
        v-if="rssStore.error"
        class="mb-3"
        color="warning"
        density="compact"
        variant="tonal"
      >
        {{ rssStore.error }}
      </v-alert>

      <v-progress-linear
        v-if="rssStore.loading && articles.length === 0"
        indeterminate
      />

      <template v-else>
        <ItemCard
          v-for="article in articles"
          :key="article.link"
          :description="article.description"
          :head-img="article.enclosure"
          head-img-aspect-ratio="1.905"
          :href="article.link"
          :img-alt="article.title || 'イメージ画像'"
          :title="article.title"
        />
      </template>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <MoreBtn :href="href" />
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";

import { getHighDensityImageSrcset } from "@/utils/imageSrcset";

const props = defineProps<{
  href: string;
  image: string;
  source: "note" | "zenn";
  title: string;
}>();

const rssStore = useRssStore();
const articles = computed(() => rssStore.articles[props.source]);
const hasFullArticles = computed(() =>
  articles.value.some((article) => article.description || article.enclosure),
);
const rootCard = ref<ComponentPublicInstance | HTMLElement | null>(null);
const hasFetched = ref(false);
let observer: IntersectionObserver | null = null;

const fetchRssOnce = () => {
  if (hasFetched.value) return;
  hasFetched.value = true;
  void rssStore.fetchRss(props.source);
  observer?.disconnect();
  observer = null;
};

const getRootElement = () => {
  const card = rootCard.value;
  if (!card) return null;
  if (card instanceof HTMLElement) return card;

  const element = card.$el;
  return element instanceof HTMLElement ? element : null;
};

onMounted(async () => {
  if (hasFullArticles.value) return;

  await nextTick();
  const rootElement = getRootElement();
  if (!rootElement) {
    fetchRssOnce();
    return;
  }

  observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) fetchRssOnce();
  });
  observer.observe(rootElement);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>
