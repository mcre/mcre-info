<template>
  <v-app>
    <v-app-bar color="primary" collapse>
      <span @click="$router.push({ name: 'home' })" class="font-weight-bold">
        mcre.info
      </span>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
  #app {
    font-family: 'Zen Maru Gothic', sans-serif;
  }
</style>
