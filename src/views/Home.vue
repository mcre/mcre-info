<script setup lang="ts">
  import SnsRow from '@/views/Home/SnsRow.vue'
  import ProfileCard from '@/views/Home/ProfileCard.vue'
  import TwitterCard from '@/views/Home/TwitterCard.vue'
  import YoutubeCard from '@/views/Home/YoutubeCard.vue'
  import WebsiteCard from '@/views/Home/WebsiteCard.vue'
  import GithubCard from '@/views/Home/GithubCard.vue'
  import NoteCard from '@/views/Home/NoteCard.vue'
  import ZennCard from '@/views/Home/ZennCard.vue'
  import WakaTimeCard from '@/views/Home/WakaTimeCard.vue'
</script>

<template>
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
</template>
