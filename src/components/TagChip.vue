<template>
  <v-chip
    class="ml-1 mt-1 font-weight-bold"
    :class="{ 'pr-0': children && children.length > 0 }"
    size="small"
    color="info"
  >
    {{ parent }}
    <v-chip
      v-for="child in children"
      :key="child"
      class="ml-1 font-weight-bold"
      size="small"
    >
      {{ child }}
    </v-chip>
  </v-chip>
</template>

<script setup lang="ts">
defineProps({
  parent: {
    type: String,
    required: true,
  },
  children: {
    type: Array as () => string[],
    default: () => [],
  },
});
</script>
