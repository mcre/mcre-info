<script setup lang="ts">
  import LinkIcon from '@/components/LinkIcon.vue'
  import LinkImg from '@/components/LinkImg.vue'
  import ListItem from '@/components/ListItem.vue'
  import {
    mdiAccountTie,
    mdiTwitter,
    mdiDog,
    mdiNewspaper,
    mdiGithub,
    mdiLinkedin,
    mdiBookAlphabet,
  } from '@mdi/js'
</script>

<template>
  <v-card>
    <v-card-title><v-icon left :icon="mdiAccountTie" />Profile</v-card-title>
    <v-card-text class="pt-0">
      <v-list :density="null" lines="three">
        <v-list-subheader>名前</v-list-subheader>
        <list-item title="mcre" subtitle="(FUJITA Shinya)" />
        <v-list-subheader>連絡先</v-list-subheader>
        <list-item
          title="TwitterのDM"
          link-href="https://twitter.com/m_cre"
          :link-icon="mdiTwitter"
          link-tooltip="Twitter DM"
        />
        <v-list-subheader>出身校</v-list-subheader>
        <list-item
          title="旭川工業高等専門学校"
          subtitle="制御情報工学科 卒業"
          subtitle2="高専ロボコン出場（機械設計/加工/プログラミング）"
        />
        <list-item title="電気通信大学" subtitle="情報工学科 卒業" />
        <list-item
          title="電気通信大学 大学院"
          subtitle="情報工学専攻 修了"
          subtitle2="工学修士"
        />
        <v-list-subheader>職歴</v-list-subheader>
        <list-item
          title="ソフトバンク(株)"
          subtitle="営業施策分析、契約者数予測、Azure/AWSでのデータ分析システム企画・開発・運用、スポーツデータの機械学習分析など"
          subtitle2="<small>※ウィルコム入社後 吸収合併</small>"
        />
        <list-item
          title="ai6(株)"
          subtitle="スタートアップにて開発全般担当。PoC用ウェブアプリ、PoC用デバイスファームウェア用アプリ、サーバ、データレイク開発、データ分析等。"
          subtitle2="<small>現職</small>"
        />
        <list-item
          title="ITフリーランス"
          subtitle="Webアプリ開発等"
          subtitle2="<small>現職</small>"
        />
        <v-list-subheader>受賞歴等</v-list-subheader>
        <list-item
          title="人狼知能大会 <wbr />プロトコル部門"
          subtitle="第2回大会 5位・第3回大会 5位・GAT2017プレ大会 1位"
          link-href="http://aiwolf.org/"
          :link-icon="mdiDog"
          link-tooltip="人狼知能ウェブサイト"
        />
        <list-item
          title="人狼知能大会 <wbr />第3回大会 <wbr /> 自然言語部門"
          subtitle="総合優秀賞+人狼ゲーム賞"
          link-href="https://www.inside-games.jp/article/2017/09/05/109557.html"
          :link-icon="mdiNewspaper"
          link-tooltip="大会紹介ニュース記事"
        />
        <list-item
          title="人狼知能大会 <wbr />第4回大会 <wbr /> 自然言語部門"
          subtitle="準優勝"
        />
        <v-list-subheader>技術等</v-list-subheader>
        <list-item
          title="プログラミング全般"
          subtitle="最近のメインはPython, TypeScript。"
          subtitle2="ほかにもJava, Ruby, PHP, Cなどそれなりにさわれます。"
        />
        <list-item
          title="Webアプリ開発"
          subtitle="最近はVue, GraphQL, AWS DynamoDBなどをつかうことが多いです。"
        />
        <list-item
          title="データベース"
          subtitle="AWS RDS/EMR/Athena/Redshift, Azure DataWarehouse/SQLServer等での大規模データ処理の企画、設計、開発、運用経験あり。"
        />
        <list-item
          title="データ分析・機械学習"
          subtitle="SQL, Excel, Python/Pandasでのデータ集計・変形、TensorFlow/Kerasでの機械学習等。"
          subtitle2="特に営業施策の効果分析・予測・レポーティングは豊富な経験あり。"
        />
        <list-item
          title="英語"
          subtitle="メールでの英文のやり取りは3年以上日常的に行っています。"
          subtitle2="会議で自在に発言できるほどではないので、英会話教室Gabaで Level5 の学習中。"
          link-href="https://www.gaba.co.jp/aboutgaba/text_level.html"
          :link-icon="mdiBookAlphabet"
          link-tooltip="Gabaのレベル設定"
        />
      </v-list>
      <v-divider class="my-4" />
      <v-row>
        <v-col align="center">
          <link-icon
            href="https://twitter.com/m_cre"
            :icon="mdiTwitter"
            tooltip="Twitter"
          />
          <link-icon
            href="https://github.com/mcre"
            :icon="mdiGithub"
            tooltip="GitHub"
          />
          <link-img
            href="https://note.com/m_cre/"
            img="/img/note.svg"
            tooltip="note"
            :size="40"
          />
          <link-img
            href="https://lapras.com/public/NCTOWDE"
            img="img/laplas.svg"
            tooltip="LAPLAS"
            :size="28"
          />
          <link-icon
            href="https://www.linkedin.com/in/shinya-fujita-03b5ba12/"
            :icon="mdiLinkedin"
            tooltip="LinkedIn"
          />
          <link-img
            href="https://www.wantedly.com/id/fujita_shinya"
            img="/img/wantedly.svg"
            tooltip="wantedly"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
