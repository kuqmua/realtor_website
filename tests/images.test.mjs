import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { optimizeImage } from "../scripts/optimize-images.mjs";
test("photos are oriented, responsive, not enlarged and contain no metadata", async () => {
  const temp = await mkdtemp(join(tmpdir(), "realtor-images-"));
  try {
    const input = join(temp, "original.jpg");
    await sharp({
      create: { width: 1600, height: 1000, channels: 3, background: "#23483e" },
    })
      .jpeg()
      .withMetadata({
        orientation: 6,
        exif: { IFD0: { Artist: "private-source-fixture" } },
      })
      .toFile(input);
    const output = join(temp, "prepared");
    const result = await optimizeImage({
      input,
      output,
      alt: "Тестовая фотография",
    });
    assert.deepEqual(result.widths, [480, 800, 1000]);
    assert.equal(result.width, 1000);
    assert.equal(result.height, 1600);
    for (const file of await readdir(output)) {
      if (file.endsWith(".ts")) continue;
      const m = await sharp(join(output, file)).metadata();
      assert.ok(!m.exif && !m.xmp && !m.iptc && !m.orientation);
      assert.ok(m.width <= 1000);
    }
    const module = await readFile(join(output, "image.ts"), "utf8");
    assert.match(module, /image\/avif/);
    assert.match(module, /image\/webp/);
    assert.match(module, /1000w/);
    await assert.rejects(
      optimizeImage({ input, output, alt: "Другое описание" }),
      /уже существует/,
    );
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
});
