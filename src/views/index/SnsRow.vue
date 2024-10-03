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
const avatars = [
  {
    href: "https://x.com/m_cre",
    img: "/img/x.webp",
    tooltip: "X",
  },
  { href: "https://github.com/mcre", icon: "$mdiGithub", tooltip: "GitHub" },
  {
    href: "https://wakatime.com/@mcre",
    img: "/img/wakatime.webp",
    tooltip: "WakaTime",
  },
  {
    href: "https://note.com/m_cre/",
    img: "/img/note.webp",
    tooltip: "note",
  },
  {
    href: "https://zenn.dev/m_cre",
    img: "/img/zenn.webp",
    tooltip: "Zenn",
  },
  {
    href: "https://lapras.com/public/NCTOWDE",
    img: "/img/lapras.webp",
    tooltip: "LAPRAS",
  },
  {
    href: "https://www.linkedin.com/in/shinya-fujita-03b5ba12/",
    icon: "$mdiLinkedin",
    tooltip: "LinkedIn",
  },
  {
    href: "https://www.wantedly.com/id/fujita_shinya",
    img: "/img/wantedly.webp",
    tooltip: "Wantedly",
  },
];
</script>
