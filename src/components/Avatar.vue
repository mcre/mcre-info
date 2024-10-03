<template>
  <span>
    <template v-if="href">
      <v-tooltip
        v-if="tooltip"
        :text="tooltip"
        location="top"
        aria-label="Name"
      >
        <template v-slot:activator="{ props }">
          <a
            :href="href"
            target="_blank"
            rel="noopener noreferrer"
            v-bind="props"
            :aria-label="`${tooltip} を新しいウィンドウで開く`"
          >
            <v-avatar color="white" variant="elevated">
              <template v-if="img">
                <img
                  :src="img"
                  alt="avatar"
                  loading="lazy"
                  width="28"
                  height="28"
                />
              </template>
              <template v-else>
                <v-icon :icon="icon" />
              </template>
            </v-avatar>
          </a>
        </template>
      </v-tooltip>
      <a v-else :href="href" target="_blank" rel="noopener noreferrer">
        <v-avatar color="white" variant="elevated">
          <template v-if="img">
            <img
              :src="img"
              loading="lazy"
              alt="avatar"
              height="28"
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
        <img :src="img" loading="lazy" alt="avatar" height="28" width="28" />
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
