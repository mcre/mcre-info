<template>
  <v-card title="Profile">
    <template v-slot:prepend>
      <avatar icon="$mdiAccountTie" />
    </template>
    <v-card-text class="pt-0">
      <v-list density="compact" lines="three" :role="null">
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
        <subheader text="職歴" class="mt-8" />
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
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import xImg from "@/assets/images/x.webp";
</script>
