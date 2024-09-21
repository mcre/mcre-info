<template>
  <v-card>
    <v-card-title>
      <link-img
        href="https://wakatime.com/@mcre"
        img="/img/wakatime.png"
        tooltip="WakaTime"
        :size="32"
      />WakaTime
    </v-card-title>
    <v-card-text>
      直近30日間のコーディング言語
      <figure>
        <embed
          src="https://wakatime.com/share/@mcre/40461281-73f0-428d-8bd8-3292d8066db5.svg"
        />
      </figure>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import LinkImg from "@/components/LinkImg.vue";
</script>
