<template>
  <v-row justify="center">
    <v-col cols="auto">
      <avatar
        v-for="(item, index) in avatars"
        :key="index"
        :href="item.href"
        :img="item.img"
        :icon="item.icon"
        :tooltip="item.tooltip"
        class="mx-1"
      />
    </v-col>
  </v-row>
</template>

<script setup>
const avatars = [
  { href: "https://x.com/m_cre", img: "/img/x.png", tooltip: "X" },
  { href: "https://github.com/mcre", icon: "mdi-github", tooltip: "GitHub" },
  {
    href: "https://wakatime.com/@mcre",
    img: "/img/wakatime.png",
    tooltip: "WakaTime",
  },
  { href: "https://note.com/m_cre/", img: "/img/note.svg", tooltip: "note" },
  { href: "https://zenn.dev/m_cre", img: "/img/zenn.svg", tooltip: "Zenn" },
  {
    href: "https://lapras.com/public/NCTOWDE",
    img: "img/laplas.svg",
    tooltip: "LAPLAS",
  },
  {
    href: "https://www.linkedin.com/in/shinya-fujita-03b5ba12/",
    icon: "mdi-linkedin",
    tooltip: "LinkedIn",
  },
  {
    href: "https://www.wantedly.com/id/fujita_shinya",
    img: "/img/wantedly.svg",
    tooltip: "Wantedly",
  },
];
</script>
