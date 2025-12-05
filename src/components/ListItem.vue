<template>
  <v-list-item>
    <v-list-item-title v-html="title" />
    <v-list-item-subtitle v-if="bullet && subtitles.length" class="wordwrap">
      <ul class="pl-6 my-1">
        <li v-for="(line, index) in subtitles" :key="index" v-html="line" />
      </ul>
    </v-list-item-subtitle>
    <v-list-item-subtitle
      v-else
      v-for="(line, index) in subtitles"
      :key="index"
      class="wordwrap"
      v-html="line"
    />
    <template v-if="avHref && (avIcon || avImg)" v-slot:append>
      <avatar :href="avHref" :tooltip="avTooltip" :icon="avIcon" :img="avImg" />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";

const props = defineProps({
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
  texts: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  bullet: {
    type: Boolean,
    default: false,
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

const subtitles = computed(() => {
  if (props.texts.length) return props.texts;

  const subtitles: string[] = [];
  if (props.text) subtitles.push(props.text);
  if (props.subText) subtitles.push(props.subText);
  return subtitles;
});
</script>
