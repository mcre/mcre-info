<script setup lang="ts">
  import ItemCard from '@/components/ItemCard.vue'
  import { mdiYoutube } from '@mdi/js'
</script>

<template>
  <v-card>
    <v-card-title>
      <v-icon left :icon="mdiYoutube" />
      Youtube Cannel
    </v-card-title>
    <v-card-text>
      <item-card
        title="「聴く」名作文庫"
        img="/img/lp.jpg"
        href="https://www.youtube.com/c/聴く-名作文庫"
        description="青空文庫の小説をTeXで綺麗に縦組みし、機械音声で読み上げる動画を半自動生成したものを投稿していました。チャンネル登録者数1,000人突破。"
        youtube="4U_JLkcVEi0"
        :tags="{ Python: ['MoviePy'], AWS: ['Polly'], TeX: ['jlreq'] }"
      />
    </v-card-text>
  </v-card>
</template>
