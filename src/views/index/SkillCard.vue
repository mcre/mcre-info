<template>
  <v-card title="Skills">
    <template v-slot:prepend>
      <avatar icon="$mdiArmFlex" />
    </template>
    <v-card-text class="pt-0">
      <v-list density="compact" lines="three" :role="null">
        <subheader text="技術等" />
        <list-item
          title="プログラミング全般"
          text="最近のメインはPython, TypeScript。"
          sub-text="ほかにもJava, Ruby, PHP, Cなどそれなりにさわれます。"
        />
        <list-item
          title="Webアプリ開発"
          text="最近はVue, GraphQL, AWS DynamoDBなどをつかうことが多いです。"
        />
        <list-item
          title="データベース"
          text="AWS RDS/EMR/Athena/Redshift, Azure DataWarehouse/SQLServer等での大規模データ処理の企画、設計、開発、運用経験あり。"
        />
        <list-item
          title="データ分析・機械学習"
          text="SQL, Excel, SAS, Python/Pandasでのデータ集計・変形、TensorFlow/Kerasでの機械学習等。"
          sub-text="特に営業施策の効果分析・予測・レポーティングは豊富な経験あり。"
        />
        <list-item
          title="英語"
          text="メールでの英文のやり取りは5年以上日常的に行っています。"
          sub-text="会議で自在に発言できるほどではないのですが、英会話教室Gabaに3年通い、当初Level 2 だったのが Level 6 まで到達しました。"
          av-href="https://www.gaba.co.jp/aboutgaba/text_level.html"
          av-icon="$mdiBookAlphabet"
          av-tooltip="Gabaのレベル設定"
        />

        <subheader text="受賞歴等" class="mt-8" />
        <list-item
          title="人狼知能大会 <wbr />プロトコル部門"
          text="第2回大会 5位・第3回大会 5位・GAT2017プレ大会 1位"
          av-href="http://aiwolf.org/"
          av-icon="$mdiDog"
          av-tooltip="人狼知能ウェブサイト"
        />
        <list-item
          title="人狼知能大会 <wbr />第3回大会 <wbr /> 自然言語部門"
          text="総合優秀賞+人狼ゲーム賞"
          av-href="https://www.inside-games.jp/article/2017/09/05/109557.html"
          av-icon="$mdiNewspaper"
          av-tooltip="大会紹介ニュース記事"
        />
        <list-item
          title="人狼知能大会 <wbr />第4回大会 <wbr /> 自然言語部門"
          text="準優勝"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>
