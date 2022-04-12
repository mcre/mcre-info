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
    <v-list-item-header>
      <v-list-item-title v-html="props.title" />
      <v-list-item-subtitle v-if="props.subtitle" v-html="props.subtitle" />
      <v-list-item-subtitle v-if="props.subtitle2" v-html="props.subtitle2" />
    </v-list-item-header>
    <template
      v-if="props.linkHref && (props.linkIcon || props.linkImg)"
      v-slot:append
    >
      <v-list-item-avatar end>
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
      </v-list-item-avatar>
    </template>
  </v-list-item>
</template>
