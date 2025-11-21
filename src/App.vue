<template>
  <v-app>
    <v-app-bar color="primary" collapse>
      <h1 class="font-weight-bold mx-2" style="font-size: 1.4rem">mcre.info</h1>
    </v-app-bar>
    <v-main style="--v-layout-top: 64px">
      <v-container>
        <v-row justify="center">
          <v-avatar size="128">
            <img
              src="/img/face01.webp"
              alt="私の顔写真"
              width="128"
              height="128"
            />
          </v-avatar>
        </v-row>
        <v-row class="mt-10" justify="center">
          <p>ものづくり欲と、ものがたり欲。</p>
        </v-row>
        <sns-row class="mt-6" />

        <!-- PC用レイアウト -->
        <v-row v-if="mdAndUp" class="mt-10" justify="center">
          <v-col cols="12" sm="10" md="6" lg="6" xl="4">
            <profile-card class="mb-4" />
            <zenn-card class="mb-4" />
            <github-card class="mb-4" />
            <website-card class="mb-4" />
            <youtube-card class="mb-4" />
          </v-col>
          <v-col cols="12" sm="10" md="6" lg="6" xl="4">
            <skill-card class="mb-4" />
            <note-card class="mb-4" />
            <waka-time-card class="mb-4"/>
          </v-col>
        </v-row>

        <!-- スマホ用レイアウト -->
        <v-row v-else class="mt-10" justify="center">
          <v-col cols="12" sm="10" md="6" lg="6" xl="4">
            <profile-card class="mb-4" />
            <skill-card class="mb-4" />
            <zenn-card class="mb-4" />
            <note-card class="mb-4"/>
            <github-card class="mb-4" />
            <website-card class="mb-4" />
            <youtube-card class="mb-4" />
            <waka-time-card class="mb-4" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
</script>
