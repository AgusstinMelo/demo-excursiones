import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { hero, legalPages, site, trips, type LegalSlug } from "./src/content.ts";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const ogImage = `${hero.image.src}?auto=format&fit=crop&w=1200&h=630&q=70`;
// Mismas URLs que genera <Img> en el hero (calidad 50): así el preload no descarga una imagen distinta
const heroSrcSet = [480, 750, 1080, 1440, 2000]
  .map((w) => `${hero.image.src}?auto=format&fit=crop&w=${w}&h=${Math.round((w * hero.image.height) / hero.image.width)}&q=50 ${w}w`)
  .join(", ");

/**
 * SEO a partir de src/content.ts:
 * - inyecta título, descripción, Open Graph y JSON-LD (LocalBusiness + un TouristTrip por excursión) en index.html
 * - genera robots.txt y sitemap.xml
 * - genera /aviso-legal, /privacidad y /cookies como HTML estático con su propio título y descripción
 */
function seoFromContent(): Plugin {
  const business = {
    "@type": "LocalBusiness",
    "@id": `${site.url}/#negocio`,
    name: site.name,
    description: site.description,
    url: site.url,
    image: ogImage,
    telephone: site.phone,
    email: site.email,
    priceRange: `${Math.min(...trips.items.map((t) => t.priceFrom))}–${Math.max(...trips.items.map((t) => t.priceFrom))} €`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: site.areaServed,
    sameAs: site.socials.map((s) => s.href),
  };
  const tripsLd = trips.items.map((t) => ({
    "@type": "TouristTrip",
    "@id": `${site.url}/#${t.slug}`,
    name: t.title,
    description: t.description,
    touristType: t.category,
    image: `${t.image.src}?auto=format&fit=crop&w=1200&h=800&q=70`,
    itinerary: { "@type": "ItemList", itemListElement: t.itinerary.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.text })) },
    offers: { "@type": "Offer", price: t.priceFrom, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `${site.url}/#contacto` },
    provider: { "@id": `${site.url}/#negocio` },
  }));
  const jsonLd = { "@context": "https://schema.org", "@graph": [business, ...tripsLd] };

  let outDir = "dist";
  const pages = Object.keys(legalPages) as LegalSlug[];

  return {
    name: "seo-from-content",
    configResolved(c) {
      outDir = resolve(c.root, c.build.outDir);
    },
    transformIndexHtml(html) {
      return html
        .replaceAll("%TITLE%", esc(site.title))
        .replaceAll("%DESCRIPTION%", esc(site.description))
        .replaceAll("%URL%", site.url)
        .replaceAll("%SITE_NAME%", esc(site.name))
        .replaceAll("%OG_IMAGE%", ogImage)
        .replaceAll("%HERO_SRCSET%", esc(heroSrcSet))
        .replace("%JSON_LD%", JSON.stringify(jsonLd).replace(/</g, "\\u003c"));
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "robots.txt", source: `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n` });
      const urls = ["", ...pages.map((p) => `/${p}`)]
        .map((p) => `  <url><loc>${site.url}${p}</loc><changefreq>${p ? "yearly" : "monthly"}</changefreq><priority>${p ? "0.3" : "1.0"}</priority></url>`)
        .join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
    closeBundle() {
      // Cada página legal recibe su copia de index.html con título, descripción y canonical propios
      let base: string;
      try {
        base = readFileSync(resolve(outDir, "index.html"), "utf8");
      } catch {
        return; // en desarrollo no hay dist
      }
      for (const slug of pages) {
        const p = legalPages[slug];
        const html = base
          .replaceAll(esc(site.title), esc(p.seoTitle))
          .replaceAll(esc(site.description), esc(p.description))
          .replaceAll(`href="${site.url}/"`, `href="${site.url}/${slug}"`)
          .replaceAll(`content="${site.url}/"`, `content="${site.url}/${slug}"`)
          .replace(/<link rel="preload" as="image"[^>]*>\s*/, "");
        mkdirSync(resolve(outDir, slug), { recursive: true });
        writeFileSync(resolve(outDir, slug, "index.html"), html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFromContent()],
});
