<template>
  <div ref="rootElement">
    <v-card title="Zenn">
      <template v-slot:prepend>
        <avatar
          href="https://zenn.dev/m_cre"
          :img="zennImg"
          tooltip="Zenn - m_cre"
        />
      </template>
      <v-card-text>
        <item-card
          v-for="article in articles.zenn"
          :key="article.link"
          :href="article.link"
          :description="article.description"
          :head-img="article.enclosure"
          :head-img-aspect-ratio="1.905"
          :img-alt="article.title"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <more-btn href="https://zenn.dev/m_cre" />
        <v-spacer />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useRssStore } from "@/stores/rss";
import zennImg from "@/assets/images/zenn.webp";

const rootElement = ref<HTMLElement | null>(null);
const rssStore = useRssStore();
const articles = rssStore.articles;
const hasFetched = ref(false);

let observer: IntersectionObserver | null = null;

const fetchRssOnce = () => {
  if (!hasFetched.value) {
    rssStore.fetchRss("zenn");
    hasFetched.value = true;
    if (observer !== null) {
      observer.disconnect();
      observer = null;
    }
  }
};

onMounted(async () => {
  await nextTick();

  if (rootElement.value instanceof HTMLElement) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchRssOnce();
      }
    });

    observer.observe(rootElement.value);
  } else {
    console.error("rootElement is not a valid HTMLElement:", rootElement.value);
  }
});

onUnmounted(() => {
  if (observer !== null) {
    observer.disconnect();
  }
});
</script>
