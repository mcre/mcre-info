<template>
  <v-app>
    <v-app-bar color="primary" collapse>
      <h1 class="font-weight-bold mx-2" style="font-size: 1.4rem">mcre.info</h1>
    </v-app-bar>
    <v-main>
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
          <p>一生プログラミングします。</p>
        </v-row>
        <sns-row class="mt-6" />
      </v-container>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="6" lg="6" xl="4">
            <v-row>
              <v-col>
                <profile-card />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <skill-card />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <website-card />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <youtube-card />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <waka-time-card />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="10" md="6" lg="6" xl="4">
            <v-row>
              <v-col>
                <github-card />
              </v-col>
            </v-row>
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
                <x-card />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
