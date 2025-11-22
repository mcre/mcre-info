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
          av-img="/img/x.webp"
          av-tooltip="X"
        />
        <subheader text="職歴" class="mt-8" />
        <list-item
          title="ソフトバンク(株)"
          :texts="[
            '営業施策分析、契約者数予測、データ分析システム企画・開発・運用、スポーツデータの機械学習分析など',
            '<small>※ウィルコム入社後 吸収合併</small>',
          ]"
        />
        <list-item
          title="ai6(株)"
          :texts="[
            'スタートアップにて開発全般担当。PoC用ウェブアプリ、デバイス関連開発、クラウドシステム、データレイク開発、データ分析等。',
            '<small>テックリード, 現職</small>',
          ]"
          av-href="https://ai6.jp/"
          av-icon="$mdiBrain"
          av-tooltip="ai6 株式会社"
        />
        <list-item
          title="CoCoDakara(株)"
          :texts="[
            '麻布十番のパーソナルジム「CoCoDakara Body Design」の予約システム開発・運用担当。',
            '<small>取締役, 現職</small>',
          ]"
          av-href="https://bodydesign.cocodakara.net/"
          av-icon="$mdiDumbbell"
          av-tooltip="CoCoDakara BodyDesign"
        />
        <list-item
          title="ITフリーランス"
          :texts="['Webアプリ開発等', '<small>現職</small>']"
        />
        <subheader text="学歴" />
        <list-item
          title="旭川工業高等専門学校"
          :texts="[
            '制御情報工学科 卒業',
            'NHK高専ロボコン出場（機械設計/加工/プログラミング）',
          ]"
        />
        <list-item title="電気通信大学" text="情報工学科 卒業" />
        <list-item
          title="電気通信大学 大学院"
          :texts="['情報工学専攻 修了', '工学修士']"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>
