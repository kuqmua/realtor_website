import { createHash } from "node:crypto";
import { structuredData } from "./src/data/metadata.ts";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { site } from "./src/data/site.ts";
export default defineConfig({
  plugins: [
    react(),
    {
      name: "site-metadata",
      transformIndexHtml(html) {
        const escape = (s: string) =>
          s
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");
        const origin = site.origin;
        return html
          .replace(
            "<!--META-->",
            `<title>${escape(site.title)}</title><meta name="description" content="${escape(site.description)}"><meta name="robots" content="${site.approved ? "index, follow" : "noindex, nofollow"}"><meta property="og:title" content="${escape(site.title)}"><meta property="og:description" content="${escape(site.description)}"><meta property="og:type" content="website"><meta property="og:locale" content="ru_RU"><script type="application/ld+json">${structuredData}</script>${origin ? `<link rel="canonical" href="${escape(origin)}/"><meta property="og:url" content="${escape(origin)}/"><meta property="og:image" content="${escape(origin)}/og-image.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${escape(site.name)} — частный риелтор">` : ""}`,
          )
          .replace(
            /<!--CONTACT-->\s*/,
            site.phone
              ? `<a href="tel:${escape(site.phone)}">${escape(site.phoneDisplay)}</a>`
              : "Контактный номер ещё не предоставлен.",
          );
      },
      generateBundle() {
        const hash = createHash("sha256")
          .update(structuredData)
          .digest("base64");
        this.emitFile({
          type: "asset",
          fileName: "security.caddy",
          source: `header Content-Security-Policy "default-src 'self'; script-src 'self' 'sha256-${hash}'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'"\n`,
        });
        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: site.approved
            ? `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`
            : "User-agent: *\nDisallow: /\n",
        });
        if (site.approved)
          this.emitFile({
            type: "asset",
            fileName: "sitemap.xml",
            source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.origin}/</loc></url></urlset>`,
          });
      },
    },
  ],
  build: { assetsInlineLimit: 0 },
});
