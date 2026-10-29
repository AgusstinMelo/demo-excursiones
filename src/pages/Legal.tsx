// Plantilla de página legal (aviso legal, privacidad, cookies).
// En WordPress: página normal con la plantilla «sin barra lateral» del tema y el texto facilitado.
import { ArrowLeft, Info } from "lucide-react";
import { useEffect } from "react";
import { legalPages, legalPlaceholder, site, type LegalSlug } from "../content";
import { openCookieSettings } from "../lib/consent";
import { linkHandler } from "../lib/router";

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = legalPages[slug];

  // Título y descripción de la página desde content.ts
  useEffect(() => {
    document.title = page.seoTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
    return () => {
      document.title = site.title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", site.description);
    };
  }, [page]);

  return (
    <article className="pt-[calc(var(--header-h)+28px)] pb-24 sm:pb-32">
      <header className="border-b border-line bg-sand">
        <div className="wrap py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
          <a href="/" onClick={linkHandler("/")} className="inline-flex items-center gap-2 text-[0.92rem] font-bold text-green hover:underline">
            <ArrowLeft aria-hidden className="size-4" /> Volver al inicio
          </a>
          <p className="eyebrow mt-10 flex items-center gap-2.5 text-green">
            <span aria-hidden className="size-2 rounded-full bg-coral" />
            Información legal
          </p>
          <h1 className="display mt-4 text-[2.6rem] sm:text-6xl">{page.title}</h1>
          <p className="mt-4 text-muted">{page.updated}</p>
          </div>
        </div>
      </header>

      <div className="wrap">
        <div className="mx-auto max-w-3xl">
        <p role="note" className="mt-12 flex gap-3 rounded-md border-2 border-dashed border-coral bg-surface p-5 text-[0.95rem]">
          <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-coral" strokeWidth={2} />
          <span>
            <strong>Texto a sustituir por el facilitado.</strong> {legalPlaceholder}
          </span>
        </p>

        <div className="prose-legal mt-4">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        {slug === "cookies" && (
          <button type="button" onClick={openCookieSettings} className="btn btn-dark mt-12">
            Configurar cookies
          </button>
        )}
        </div>
      </div>
    </article>
  );
}
