<template>
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
</template>

<script setup lang="ts">
import { useRssStore } from "@/stores/rss";
import noteImg from "@/assets/images/note.webp";

const rssStore = useRssStore();
const articles = rssStore.articles;

onMounted(() => {
  rssStore.fetchRss("note");
});
</script>
