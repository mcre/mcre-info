<template>
  <v-btn
    :href="href"
    size="large"
    variant="text"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="font-weight-bold text-decoration-underline">もっと見る</span>
  </v-btn>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>
