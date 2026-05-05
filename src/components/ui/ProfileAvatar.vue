<template>
  <v-tooltip v-if="href" location="top" :text="label">
    <template #activator="{ props: activatorProps }">
      <a
        v-bind="activatorProps"
        :aria-label="`${label} を新しいウィンドウで開く`"
        class="profile-avatar"
        :href="href"
        rel="noopener noreferrer"
        target="_blank"
      >
        <v-avatar color="white" variant="elevated">
          <v-img
            v-if="image"
            :alt="label"
            height="28"
            :sizes="imageSrcset ? '28px' : undefined"
            :src="image"
            :srcset="imageSrcset"
            width="28"
          />

          <v-icon v-else :icon="icon" />
        </v-avatar>
      </a>
    </template>
  </v-tooltip>

  <v-avatar v-else color="white" variant="flat">
    <v-img
      v-if="image"
      :alt="label"
      height="28"
      :sizes="imageSrcset ? '28px' : undefined"
      :src="image"
      :srcset="imageSrcset"
      width="28"
    />

    <v-icon v-else :icon="icon" />
  </v-avatar>
</template>

<script setup lang="ts">
defineProps<{
  href?: string;
  icon?: string;
  image?: string;
  imageSrcset?: string;
  label: string;
}>();
</script>

<style scoped>
.profile-avatar {
  display: inline-flex;
  text-decoration: none;
}
</style>
