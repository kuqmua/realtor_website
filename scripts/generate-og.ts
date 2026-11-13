import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { site } from "../src/data/site.ts";
const xml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
// The build-only font is bundled with its license; no host fonts or external services.
const fontfile = resolve("build-assets/fonts/DejaVuSans.ttf");
async function text(
  value: string,
  size: number,
  color: string,
  left: number,
  top: number,
) {
  return {
    left,
    top,
    input: await sharp({
      text: {
        text: `<span foreground="${color}">${xml(value)}</span>`,
        font: `DejaVu Sans ${size}`,
        fontfile,
        rgba: true,
      },
    })
      .png()
      .toBuffer(),
  };
}
const background = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#23483e"/><rect x="48" y="48" width="1104" height="534" rx="8" fill="none" stroke="#8ca397"/><path d="M90 340H1110" stroke="#8ca397"/></svg>`;
const layers = await Promise.all([
  text("ЧАСТНЫЙ РИЕЛТОР · ЧЕБОКСАРЫ", 22, "#c1d1b4", 90, 138),
  text(site.name, 44, "#faf9f5", 90, 238),
  text("Покупка и продажа недвижимости", 32, "#faf9f5", 90, 390),
  text("Ипотека · Сопровождение сделки", 27, "#c1d1b4", 90, 452),
  ...(!site.approved
    ? [text("Демонстрационная версия", 18, "#e6d7b9", 90, 530)]
    : []),
]);
await writeFile(
  "public/og-image.jpg",
  await sharp(Buffer.from(background))
    .composite(layers)
    .jpeg({ quality: 84 })
    .toBuffer(),
);
