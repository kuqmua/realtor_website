import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateProperties,
  validateSite,
} from "../scripts/validate-content.ts";
import { site } from "../src/data/site.ts";
import type { Property } from "../src/types/content.ts";
const valid: Property = {
  id: "test-flat",
  published: true,
  title: "Квартира",
  kind: "apartment",
  locality: "Чебоксары",
  priceRub: 1,
  areaM2: 1,
  rooms: 1,
  floor: 1,
  floorsTotal: 1,
  description: "Описание",
  images: [
    {
      src: "/src/assets/property-demo.svg",
      alt: "Иллюстрация",
      width: 800,
      height: 600,
    },
  ],
};
test("rejects duplicate IDs, missing files and empty photos", () => {
  assert.throws(() => validateProperties([valid, valid]), /повторный ID/);
  assert.throws(
    () => validateProperties([{ ...valid, images: [] }]),
    /Нет фото/,
  );
  assert.throws(
    () =>
      validateProperties([
        { ...valid, images: [{ ...valid.images[0], src: "/missing.jpg" }] },
      ]),
    /Нет локального изображения/,
  );
});
test("rejects invalid price, area and type-specific characteristics", () => {
  for (const change of [
    { priceRub: -1 },
    { areaM2: 0 },
    { rooms: undefined },
    { floor: 3 },
  ])
    assert.throws(() => validateProperties([{ ...valid, ...change }]));
  assert.throws(
    () => validateProperties([{ ...valid, kind: "commercial" }]),
    /назначения/,
  );
  assert.throws(
    () => validateProperties([{ ...valid, kind: "land" }]),
    /площади участка/,
  );
});
test("accepts complete records and unpublished records without images", () => {
  assert.doesNotThrow(() => validateProperties([valid]));
  assert.doesNotThrow(() =>
    validateProperties([{ ...valid, published: false, images: [] }]),
  );
});
test("requires phone and restricts messenger schemes and domains", () => {
  assert.throws(
    () => validateSite({ ...site, phone: "" }),
    /обязательный телефон/,
  );
  for (const url of [
    "javascript:alert(1)",
    "http://t.me/test",
    "https://evil.example/test",
    "https://t.me@evil.example/test",
  ])
    assert.throws(() =>
      validateSite({ ...site, messengers: [{ name: "Telegram", url }] }),
    );
  assert.doesNotThrow(() => validateSite(site));
});
test("demo cannot pass public release gate", () =>
  assert.throws(() => validateSite(site, true), /Публикация заблокирована/));

test("approved flag cannot publish known test contacts", () =>
  assert.throws(
    () =>
      validateSite(
        {
          ...site,
          approved: true,
          directContactsApproved: true,
          origin: "https://real-domain.ru",
        },
        true,
        valid.images[0],
      ),
    /тестовые контакты/,
  ));

test("checks all responsive source files and real dimensions", async () => {
  const { validateImageMetadata } =
    await import("../scripts/validate-content.ts");
  await assert.rejects(
    validateImageMetadata({ ...valid.images[0], width: 801 }),
    /Размеры изображения/,
  );
  assert.throws(
    () =>
      validateProperties([
        {
          ...valid,
          images: [
            {
              ...valid.images[0],
              sources: [{ type: "image/webp", srcSet: "/missing.webp 480w" }],
            },
          ],
        },
      ]),
    /Нет локального изображения/,
  );
  assert.throws(
    () =>
      validateProperties([
        {
          ...valid,
          images: [
            { ...valid.images[0], srcSet: "/src/assets/property-demo.svg 0w" },
          ],
        },
      ]),
    /srcSet/,
  );
});

test("empty and withdrawn listings do not leave an empty grid or a stale offer", async () => {
  const { createServer } = await import("vite");
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const server = await createServer({
    server: { middlewareMode: true, ws: false, hmr: false },
  });
  try {
    const { Properties } = await server.ssrLoadModule(
      "/src/components/Properties.tsx",
    );
    for (const items of [[], [{ ...valid, published: false }]]) {
      const html = renderToStaticMarkup(createElement(Properties, { items }));
      assert.match(html, /Сейчас опубликованных объектов нет/);
      assert.doesNotMatch(
        html,
        /class="property-grid"|<article|object-test-flat/,
      );
    }
    const html = renderToStaticMarkup(
      createElement(Properties, {
        items: [valid, { ...valid, id: "withdrawn", published: false }],
      }),
    );
    assert.match(html, /object-test-flat/);
    assert.doesNotMatch(html, /object-withdrawn/);
    assert.equal((html.match(/<article /g) || []).length, 1);
  } finally {
    await server.close();
  }
});
