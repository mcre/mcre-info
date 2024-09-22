<template>
  <span>
    <template v-if="href">
      <v-tooltip v-if="tooltip" :text="tooltip" location="top">
        <template v-slot:activator="{ props }">
          <a
            :href="href"
            target="_blank"
            rel="noopener noreferrer"
            v-bind="props"
          >
            <v-avatar color="white" variant="elevated">
              <template v-if="img">
                <v-img :src="img" alt="avatar" max-height="28" max-width="28" />
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
            <v-img :src="img" alt="avatar" max-height="28" max-width="28" />
          </template>
          <template v-else>
            <v-icon :icon="icon" />
          </template>
        </v-avatar>
      </a>
    </template>

    <v-avatar v-else color="white" variant="flat">
      <template v-if="img">
        <v-img :src="img" alt="avatar" max-height="28" max-width="28" />
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
