<template>
  <v-card title="note">
    <template v-slot:prepend>
      <avatar
        href="https://note.com/m_cre/"
        tooltip="note - mcre"
        img="/img/note.svg"
      />
    </template>
    <v-card-text>
      <item-card
        v-for="article in articles"
        :title="article.title"
        :href="article.link"
        :description="article.description"
        :head-img="article.enclosure"
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
import { RssArticle } from "@/composables/useRss";
const articles = ref<RssArticle[]>([]);

onMounted(() => {
  useRss("note-rss").then((data) => {
    articles.value = data;
  });
});
</script>
