<template>
  <v-btn
    :href="href"
    rel="noopener noreferrer"
    size="large"
    target="_blank"
    variant="text"
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
