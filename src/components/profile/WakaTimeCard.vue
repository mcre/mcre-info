<template>
  <v-card title="WakaTime">
    <template #prepend>
      <ProfileAvatar
        href="https://wakatime.com/@mcre"
        image="/img/wakatime.webp"
        :image-srcset="getHighDensityImageSrcset('/img/wakatime.webp')"
        label="WakaTime"
      />
    </template>

    <v-card-text>
      <p class="mb-3">直近30日間のコーディング言語</p>

      <figure class="ma-0">
        <div ref="lazyEmbedContainer" class="wakatime-embed" />
      </figure>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { getHighDensityImageSrcset } from "@/utils/imageSrcset";

const lazyEmbedContainer = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const renderEmbed = () => {
  if (!lazyEmbedContainer.value) return;
  lazyEmbedContainer.value.innerHTML = `
    <embed
      src="https://wakatime.com/share/@mcre/40461281-73f0-428d-8bd8-3292d8066db5.svg"
      type="image/svg+xml"
    />
  `;
};

onMounted(() => {
  if (!lazyEmbedContainer.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;
      renderEmbed();
      observer?.disconnect();
      observer = null;
    },
    { threshold: 0.1 },
  );
  observer.observe(lazyEmbedContainer.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.wakatime-embed {
  min-height: 160px;
}
</style>
