<template>
  <v-card title="Zenn">
    <template v-slot:prepend>
      <avatar
        href="https://zenn.dev/m_cre"
        img="/img/zenn.svg"
        tooltip="Zenn - m_cre"
      />
    </template>
    <v-card-text>
      <item-card
        v-for="article in articles"
        :href="article.link"
        :description="article.description"
        :head-img="article.enclosure"
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
import { RssArticle } from "@/composables/useRss";

const articles = ref<RssArticle[]>([]);

onMounted(() => {
  useRss("zenn-rss").then((data) => {
    articles.value = data;
  });
});
</script>
