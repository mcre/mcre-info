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
        v-for="article in articles"
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
import LinkBtn from "@/components/LinkBtn.vue";
import ItemCard from "@/components/ItemCard.vue";
import LinkImg from "@/components/LinkImg.vue";

import { useRss, RssArticle } from "@/composables/useRss";

const articles = ref<RssArticle[]>([]);

onMounted(() => {
  useRss("zenn-rss").then((data) => {
    articles.value = data;
  });
});
</script>
