<script setup lang="ts">
  import { defineProps } from 'vue'

  const mainProps = defineProps<{
    href: string
    icon: string
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
        <v-icon v-bind="props">
          {{ mainProps.icon }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ mainProps.tooltip }}</span>
  </v-tooltip>
</template>
