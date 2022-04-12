<script setup lang="ts">
  import { defineProps, withDefaults } from 'vue'

  interface Props {
    href: string
    size?: string
    img?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'large',
  })
</script>

<template>
  <v-btn
    :href="props.href"
    :size="props.size"
    variant="text"
    class="px-2 font-weight-bold text-decoration-underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    <v-avatar v-if="props.img" class="mr-1" size="32" :image="props.img" />
    <slot />
  </v-btn>
</template>
