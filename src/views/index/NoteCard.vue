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
        :key="article.link"
        :title="article.title"
        :href="article.link"
        :description="article.description"
        :head-img="article.enclosure"
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
import { useSSRContext } from "vue";
import { RssArticle } from "@/apis/@types/index";

const articles = ref<RssArticle[]>([]);
const ssrContext = useSSRContext();

if (ssrContext && ssrContext.initialState && ssrContext.initialState.articles) {
  articles.value = ssrContext.initialState.articles;
} else {
  onMounted(() => {
    useRss("note").then((data) => {
      articles.value = data;
    });
  });
}
</script>
