<template>
  <v-card title="GitHub">
    <template v-slot:prepend>
      <avatar
        href="https://github.com/mcre"
        tooltip="Github - mcre"
        :icon="mdiGithub"
      />
    </template>
    <v-card-text>
      <item-card
        title="mcre-info"
        :img="faviconImg"
        href="https://github.com/mcre/mcre-info"
        description="このサイトのソースコードを公開しています。"
        :tags="{
          Vue3: ['Vuetify3'],
        }"
      />
      <item-card
        title="dqw-tools"
        :img="dqwToolsImg"
        href="https://github.com/mcre/dqw-tools"
        description="DQW(ドラゴンクエストウォーク)のこころ道クエスト検索ツールのソースコードを公開しています。"
        :tags="{
          Vue3: ['Vuetify3'],
        }"
      />
      <item-card
        title="mcre-tools"
        :img="faviconImg"
        href="https://github.com/mcre/mcre-tools"
        description="「熟語パズル」などのツールのソースコード。"
        :tags="{
          AWS: ['API-Gateway', 'DynamoDB', 'CDK'],
        }"
      />
      <item-card
        title="listening-paperback"
        :img="lpImg"
        href="https://github.com/mcre/listening-paperback"
        description="Youtubeチャンネル 「聴く」名作文庫 の動画を生成するためのプログラムを公開しています。"
        :tags="{ Python: ['MoviePy'], AWS: ['Polly'], TeX: ['jlreq'] }"
      />
      <item-card
        title="aiwolf-4th-nlp"
        :icon="mdiDog"
        href="https://github.com/mcre/aiwolf-4th-nlp"
        description="人狼知能大会 自然言語部門 第4回大会に参加したときのソースコードを公開しています。"
        foot-img="/img/aiwolf-4th-nlp.webp"
        :tags="{
          Java: [],
          NLP: ['Juman', 'KNP'],
        }"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <more-btn href="https://github.com/mcre" />
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import dqwToolsImg from "@/assets/images/dqw-tools.webp";
import faviconImg from "@/assets/images/favicon.webp";
import lpImg from "@/assets/images/lp.webp";

import { mdiGithub, mdiDog } from "@mdi/js";
</script>
