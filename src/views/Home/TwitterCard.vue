<script setup lang="ts">
  import LinkBtn from '@/components/LinkBtn.vue'
  import LinkImg from '@/components/LinkImg.vue'
  import TwitterEmbedded from '@/components/TwitterEmbedded.vue'
  import { mdiTwitter } from '@mdi/js'
</script>

<template>
  <v-card>
    <v-card-title>
      <link-img
        href="https://x.com/mcre"
        img="/img/x.png"
        tooltip="X"
        :size="32"
      />
    </v-card-title>
    <v-card-text>
      <v-lazy>
        <twitter-embedded />
      </v-lazy>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <link-btn href="https://x.com/m_cre">もっと見る</link-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
