<template>
  <span>
    <v-tooltip v-if="href && tooltip" location="top" :text="tooltip">
      <template #activator="{ props: activatorProps }">
        <a
          v-bind="activatorProps"
          :aria-label="linkLabel"
          :href="href"
          rel="noopener noreferrer"
          target="_blank"
        >
          <v-avatar color="white" variant="elevated">
            <template v-if="img">
              <img
                :alt="avatarLabel"
                height="28"
                loading="lazy"
                :sizes="imgSrcset ? '28px' : undefined"
                :src="img"
                :srcset="imgSrcset || undefined"
                width="28"
              />
            </template>

            <template v-else>
              <v-icon :icon="icon" />
            </template>
          </v-avatar>
        </a>
      </template>
    </v-tooltip>

    <a
      v-else-if="href"
      :aria-label="linkLabel"
      :href="href"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-avatar color="white" variant="elevated">
        <template v-if="img">
          <img
            :alt="avatarLabel"
            height="28"
            loading="lazy"
            :sizes="imgSrcset ? '28px' : undefined"
            :src="img"
            :srcset="imgSrcset || undefined"
            width="28"
          />
        </template>

        <template v-else>
          <v-icon :icon="icon" />
        </template>
      </v-avatar>
    </a>

    <v-avatar v-else color="white" variant="flat">
      <template v-if="img">
        <img
          :alt="avatarLabel"
          height="28"
          loading="lazy"
          :sizes="imgSrcset ? '28px' : undefined"
          :src="img"
          :srcset="imgSrcset || undefined"
          width="28"
        />
      </template>

      <template v-else>
        <v-icon :icon="icon" />
      </template>
    </v-avatar>
  </span>
</template>

<script setup>
const props = defineProps({
  href: {
    type: String,
    default: "",
  },
  tooltip: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  img: {
    type: String,
    default: "",
  },
  imgSrcset: {
    type: String,
    default: "",
  },
});

const avatarLabel = computed(() => props.tooltip || "avatar");
const linkLabel = computed(() =>
  props.tooltip
    ? `${props.tooltip} を新しいウィンドウで開く`
    : "外部リンクを新しいウィンドウで開く",
);
</script>
