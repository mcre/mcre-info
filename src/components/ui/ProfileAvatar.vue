<template>
  <a
    v-if="href"
    :aria-label="`${label} を新しいウィンドウで開く`"
    class="profile-avatar"
    :href="href"
    rel="noopener noreferrer"
    target="_blank"
    :title="label"
  >
    <v-avatar color="white" variant="elevated">
      <v-img v-if="image" :alt="label" height="28" :src="image" width="28" />

      <v-icon v-else :icon="icon" />
    </v-avatar>
  </a>

  <v-avatar v-else color="white" variant="flat">
    <v-img v-if="image" :alt="label" height="28" :src="image" width="28" />
    <v-icon v-else :icon="icon" />
  </v-avatar>
</template>

<script setup lang="ts">
defineProps<{
  href?: string;
  icon?: string;
  image?: string;
  label: string;
}>();
</script>

<style scoped>
.profile-avatar {
  display: inline-flex;
  text-decoration: none;
}
</style>
