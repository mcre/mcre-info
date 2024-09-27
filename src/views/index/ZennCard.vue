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
        v-for="article in articles"
        :key="article.link"
        :href="article.link"
        :description="article.description"
        :head-img="article.enclosure"
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
import { useSSRContext } from "vue";
import { RssArticle } from "@/apis/@types/index";
import zennImg from "@/assets/images/zenn.webp";

const articles = ref<RssArticle[]>([]);
const ssrContext = useSSRContext();

if (ssrContext && ssrContext.initialState && ssrContext.initialState.articles) {
  articles.value = ssrContext.initialState.articles;
} else {
  onMounted(() => {
    useRss("zenn").then((data) => {
      articles.value = data;
    });
  });
}
</script>
