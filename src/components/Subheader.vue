<template>
  <v-list-subheader>
    {{ text }}
    <v-icon style="margin-bottom: 4px">$mdiChevronRight</v-icon>
  </v-list-subheader>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>
