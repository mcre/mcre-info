<script setup lang="ts">
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
        <v-icon size="x-large" v-bind="props">
          {{ mainProps.icon }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ mainProps.tooltip }}</span>
  </v-tooltip>
</template>
