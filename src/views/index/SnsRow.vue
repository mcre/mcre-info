<template>
  <v-row justify="center">
    <v-col cols="auto">
      <link-img
        href="https://x.com/m_cre"
        img="/img/x.png"
        tooltip="X"
        :size="32"
      />
      <link-icon
        href="https://github.com/mcre"
        icon="mdi-github"
        tooltip="GitHub"
      />
      <link-img
        href="https://wakatime.com/@mcre"
        img="/img/wakatime.png"
        tooltip="WakaTime"
        :size="32"
      />
      <link-img
        href="https://note.com/m_cre/"
        img="/img/note.svg"
        tooltip="note"
        :size="40"
      />
      <link-img
        href="https://zenn.dev/m_cre"
        img="/img/zenn.svg"
        tooltip="Zenn"
        :size="28"
      />
      <link-img
        href="https://lapras.com/public/NCTOWDE"
        img="img/laplas.svg"
        tooltip="LAPLAS"
        :size="28"
      />
      <link-icon
        href="https://www.linkedin.com/in/shinya-fujita-03b5ba12/"
        icon="mdi-linkedin"
        tooltip="LinkedIn"
      />
      <link-img
        href="https://www.wantedly.com/id/fujita_shinya"
        img="/img/wantedly.svg"
        tooltip="Wantedly"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import LinkIcon from "@/components/LinkIcon.vue";
import LinkImg from "@/components/LinkImg.vue";
</script>
