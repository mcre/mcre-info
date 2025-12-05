<template>
  <v-card title="Hobbies / Activities">
    <template v-slot:prepend>
      <avatar icon="$mdiGamepadVariantOutline" />
    </template>
    <v-card-text class="pt-0">
      <v-list density="compact" lines="three" :role="null">
        <subheader text="趣味" />
        <list-item
          title="ゲーム"
          :texts="[
            'かまいたちの夜で育ちました。',
            'ドラクエウォークやってます。',
            'Splatoon 3 1,500時間プレイ',
          ]"
          bullet
        />
        <list-item title="読書" text="ホラーとミステリー。" />
        <list-item
          title="スポーツ観戦"
          :texts="[
            '⚾️ 野球観戦: 北海道日本ハムファイターズ',
            '🥌 カーリング観戦',
          ]"
          bullet
        />
        <subheader text="コミュニティ活動" class="mt-8" />
        <list-item
          title="旭川高専ロボットラボラトリ部後援会"
          text="会長としていろいろやってます。"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>
