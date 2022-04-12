<script setup lang="ts">
  const props = defineProps<{
    parent: string
    children?: string[]
  }>()
</script>

<template>
  <v-chip
    class="ml-1 mt-1 font-weight-bold"
    :class="{ 'pr-0': props.children && props.children.length > 0 }"
    size="small"
    color="info"
  >
    {{ props.parent }}
    <v-chip
      v-for="child in props.children"
      :key="child"
      class="ml-1 font-weight-bold"
      size="small"
    >
      {{ child }}
    </v-chip>
  </v-chip>
</template>
