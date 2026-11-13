import { test, expect } from "@playwright/test";
import { createServer } from "vite";
import type { Property } from "../src/types/content";
import AxeBuilder from "@axe-core/playwright";
import { site } from "../src/data/site";
let published: Property[] = [];
test.beforeAll(async () => {
  const server = await createServer({
    server: { middlewareMode: true, ws: false, hmr: false },
  });
  try {
    const content = (await server.ssrLoadModule("/src/data/properties.ts")) as {
      properties: Property[];
    };
    published = content.properties.filter((p) => p.published);
  } finally {
    await server.close();
  }
});
test("content, anchors and contacts", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator(".property-card")).toHaveCount(published.length);
  for (const property of published) {
    const card = page.locator(`#object-${property.id}`);
    await expect(card.getByRole("heading")).toHaveText(property.title);
    await expect(card.locator(".price")).toHaveText(
      new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0,
      }).format(property.priceRub),
    );
  }
  if (!published.length)
    await expect(
      page.getByText("Сейчас опубликованных объектов нет.", { exact: false }),
    ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Услуги" })
    .click();
  await expect(page).toHaveURL(/#services$/);
  for (const link of await page.locator('a[href^="tel:"]').all())
    await expect(link).toHaveAttribute("href", `tel:${site.phone}`);
  await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
  await expect(page.locator(".header-phone")).toBeVisible();
  await expect(page.locator(".header-phone")).toContainText("Позвонить");
  if (site.email)
    await expect(page.locator(`a[href="mailto:${site.email}"]`)).toBeVisible();
  else await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  for (const m of site.messengers)
    await expect(
      page.locator("#contacts").getByRole("link", { name: new RegExp(m.name) }),
    ).toHaveAttribute("href", m.url);
  if (published.length) {
    await page.locator("summary").first().click();
    await expect(page.locator("details").first()).toHaveAttribute("open", "");
  }
  expect(errors).toEqual([]);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
test("mobile menu, keyboard and accessibility", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /^(Меню|Закрыть меню)$/ });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Объекты" })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  if (published.length) {
    await page.locator("summary").first().focus();
    await page.keyboard.press("Enter");
  }
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
test("responsive layouts", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 360, 390, 568, 700, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    ).toBeTruthy();
  }
  await page.setViewportSize({ width: 320, height: 600 });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
test("no JavaScript fallback and static metadata", async ({
  browser,
  request,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { name: site.name })).toBeVisible();
  await expect(
    page.getByRole("link", { name: site.phoneDisplay }),
  ).toHaveAttribute("href", `tel:${site.phone}`);
  await expect(page).toHaveTitle(site.title);
  await context.close();
  const response = await request.get("/");
  const html = await response.text();
  expect(html).toContain(site.approved ? "index, follow" : "noindex, nofollow");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(
    site.approved ? "Allow: /" : "Disallow: /",
  );
  if (site.approved) {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain(`<loc>${site.origin}/</loc>`);
  }
  expect(html).toContain(`href="${site.origin}/"`);
});

test("large text, long content, keyboard skip link and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Перейти к содержимому" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
    const title = document.querySelector(".property-card h3 a");
    if (title)
      title.textContent =
        "Очень длинное название квартиры с просторной кухней и дополнительной комнатой для большой семьи";
    const price = document.querySelector(".price");
    if (price) price.textContent = "123 456 789 012 ₽";
  });
  for (const width of [320, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `large text at ${width}`,
    ).toBeTruthy();
  }
});
