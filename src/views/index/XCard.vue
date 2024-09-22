<template>
  <v-card title="Posts">
    <template v-slot:prepend>
      <avatar href="https://x.com/m_cre" img="/img/x.png" tooltip="X - m_cre" />
    </template>
    <v-card-text>
      <v-lazy>
        <x-embedded />
      </v-lazy>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <more-btn href="https://x.com/m_cre" />
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
