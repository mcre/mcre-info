<template>
  <v-layout>
    <v-flex>
      <link-btn
        :href="props.href"
        :size="props.size"
        :img="props.img"
        :icon="props.icon"
      >
        <slot />
      </link-btn>
    </v-flex>
  </v-layout>
</template>

<script setup lang="ts">
import LinkBtn from "@/components/LinkBtn.vue";
interface Props {
  href: string;
  size?: string;
  img?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "large",
});
</script>

<style lang="scss" scoped>
.btn-custom {
  text-transform: none;
}
</style>
