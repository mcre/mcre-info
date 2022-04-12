<script setup lang="ts">
  const mainProps = defineProps<{
    href: string
    img: string
    tooltip: string
  }>()
</script>

<template>
  <v-tooltip anchor="top">
    <template #activator="{ props }">
      <v-btn
        :href="mainProps.href"
        icon
        variant="text"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-avatar size="32" :image="mainProps.img" v-bind="props" />
      </v-btn>
    </template>
    <span>{{ mainProps.tooltip }}</span>
  </v-tooltip>
</template>
