<script setup lang="ts">
  import ItemCard from '@/components/ItemCard.vue'
  import { mdiWeb } from '@mdi/js'
</script>

<template>
  <v-card>
    <v-card-title><v-icon left :icon="mdiWeb" />Webapp 開発</v-card-title>
    <v-card-text>
      <item-card
        title="DQW Tools"
        img="/img/dqw-tools.png"
        href="https://dqw.mcre.info/"
        description="DQW(ドラゴンクエストウォーク)のプレイに役立つ、こころ道クエスト検索ツールを公開しています。"
        :tags="{
          Vue3: ['Vuetify3'],
        }"
      />
      <item-card
        title="CoCoDakara Body Design"
        img="/img/cocodakara.png"
        href="https://bodydesign.cocodakara.net/"
        description="麻布十番のパーソナルジム「CoCoDakara Body Design」の予約システム開発・運用を担当しています。"
        :tags="{
          Vue: ['Vuetify'],
          AWS: ['AppSync(GraphQL)', 'DynamoDB'],
        }"
      />
      <item-card
        title="熟語パズル"
        img="/img/jukugo.png"
        href="http://www.mchs-u.net/mc/jukugo/"
        description="いわゆる「和同開珎パズル」を自動で解いてくれるソルバーです。たぶんそのうちリメイクします。"
        :tags="{
          PHP: [],
          MySQL: [],
        }"
      />
      <item-card
        title="脱出歴"
        img="/img/dhist.png"
        href="http://www.mchs-u.net/mc/app/dhist/"
        description="「リアル脱出ゲーム」などの参加型ゲームイベントの参加歴作成・共有サービス（ほぼ放置中・・・）"
        :tags="{
          'Ruby on Rails': [],
          MySQL: [],
        }"
      />
    </v-card-text>
  </v-card>
</template>
