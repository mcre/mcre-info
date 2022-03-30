<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10" lg="6" xl="6">
        <v-card class="my-2" v-for="n of 20" :key="n">
          <v-card-title>テスト</v-card-title>
          <v-card-text>テスト</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
