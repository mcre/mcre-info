<script setup lang="ts">
  import ProfileCard from '@/views/Home/ProfileCard.vue'
  import TwitterCard from '@/views/Home/TwitterCard.vue'
  import YoutubeCard from '@/views/Home/YoutubeCard.vue'
  import WebsiteCard from '@/views/Home/WebsiteCard.vue'
  import GithubCard from '@/views/Home/GithubCard.vue'
  import NoteCard from '@/views/Home/NoteCard.vue'
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-avatar size="128" image="/img/face01.jpg" />
    </v-row>
    <v-row class="mt-10" justify="center">
      <p>一生プログラミングします。</p>
    </v-row>
    <v-row justify="center">
      <v-col class="my-4" cols="12" sm="10" md="8" lg="6" xl="4">
        <v-row>
          <v-col><profile-card /></v-col>
        </v-row>
        <v-row>
          <v-col>
            <youtube-card />
          </v-col>
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
            <note-card />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-lazy><twitter-card /></v-lazy>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
