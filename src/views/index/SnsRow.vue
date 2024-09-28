<template>
  <v-row justify="center">
    <v-col
      cols="3"
      sm="1"
      v-for="(item, index) in avatars"
      :key="index"
      class="d-flex justify-center"
    >
      <avatar
        :href="item.href"
        :img="item.img"
        :icon="item.icon"
        :tooltip="item.tooltip"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import xImg from "@/assets/images/x.webp";
import wakatimeImg from "@/assets/images/wakatime.webp";
import noteImg from "@/assets/images/note.webp";
import zennImg from "@/assets/images/zenn.webp";
import laprasImg from "@/assets/images/lapras.webp";
import wantedlyImg from "@/assets/images/wantedly.webp";

const avatars = [
  {
    href: "https://x.com/m_cre",
    img: xImg,
    tooltip: "X",
  },
  { href: "https://github.com/mcre", icon: "$mdiGithub", tooltip: "GitHub" },
  {
    href: "https://wakatime.com/@mcre",
    img: wakatimeImg,
    tooltip: "WakaTime",
  },
  {
    href: "https://note.com/m_cre/",
    img: noteImg,
    tooltip: "note",
  },
  {
    href: "https://zenn.dev/m_cre",
    img: zennImg,
    tooltip: "Zenn",
  },
  {
    href: "https://lapras.com/public/NCTOWDE",
    img: laprasImg,
    tooltip: "LAPRAS",
  },
  {
    href: "https://www.linkedin.com/in/shinya-fujita-03b5ba12/",
    icon: "$mdiLinkedin",
    tooltip: "LinkedIn",
  },
  {
    href: "https://www.wantedly.com/id/fujita_shinya",
    img: wantedlyImg,
    tooltip: "Wantedly",
  },
];
</script>
