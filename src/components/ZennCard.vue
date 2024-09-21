<template>
  <v-card>
    <v-card-title>
      <link-img
        href="https://zenn.dev/m_cre"
        img="/img/zenn.svg"
        tooltip="Zenn"
        :size="36"
      />Zenn
    </v-card-title>
    <v-card-text>
      <item-card
        v-for="article in state.articles"
        :href="article.link"
        :description="article.description"
        :head-img="article.enclosure"
        read-more
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <link-btn href="https://zenn.dev/m_cre">もっと見る</link-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import LinkBtn from "@/components/LinkBtn.vue";
import ItemCard from "@/components/ItemCard.vue";
import LinkImg from "@/components/LinkImg.vue";

import { useRss, RssArticle } from "@/composables/useRss";

const state: {
  articles: RssArticle[];
} = reactive({
  articles: [],
});

onMounted(() => {
  useRss("zenn-rss").then((articles) => {
    state.articles = articles;
  });
});
</script>
