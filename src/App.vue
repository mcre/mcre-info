<template>
  <v-app>
    <v-app-bar color="primary" collapse>
      <span class="font-weight-bold mx-4">mcre.info</span>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-avatar size="128" image="/img/face01.jpg" />
        </v-row>
        <v-row class="mt-10" justify="center">
          <p>一生プログラミングします。</p>
        </v-row>
        <sns-row class="my-6" />
        <v-row justify="center">
          <v-col cols="12" sm="10" md="6" lg="6" xl="4">
            <v-row>
              <v-col><profile-card /></v-col>
            </v-row>
            <v-row>
              <v-col>
                <website-card />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <github-card />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <youtube-card />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="10" md="6" lg="6" xl="4">
            <v-row>
              <v-col>
                <zenn-card />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <note-card />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <waka-time-card />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <twitter-card />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SnsRow from "@/components/SnsRow.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import TwitterCard from "@/components/TwitterCard.vue";
import YoutubeCard from "@/components/YoutubeCard.vue";
import WebsiteCard from "@/components/WebsiteCard.vue";
import GithubCard from "@/components/GithubCard.vue";
import NoteCard from "@/components/NoteCard.vue";
import ZennCard from "@/components/ZennCard.vue";
import WakaTimeCard from "@/components/WakaTimeCard.vue";
</script>

<style lang="scss">
#app {
  font-family: "Zen Maru Gothic", sans-serif;
}
</style>
