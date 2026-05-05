<template>
  <v-list-item>
    <v-list-item-title v-html="title" />

    <v-list-item-subtitle
      v-if="bullet && subtitles.length > 0"
      class="wordwrap"
    >
      <ul class="pl-6 my-1">
        <li v-for="(line, index) in subtitles" :key="index" v-html="line" />
      </ul>
    </v-list-item-subtitle>

    <v-list-item-subtitle
      v-for="(line, index) in subtitles"
      v-else
      :key="index"
      class="wordwrap"
      v-html="line"
    />

    <template v-if="avHref && (avIcon || avImg)" #append>
      <Avatar :href="avHref" :icon="avIcon" :img="avImg" :tooltip="avTooltip" />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
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
  if (props.texts.length > 0) return props.texts;

  const subtitles: string[] = [];
  if (props.text) subtitles.push(props.text);
  if (props.subText) subtitles.push(props.subText);
  return subtitles;
});
</script>
