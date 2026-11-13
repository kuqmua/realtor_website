import sharp from "sharp";
import { mkdir, writeFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import process from "node:process";

/** Prepare a local, metadata-free picture and a Vite-importable content module. */
export async function optimizeImage({ input, output, alt }) {
  if (!input || !output || !alt?.trim())
    throw Error("Нужны --input, --output и непустой --alt");
  const source = resolve(input);
  const destination = resolve(output);
  // Existing output must be removed/moved deliberately by the editor, never silently overwritten.
  try {
    await access(destination);
    throw Error(`Каталог уже существует: ${destination}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const metadata = await sharp(source, {
    limitInputPixels: 40_000_000,
  }).metadata();
  if (
    !["jpeg", "png", "webp", "avif", "heif"].includes(metadata.format) ||
    (metadata.pages || 1) > 1
  )
    throw Error(
      "Нужна статическая растровая фотография JPEG, PNG, WebP или AVIF",
    );
  const rotated = metadata.orientation >= 5 && metadata.orientation <= 8;
  const sourceWidth = rotated ? metadata.height : metadata.width;
  const widths = [
    ...new Set(
      [480, 800, 1200]
        .filter((w) => w < sourceWidth)
        .concat(Math.min(sourceWidth, 1200)),
    ),
  ].sort((a, b) => a - b);
  await mkdir(destination, { recursive: true });
  const imports = [];
  const variants = { jpeg: [], webp: [], avif: [] };
  let largest;
  for (const format of ["jpeg", "webp", "avif"]) {
    for (const width of widths) {
      const filename = `${width}.${format === "jpeg" ? "jpg" : format}`;
      const name = `${format}${width}`;
      // Sharp strips EXIF/XMP/IPTC by default; do not call withMetadata/keepMetadata.
      const info = await sharp(source, { limitInputPixels: 40_000_000 })
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .toFormat(format, {
          quality: format === "avif" ? 48 : format === "webp" ? 78 : 82,
        })
        .toFile(resolve(destination, filename));
      imports.push(`import ${name} from ${JSON.stringify("./" + filename)};`);
      variants[format].push(`${name} + ' ${info.width}w'`);
      if (format === "jpeg")
        largest = { name, width: info.width, height: info.height };
    }
  }
  const set = (format) => `[${variants[format].join(", ")}].join(', ')`;
  const module = `// Generated from a local photograph. Original metadata is not copied.\n${imports.join("\n")}\nexport default {\n  src: ${largest.name}, alt: ${JSON.stringify(alt.trim())}, width: ${largest.width}, height: ${largest.height},\n  srcSet: ${set("jpeg")},\n  sources: [{type:'image/avif', srcSet:${set("avif")}}, {type:'image/webp',srcSet:${set("webp")}}],\n};\n`;
  await writeFile(resolve(destination, "image.ts"), module);
  return { width: largest.width, height: largest.height, widths };
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const args = process.argv.slice(2);
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, "");
    if (!["input", "output", "alt"].includes(key) || !args[i + 1])
      throw Error(
        'Использование: npm run images -- --input PHOTO --output NEW_DIRECTORY --alt "Описание"',
      );
    options[key] = args[i + 1];
  }
  const result = await optimizeImage(options);
  process.stdout.write(
    `Готово: ${JSON.stringify(result)}. Импортируйте image.ts из нового каталога.\n`,
  );
}
