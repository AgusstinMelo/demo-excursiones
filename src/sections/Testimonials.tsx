// Opiniones: testimonios de ejemplo, marcados como tales.
// En WordPress: bloque de testimonios de la plantilla o reseñas de Google mediante un plugin (con consentimiento).
import { Quote, Star } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { testimonials } from "../content";

export function Testimonials() {
  return (
    <section id="opiniones" aria-labelledby="titulo-opiniones" className="section-y">
      <div className="wrap">
        <SectionHeading id="titulo-opiniones" center eyebrow={testimonials.eyebrow} title={testimonials.title} />
        <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.items.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.08} className={`h-full ${i % 2 ? "xl:mt-8" : ""}`}>
              <figure className="flex h-full flex-col rounded-md border border-line bg-surface p-7">
                <div className="flex items-center justify-between">
                  <span className="flex gap-0.5 text-accent" role="img" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }, (_, n) => (
                      <Star key={n} aria-hidden className="size-4 fill-current" />
                    ))}
                  </span>
                  <Quote aria-hidden className="size-7 text-green-soft" />
                </div>
                <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed">“{t.text}”</blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <span className="block font-bold">{t.name}</span>
                  <span className="block text-[0.9rem] text-muted">
                    {t.origin} · {t.trip}
                  </span>
                  <span className="mt-3 inline-block rounded-full bg-sand px-2.5 py-0.5 text-[0.75rem] font-bold text-muted">{testimonials.sampleLabel}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
