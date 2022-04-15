<script setup lang="ts">
  interface Props {
    href: string
    size?: string
    img?: string
    icon?: string
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
    class="px-2 btn-custom"
    target="_blank"
    rel="noopener noreferrer"
  >
    <v-avatar v-if="props.img" class="mr-2" size="32" :image="props.img" />
    <v-avatar v-if="props.icon" class="mr-1" size="32">
      <v-icon>{{ props.icon }}</v-icon>
    </v-avatar>
    <span class="font-weight-bold text-decoration-underline">
      <slot />
    </span>
  </v-btn>
</template>

<style lang="scss" scoped>
  .btn-custom {
    text-transform: none;
  }
</style>
