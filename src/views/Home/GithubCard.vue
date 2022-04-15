<script setup lang="ts">
  import LinkBtn from '@/components/LinkBtn.vue'
  import ItemCard from '@/components/ItemCard.vue'
  import LinkIcon from '@/components/LinkIcon.vue'
</script>

<template>
  <v-card>
    <v-card-title>
      <link-icon
        href="https://github.com/mcre"
        icon="mdi-github"
        tooltip="GitHub"
      />GitHub
    </v-card-title>
    <v-card-text>
      <item-card
        title="mcre-info"
        img="/img/favicon32.png"
        href="https://github.com/mcre/mcre-info"
        description="このサイトのソースコードを公開しています。"
        :tags="{
          Vue3: ['Vuetify3'],
        }"
      />
      <item-card
        title="address-printing-on-jp-postcards"
        icon="mdi-cards-outline"
        href="https://github.com/mcre/address-printing-on-jp-postcards"
        description="毎年の年賀状宛名印刷のために作りました。柔軟なフォーマットで差込印刷できます。"
        :tags="{
          Python: [],
          TeX: [],
        }"
      />
      <item-card
        title="aiwolf-4th-nlp"
        icon="mdi-dog"
        href="https://github.com/mcre/aiwolf-4th-nlp"
        description="人狼知能大会 自然言語部門 第4回大会に参加したときのソースコードを公開しています。"
        coverImg="/img/aiwolf-4th-nlp.png"
        :tags="{
          Java: [],
          NLP: ['Juman', 'KNP'],
        }"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <link-btn href="https://github.com/mcre">もっと見る</link-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
