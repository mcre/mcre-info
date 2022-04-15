<script setup lang="ts">
  import LinkBtn from '@/components/LinkBtn.vue'
  import ItemCard from '@/components/ItemCard.vue'
  import LinkImg from '@/components/LinkImg.vue'
</script>

<template>
  <v-card>
    <v-card-title>
      <link-img
        href="https://note.com/m_cre/"
        img="/img/note.svg"
        tooltip="note"
      />note
    </v-card-title>
    <v-card-text>
      <item-card
        title="iPhoneから音声入力でNotionにメモ"
        icon="mdi-microphone"
        href="https://note.com/m_cre/n/n677310ce3a93"
        description="iPhoneから、「Hey Siri、アイディア」「たこ焼き食べたい」で、Notionにメモを追加できるようになる方法を説明しています。"
        :tags="{
          Notion: [],
        }"
      />
      <item-card
        title="Notionかんたんタスク管理"
        icon="mdi-calendar-check"
        href="https://note.com/m_cre/n/n85b9a1720458"
        description="最近大人気の Notion ですが、何でも出来すぎて逆にとっつきづらいと感じている方も多いと思います。そんな方のためにデータベースもテンプレートも使わない、今日から始められる個人向け「かんたんタスク管理」の例をご紹介します。これだけでも十分にNotionの恩恵を感じられると思います。"
        :tags="{
          Notion: [],
        }"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <link-btn href="https://note.com/m_cre/">もっと見る</link-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
