<template>
  <v-card title="Profile">
    <template v-slot:prepend>
      <avatar icon="$mdiAccountTie" />
    </template>
    <v-card-text class="pt-0">
      <v-list density="compact" lines="three">
        <list-item
          title="mcre (FUJITA Shinya)"
          text="連絡はXのDMまで"
          av-href="https://x.com/m_cre"
          :av-img="xImg"
          av-tooltip="X"
        />
        <subheader text="出身校" />
        <list-item
          title="旭川工業高等専門学校"
          text="制御情報工学科 卒業"
          sub-text="高専ロボコン出場（機械設計/加工/プログラミング）"
        />
        <list-item title="電気通信大学" text="情報工学科 卒業" />
        <list-item
          title="電気通信大学 大学院"
          text="情報工学専攻 修了"
          sub-text="工学修士"
        />
        <subheader text="職歴" />
        <list-item
          title="ソフトバンク(株)"
          text="営業施策分析、契約者数予測、Azure/AWSでのデータ分析システム企画・開発・運用、スポーツデータの機械学習分析など"
          sub-text="<small>※ウィルコム入社後 吸収合併</small>"
        />
        <list-item
          title="ai6(株)"
          text="スタートアップにて開発全般担当。PoC用ウェブアプリ、PoC用デバイスファームウェア用アプリ、サーバ、データレイク開発、データ分析等。"
          sub-text=" <small>General Manager, Engineering, 現職</small>"
          av-href="https://ai6.jp/"
          av-icon="$mdiBrain"
          av-tooltip="ai6 株式会社"
        />
        <list-item
          title="CoCoDakara(株)"
          text="麻布十番のパーソナルジム「CoCoDakara Body Design」の予約システム開発・運用担当。"
          sub-text="<small>取締役, 現職</small>"
          av-href="https://bodydesign.cocodakara.net/"
          av-icon="$mdiDumbbell"
          av-tooltip="CoCoDakara BodyDesign"
        />
        <list-item
          title="ITフリーランス"
          text="Webアプリ開発等"
          sub-text="<small>現職</small>"
        />

        <subheader text="受賞歴等" />
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
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import xImg from "@/assets/images/x.webp";
</script>
