const highDensityImages = new Set([
  "/img/face01.webp",
  "/img/lapras.webp",
  "/img/note.webp",
  "/img/wakatime.webp",
  "/img/wantedly.webp",
  "/img/x.webp",
  "/img/zenn.webp",
]);

export const getHighDensityImageSrcset = (image?: string) => {
  if (!image || !highDensityImages.has(image)) return undefined;

  return `${image} 1x, ${image.replace(/\.webp$/, "-2x.webp")} 2x`;
};
