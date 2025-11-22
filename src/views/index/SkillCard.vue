<template>
  <v-card title="Skills">
    <template v-slot:prepend>
      <avatar icon="$mdiArmFlex" />
    </template>
    <v-card-text class="pt-0">
      <v-list density="compact" lines="three" :role="null">
        <subheader text="技術等" />
        <list-item
          title="フルスタック開発"
          text="クラウドアーキテクチャ設計、データベース、バックエンド、フロントエンドまで横断して開発できます。"
        />
        <list-item
          title="Webアプリ開発"
          text="Vue.js, AWSサーバレス(Lambda, DynamoDB, API-Gateway等)の構成をよく使います。"
        />
        <list-item
          title="データベース"
          text="AWS DynamoDB / RDS / EMR / Athena / Redshift, Azure Data Warehouse / SQL Server 等。"
        />
        <list-item
          title="データ分析・機械学習"
          text="SQL, Excel, SAS, Python/Pandasでのデータ処理、TensorFlow / Keras での機械学習等。"
        />

        <subheader text="受賞歴等" class="mt-8" />
        <list-item
          title="人狼知能大会 <wbr />プロトコル部門"
          :texts="['第2回大会 5位・第3回大会 5位・GAT2017プレ大会 1位']"
          av-href="http://aiwolf.org/"
          av-icon="$mdiDog"
          av-tooltip="人狼知能ウェブサイト"
        />
        <list-item
          title="人狼知能大会 <wbr />第3回大会 <wbr /> 自然言語部門"
          :texts="['総合優秀賞+人狼ゲーム賞']"
          av-href="https://www.inside-games.jp/article/2017/09/05/109557.html"
          av-icon="$mdiNewspaper"
          av-tooltip="大会紹介ニュース記事"
        />
        <list-item
          title="人狼知能大会 <wbr />第4回大会 <wbr /> 自然言語部門"
          :texts="['準優勝']"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>
