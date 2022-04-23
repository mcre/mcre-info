<script setup lang="ts">
  interface MainProps {
    href: string
    img: string
    tooltip: string
    size?: number
  }

  const mainProps = withDefaults(defineProps<MainProps>(), {
    size: 48,
  })
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
        <v-avatar
          :size="mainProps.size"
          :image="mainProps.img"
          v-bind="props"
        />
      </v-btn>
    </template>
    <span>{{ mainProps.tooltip }}</span>
  </v-tooltip>
</template>
