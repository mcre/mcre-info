<script setup lang="ts">
  import LinkBtn from '@/components/LinkBtn.vue'
  import LinkIcon from '@/components/LinkIcon.vue'
  import { onMounted } from 'vue'
  onMounted(async () => {
    await setTimeout(() => {
      const twScript = document.createElement('script')
      twScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
      twScript.setAttribute('async', 'true')
      document.head.appendChild(twScript)
    }, 100)
  })
</script>

<template>
  <v-card>
    <v-card-title>
      <link-icon
        href="https://twitter.com/m_cre"
        icon="mdi-twitter"
        tooltip="Twitter"
      />
      Twitter
    </v-card-title>
    <v-card-text>
      <a
        class="twitter-timeline"
        data-tweet-limit="3"
        data-chrome="noheader,nofooter,transparent"
        data-lang="ja"
        href="https://twitter.com/m_cre?ref_src=twsrc%5Etfw"
      >
        読込中
      </a>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <link-btn href="https://twitter.com/m_cre">もっと見る</link-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
