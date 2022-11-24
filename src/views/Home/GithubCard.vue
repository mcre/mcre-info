<script setup lang="ts">
  import LinkBtn from '@/components/LinkBtn.vue'
  import ItemCard from '@/components/ItemCard.vue'
  import LinkIcon from '@/components/LinkIcon.vue'
  import { mdiGithub, mdiDog } from '@mdi/js'
</script>

<template>
  <v-card>
    <v-card-title>
      <link-icon
        href="https://github.com/mcre"
        :icon="mdiGithub"
        tooltip="GitHub"
      />GitHub
    </v-card-title>
    <v-card-text>
      <item-card
        title="mcre-info"
        img="/img/favicon32.png"
        href="https://github.com/mcre/mcre-info"
        description="このサイトのソースコードを公開しています。"
        :tags="{
          Vue3: ['Vuetify3'],
        }"
      />
      <item-card
        title="listening-paperback"
        img="/img/lp.jpg"
        href="https://github.com/mcre/listening-paperback"
        description="Youtubeチャンネル 「聴く」名作文庫 の動画を生成するためのプログラムを公開しています。"
        :tags="{ Python: ['MoviePy'], AWS: ['Polly'], TeX: ['jlreq'] }"
      />
      <item-card
        title="aiwolf-4th-nlp"
        :icon="mdiDog"
        href="https://github.com/mcre/aiwolf-4th-nlp"
        description="人狼知能大会 自然言語部門 第4回大会に参加したときのソースコードを公開しています。"
        footImg="/img/aiwolf-4th-nlp.png"
        :tags="{
          Java: [],
          NLP: ['Juman', 'KNP'],
        }"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <link-btn href="https://github.com/mcre">もっと見る</link-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
