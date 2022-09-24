<script setup lang="ts">
  import LinkIcon from '@/components/LinkIcon.vue'
  import LinkImg from '@/components/LinkImg.vue'

  const props = defineProps<{
    title: string
    subtitle?: string
    subtitle2?: string
    linkHref?: string
    linkIcon?: string
    linkImg?: string
    linkTooltip?: string
  }>()
</script>

<template>
  <v-list-item>
    <v-list-item-title v-html="props.title" />
    <v-list-item-subtitle
      v-if="props.subtitle"
      class="wordwrap"
      v-html="props.subtitle"
    />
    <v-list-item-subtitle
      v-if="props.subtitle2"
      class="wordwrap"
      v-html="props.subtitle2"
    />
    <template
      v-if="props.linkHref && (props.linkIcon || props.linkImg)"
      v-slot:append
    >
      <link-icon
        v-if="props.linkIcon"
        :href="props.linkHref"
        :icon="props.linkIcon"
        :tooltip="props.linkTooltip"
      />
      <link-img
        v-if="props.linkImg"
        :href="props.linkHref"
        :img="props.linkImg"
        :tooltip="props.linkTooltip"
      />
    </template>
  </v-list-item>
</template>

<style lang="scss" scoped>
  .wordwrap {
    -webkit-box-orient: initial;
  }
</style>
