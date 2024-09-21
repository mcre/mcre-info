<template>
  <a
    class="twitter-timeline"
    data-tweet-limit="5"
    data-chrome="noheader,nofooter,transparent"
    data-lang="ja"
    href="https://twitter.com/m_cre?ref_src=twsrc%5Etfw"
  >
    読込中
  </a>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
onMounted(async () => {
  await setTimeout(() => {
    const twScript = document.createElement("script");
    twScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
    twScript.setAttribute("async", "true");
    document.head.appendChild(twScript);
  }, 100);
});
</script>
