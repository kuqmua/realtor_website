import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { site } from "../src/data/site";
test("all information stays on one page during section navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const documents: string[] = [];
  page.on("request", (request) => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame())
      documents.push(request.url());
  });
  await page.goto("/");
  const pageAddress = new URL(page.url());
  for (const section of [
    ".hero",
    "#about",
    "#clients",
    "#services",
    "#coverage",
    "#terms",
    "#contacts",
  ]) {
    await expect(page.locator(section)).toBeVisible();
  }
  await expect(page.locator("#services")).toContainText(
    "материнского капитала",
  );
  await expect(page.locator("#terms")).toContainText("частичная предоплата");
  for (const [name, target] of [
    ["Обо мне", "about"],
    ["Услуги", "services"],
    ["Условия", "terms"],
    ["Контакты", "contacts"],
  ]) {
    const link = page
      .getByRole("navigation")
      .getByRole("link", { name, exact: true });
    await expect(link).toHaveAttribute("href", `#${target}`);
    await link.click();
    await expect(page.locator(`#${target}`)).toBeInViewport();
    expect(new URL(page.url()).pathname).toBe(pageAddress.pathname);
    expect(new URL(page.url()).hash).toBe(`#${target}`);
  }
  await page.getByRole("link", { name: "В начало ↑" }).click();
  await expect(page.locator("header")).toBeInViewport();
  expect(documents).toHaveLength(1);
});
test("content, anchors and contacts", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.locator(
      "#properties, .property-card, .property-grid, .preview-banner",
    ),
  ).toHaveCount(0);
  await expect(page.getByRole("navigation").getByRole("link")).toHaveCount(4);
  await expect(page.locator("body")).not.toContainText(
    /демонстрац|демо.?данн|тестов|здесь будет|ожидаем фотографию/i,
  );
  await expect(page.locator("#about")).toContainText("Более 20 лет");
  await expect(page.locator("#about")).toContainText("Работаю самостоятельно");
  await expect(page.locator(".service-overview h3")).toHaveText([
    "Покупка и продажа",
    "Одобрение ипотеки",
    "Сопровождение сделки",
  ]);
  await expect(page.locator("#service-purchase")).toContainText(
    "Коммерческая недвижимость",
  );
  await expect(page.locator("#service-mortgage")).toContainText(
    "Окончательное решение об одобрении ипотеки принимает банк",
  );
  await expect(page.locator("#service-support")).toContainText(
    "Дистанционные и электронные сделки",
  );
  await expect(page.locator("#terms")).toContainText("частичная предоплата");
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
  for (const link of await page.locator(".messenger-link").all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link.locator("svg")).toHaveCount(1);
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
    .getByRole("link", { name: "Контакты" })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
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
    const title = document.querySelector(".contact-panel h3");
    if (title)
      title.textContent =
        "Елена Сергеевна Левошина — ваш личный специалист по недвижимости";
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

test("thematic images load with responsive sources and a decorative background", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.locator(".hero img");
  await expect(hero).toHaveAttribute("loading", "eager");
  await expect
    .poll(() =>
      hero.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(page.locator(".service-scene img")).toHaveCount(3);
  // Each placement has its own photo; responsive variants may share a scene only within a picture.
  const editorialSources = await page
    .locator(
      ".hero img, .service-scene img, .coverage-scene img, .section-background img",
    )
    .evaluateAll((images) =>
      images.map((image) => (image as HTMLImageElement).src),
    );
  expect(editorialSources).toHaveLength(9);
  expect(new Set(editorialSources).size).toBe(editorialSources.length);
  await expect(page.locator(".section-background")).toHaveCount(4);
  for (const background of await page.locator(".section-background").all()) {
    await expect(background).toHaveAttribute("aria-hidden", "true");
    await expect(background.locator("img")).toHaveAttribute("alt", "");
  }
  for (const image of await page
    .locator(".service-scene img, .coverage-scene img, .section-background img")
    .all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(image).toHaveAttribute("srcset", /480w.*800w.*1200w/);
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await expect(page.locator(".coverage-scene")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});

test("purchase and sale services are visible together without tabs", async ({
  page,
}) => {
  await page.goto("/");
  const block = page.locator(".purchase-options");
  await expect(
    block.getByRole("heading", { name: "Покупателям", exact: true }),
  ).toBeVisible();
  await expect(
    block.getByRole("heading", { name: "Продавцам", exact: true }),
  ).toBeVisible();
  await expect(
    block.getByText("Подбор недвижимости под ваш запрос", { exact: true }),
  ).toBeVisible();
  await expect(
    block.getByText("Поиск покупателя для вашего объекта", { exact: true }),
  ).toBeVisible();
  await expect(block.getByRole("tab")).toHaveCount(0);
});
