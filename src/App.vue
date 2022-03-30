<template>
  <v-app>
    <v-app-bar collapse>
      <span @click="$router.push({ name: 'home' })">mcre.info</span>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
