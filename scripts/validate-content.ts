import { existsSync, statSync } from "node:fs";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { site } from "../src/data/site.ts";
// Content module uses Vite asset imports; inspect it through the Vite loader below.
import { createServer } from "vite";
import type { Property, PropertyImage } from "../src/types/content.ts";
function imagePath(src: string) {
  const path = src.split("?")[0];
  if (!path.startsWith("/") || path.includes("..") || path.includes("\\"))
    throw Error(`Неверный путь изображения: ${path}`);
  const local = fileURLToPath(
    new URL(
      path.startsWith("/src/assets/") ? `..${path}` : `../public${path}`,
      import.meta.url,
    ),
  );
  if (!existsSync(local) || !statSync(local).isFile())
    throw Error(`Нет локального изображения: ${path}`);
  return local;
}
function imageVariants(image: PropertyImage) {
  const result: { src: string; width: number }[] = [];
  for (const source of image.sources || [])
    if (!["image/avif", "image/webp"].includes(source.type))
      throw Error("Неверный формат picture source");
  for (const srcSet of [
    image.srcSet,
    ...(image.sources || []).map((s) => s.srcSet),
  ]) {
    if (srcSet === undefined) continue;
    for (const candidate of srcSet.split(",")) {
      const match = candidate.trim().match(/^(\S+) ([1-9]\d*)w$/);
      if (!match) throw Error("Неверный srcSet изображения");
      result.push({ src: match[1], width: Number(match[2]) });
    }
  }
  return result;
}
export async function validateImageMetadata(image: PropertyImage) {
  for (const variant of [
    { src: image.src, width: image.width, height: image.height },
    ...imageVariants(image),
  ]) {
    const metadata = await sharp(imagePath(variant.src)).metadata();
    if (
      metadata.width !== variant.width ||
      ("height" in variant && metadata.height !== variant.height)
    )
      throw Error(`Размеры изображения не совпадают: ${variant.src}`);
    if (metadata.exif || metadata.xmp || metadata.iptc || metadata.orientation)
      throw Error(`Удалите метаданные изображения: ${variant.src}`);
  }
}
export function validateProperties(items: Property[]) {
  const ids = new Set<string>();
  for (const p of items) {
    if (!/^[a-z0-9-]+$/.test(p.id) || ids.has(p.id))
      throw Error(`Неверный или повторный ID: ${p.id}`);
    ids.add(p.id);
    if (!p.title.trim() || !p.locality.trim() || !p.description.trim())
      throw Error(`Пустой текст: ${p.id}`);
    if (
      !Number.isFinite(p.priceRub) ||
      p.priceRub <= 0 ||
      !Number.isFinite(p.areaM2) ||
      p.areaM2 <= 0
    )
      throw Error(`Неверная цена/площадь: ${p.id}`);
    if (p.published && !p.images.length) throw Error(`Нет фото: ${p.id}`);
    if (
      p.kind === "apartment" &&
      (![p.rooms, p.floor, p.floorsTotal].every(
        (n) => Number.isInteger(n) && n! > 0,
      ) ||
        p.floor! > p.floorsTotal!)
    )
      throw Error(`Нет характеристик квартиры: ${p.id}`);
    if (
      p.kind === "land" &&
      (!Number.isFinite(p.landAreaM2) || p.landAreaM2! <= 0)
    )
      throw Error(`Нет площади участка: ${p.id}`);
    if (p.kind === "commercial" && !p.purpose?.trim())
      throw Error(`Нет назначения: ${p.id}`);
    for (const img of p.images) {
      if (
        !img.alt.trim() ||
        !Number.isInteger(img.width) ||
        !Number.isInteger(img.height) ||
        img.width <= 0 ||
        img.height <= 0
      )
        throw Error(`Неверное изображение: ${p.id}`);
      imagePath(img.src);
      for (const variant of imageVariants(img)) imagePath(variant.src);
    }
  }
}
export function validateSite(
  data: typeof site,
  release = false,
  portrait: PropertyImage | null = null,
) {
  for (const field of [
    "name",
    "shortName",
    "initials",
    "profession",
    "locality",
    "title",
    "description",
    "hours",
    "geography",
  ] as const)
    if (!data[field].trim()) throw Error(`Пустое обязательное поле: ${field}`);
  for (const m of data.messengers) {
    const u = new URL(m.url);
    const hosts: Record<string, string[]> = {
      MAX: ["max.ru"],
      WhatsApp: ["wa.me"],
      Telegram: ["t.me"],
      VK: ["vk.ru", "vk.com"],
    };
    if (
      u.protocol !== "https:" ||
      u.username ||
      u.password ||
      !hosts[m.name]?.includes(u.hostname)
    )
      throw Error("Некорректный URL мессенджера");
  }
  if (!data.phone || !data.phoneDisplay)
    throw Error("Нужен обязательный телефон");
  if (data.phone && !/^\+[1-9]\d{7,14}$/.test(data.phone))
    throw Error("Некорректный телефон");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    throw Error("Некорректный email");
  if (release) {
    if (
      !data.phone ||
      !data.phoneDisplay ||
      !portrait ||
      !data.approved ||
      !data.directContactsApproved
    )
      throw Error(
        "Публикация заблокирована: нужны реальные контакты, портрет и согласование",
      );
    if (
      data.phone === "+79990000000" ||
      data.email.endsWith(".invalid") ||
      data.messengers.some((m) => /example[-_]demo|example-demo/.test(m.url))
    )
      throw Error("Замените тестовые контакты перед публикацией");
    const u = new URL(data.origin);
    if (
      u.protocol !== "https:" ||
      u.origin !== data.origin ||
      u.hostname.endsWith(".invalid")
    )
      throw Error("Нужен production origin");
  }
}
const server = await createServer({
  base: "/",
  server: { middlewareMode: true, ws: false, hmr: false },
});
try {
  const { properties } = (await server.ssrLoadModule(
    "/src/data/properties.ts",
  )) as { properties: Property[] };
  validateProperties(properties);
  const { portrait } = (await server.ssrLoadModule(
    "/src/data/portrait.ts",
  )) as { portrait: PropertyImage | null };
  const release = process.argv.includes("--release") || site.approved;
  validateSite(site, release, portrait);
  const { illustrations } = (await server.ssrLoadModule(
    "/src/data/visuals.ts",
  )) as { illustrations: Record<string, PropertyImage> };
  for (const image of [
    ...properties.flatMap((p) => p.images),
    ...(portrait ? [portrait] : []),
    ...Object.values(illustrations),
  ])
    await validateImageMetadata(image);
  if (release && properties.some((p) => p.published && p.demo))
    throw Error("Демонстрационные объекты запрещены в выпуске");
  console.log(
    "Контент проверен. Режим:",
    site.approved ? "согласован" : "демонстрационный",
  );
} finally {
  await server.close();
}
