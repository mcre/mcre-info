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
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    const embedContainer = this.$refs.lazyEmbedContainer;

    if (!(embedContainer instanceof HTMLElement)) {
      console.warn("lazyEmbedContainer is not available");
      return;
    }

    // Intersection Observerを使用して要素が画面内に入った時にembedを作成
    this.observer = new IntersectionObserver(
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
    this.observer.observe(embedContainer);
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  },
};
</script>
