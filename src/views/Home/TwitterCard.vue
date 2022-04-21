<script setup lang="ts">
  import LinkBtn from '@/components/LinkBtn.vue'
  import LinkIcon from '@/components/LinkIcon.vue'
  import TwitterEmbedded from '@/components/TwitterEmbedded.vue'
  import { mdiTwitter } from '@mdi/js'
</script>

<template>
  <v-card>
    <v-card-title>
      <link-icon
        href="https://twitter.com/m_cre"
        :icon="mdiTwitter"
        tooltip="Twitter"
      />
      Twitter
    </v-card-title>
    <v-card-text>
      <v-lazy>
        <twitter-embedded />
      </v-lazy>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <link-btn href="https://twitter.com/m_cre">もっと見る</link-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
