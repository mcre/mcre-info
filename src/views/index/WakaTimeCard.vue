<template>
  <v-card title="WakaTime">
    <template v-slot:prepend>
      <avatar
        href="https://wakatime.com/@mcre"
        img="/img/wakatime.webp"
        tooltip="WakaTime - mcre"
      />
    </template>
    <v-card-text>
      直近30日間のコーディング言語
      <figure>
        <div ref="lazyEmbedContainer" />
      </figure>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  mounted() {
    const embedContainer = this.$refs.lazyEmbedContainer;

    // Intersection Observerを使用して要素が画面内に入った時にembedを作成
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            embedContainer.innerHTML = `
              <embed
                src="https://wakatime.com/share/@mcre/40461281-73f0-428d-8bd8-3292d8066db5.svg"
                type="image/svg+xml"
              />
            `;
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    // 監視を開始
    observer.observe(embedContainer);
  },
};
</script>
