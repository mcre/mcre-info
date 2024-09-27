<template>
  <v-card title="WakaTime">
    <template v-slot:prepend>
      <avatar
        href="https://wakatime.com/@mcre"
        :img="wakatimeImg"
        tooltip="WakaTime - mcre"
      />
    </template>
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
import wakatimeImg from "@/assets/images/wakatime.webp";
</script>
