<template>
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
</template>

<script setup lang="ts">
import { useRssStore } from "@/stores/rss";
import zennImg from "@/assets/images/zenn.webp";

const rssStore = useRssStore();
const articles = rssStore.articles;

onMounted(() => {
  rssStore.fetchRss("zenn");
});
</script>
