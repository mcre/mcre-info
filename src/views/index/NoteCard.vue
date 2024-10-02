<template>
  <div ref="rootElement">
    <v-card title="note">
      <template v-slot:prepend>
        <avatar
          href="https://note.com/m_cre/"
          tooltip="note - mcre"
          :img="noteImg"
        />
      </template>
      <v-card-text>
        <item-card
          v-for="article in articles.note"
          :key="article.link"
          :title="article.title"
          :href="article.link"
          :description="article.description"
          :head-img="article.enclosure"
          :head-img-aspect-ratio="1.905"
          img-alt="イメージ画像"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <more-btn href="https://note.com/m_cre/" />
        <v-spacer />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useRssStore } from "@/stores/rss";
import noteImg from "@/assets/images/note.webp";

const rootElement = ref<HTMLElement | null>(null);
const rssStore = useRssStore();
const articles = rssStore.articles;
const hasFetched = ref(false);

let observer: IntersectionObserver | null = null;

const fetchRssOnce = () => {
  if (!hasFetched.value) {
    rssStore.fetchRss("note");
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
