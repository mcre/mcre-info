<template>
  <span>
    <template v-if="href">
      <v-tooltip
        v-if="tooltip"
        aria-label="Name"
        location="top"
        :text="tooltip"
      >
        <template #activator="{ props }">
          <a
            v-bind="props"
            :aria-label="`${tooltip} を新しいウィンドウで開く`"
            :href="href"
            rel="noopener noreferrer"
            target="_blank"
          >
            <v-avatar color="white" variant="elevated">
              <template v-if="img">
                <img
                  alt="avatar"
                  height="28"
                  loading="lazy"
                  :src="img"
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

      <a v-else :href="href" rel="noopener noreferrer" target="_blank">
        <v-avatar color="white" variant="elevated">
          <template v-if="img">
            <img
              alt="avatar"
              height="28"
              loading="lazy"
              :src="img"
              width="28"
            />
          </template>

          <template v-else>
            <v-icon :icon="icon" />
          </template>
        </v-avatar>
      </a>
    </template>

    <v-avatar v-else color="white" variant="flat">
      <template v-if="img">
        <img alt="avatar" height="28" loading="lazy" :src="img" width="28" />
      </template>

      <template v-else>
        <v-icon :icon="icon" />
      </template>
    </v-avatar>
  </span>
</template>

<script setup>
defineProps({
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
});
</script>
