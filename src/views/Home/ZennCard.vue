<script setup lang="ts">
  import LinkBtn from '@/components/LinkBtn.vue'
  import ItemCard from '@/components/ItemCard.vue'
  import LinkImg from '@/components/LinkImg.vue'
  import { mdiPostageStamp } from '@mdi/js'
</script>

<template>
  <v-card>
    <v-card-title>
      <link-img
        href="https://zenn.dev/m_cre"
        img="/img/zenn.svg"
        tooltip="note"
        :size="36"
      />Zenn
    </v-card-title>
    <v-card-text>
      <item-card
        title="年賀状の宛名印刷難民の救済"
        :icon="mdiPostageStamp"
        href="https://zenn.dev/m_cre/articles/address-printing-on-jp-postcards"
        description="毎年年末に悩まされる年賀状、近年の傾向のとおり私も基本的には止めてしまったのですが、親戚だけには出すことにしています。Windowsであれば手頃な宛名印刷ソフトがいくつかあったと思うのですが、Macに乗り換えてからは定番のものがみつからず、困っていたものです。それであれば、自分でつくろうと考えました。Macだけでなく、DockerさえインストールできればWindowsでもLinuxでもラズパイでもうごくはずです。たぶん。"
        :tags="{
          Python: [],
          TeX: [],
        }"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <link-btn href="https://zenn.dev/m_cre">もっと見る</link-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
