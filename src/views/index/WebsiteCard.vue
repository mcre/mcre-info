<template>
  <v-card title="Webapp 開発">
    <template v-slot:prepend>
      <avatar icon="$mdiWeb" />
    </template>
    <v-card-text>
      <item-card
        title="けんみんラボ"
        img="/img/kenmin-lab.png"
        href="https://kenmi-lab.net"
        description="習慣・方言などの都道府県ごとの違いを、だれでも投票できます。"
        :tags="{
          Vue3: ['Vuetify3'],
          AWS: ['API-Gateway', 'DynamoDB', 'Lambda', 'CDK', 'CloudFront'],
        }"
      />
      <item-card
        title="DQW Tools"
        img="/img/dqw-tools.webp"
        href="https://dqw.mcre.info/"
        description="DQW(ドラゴンクエストウォーク)のプレイに役立つ、こころ道クエスト検索ツールを公開しています。"
        :tags="{
          Vue3: ['Vuetify3'],
          AWS: ['API-Gateway', 'CDK', 'CloudFront'],
        }"
      />
      <item-card
        title="CoCoDakara Body Design"
        img="/img/cocodakara.webp"
        href="https://bodydesign.cocodakara.net/"
        description="麻布十番のパーソナルジム「CoCoDakara Body Design」の予約システム開発・運用を担当しています。"
        :tags="{
          Vue: ['Vuetify'],
          AWS: ['AppSync(GraphQL)', 'DynamoDB'],
        }"
      />
      <item-card
        title="熟語パズル"
        img="/img/jukugo.webp"
        href="https://tools.mcre.info/jukugo"
        description="いわゆる「和同開珎パズル」を自動で解いてくれるソルバーです。"
        :tags="{
          Vue3: ['Vuetify3'],
          AWS: ['API-Gateway', 'DynamoDB', 'Lambda', 'CDK', 'CloudFront'],
        }"
      />
    </v-card-text>
  </v-card>
</template>
