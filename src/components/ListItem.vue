<template>
  <v-list-item>
    <v-list-item-title v-html="title" />
    <v-list-item-subtitle v-if="text" class="wordwrap" v-html="text" />
    <v-list-item-subtitle v-if="subText" class="wordwrap" v-html="subText" />
    <template v-if="avHref && (avIcon || avImg)" v-slot:append>
      <avatar :href="avHref" :tooltip="avTooltip" :icon="avIcon" :img="avImg" />
    </template>
  </v-list-item>
</template>

<style lang="scss" scoped>
.wordwrap {
  -webkit-box-orient: initial;
}
</style>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
  subText: {
    type: String,
    default: "",
  },
  avHref: {
    type: String,
    default: "",
  },
  avIcon: {
    type: String,
    default: "",
  },
  avImg: {
    type: String,
    default: "",
  },
  avTooltip: {
    type: String,
    default: "",
  },
});
</script>
