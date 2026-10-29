// Sobre la profesional: retrato en exterior, historia, titulaciones y 3 diferenciales.
// En WordPress: sección de dos columnas (imágenes | texto) + fila de 3 columnas con icono.
import { Check, HeartHandshake, Map, Users } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { about } from "../content";

const ICONS = { users: Users, map: Map, heart: HeartHandshake };

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);

  return (
    <section id="sobre-mi" aria-labelledby="titulo-sobre-mi" className="section-y bg-sand">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className="relative mx-auto w-full max-w-md pb-16 sm:pb-20 lg:max-w-none lg:pr-16">
          <Reveal>
            <Img photo={about.image} sizes="(min-width: 1024px) 45vw, 92vw" className="aspect-[4/5] w-full rounded-lg object-cover" />
          </Reveal>
          {/* Segunda foto superpuesta con parallax suave */}
          <m.div style={{ y }} className="absolute right-0 bottom-0 w-[55%] lg:w-[50%]">
            <Img
              photo={about.secondaryImage}
              sizes="(min-width: 1024px) 22vw, 50vw"
              className="aspect-[4/3] w-full rounded-md border-[6px] border-sand object-cover shadow-xl"
            />
          </m.div>
          <span aria-hidden className="absolute top-6 -left-3 rotate-[-6deg] rounded-full bg-accent px-4 py-2 font-display text-lg text-accent-ink italic shadow-lg sm:-left-6">
            ¡Hola!
          </span>
        </div>

        <div>
          <SectionHeading id="titulo-sobre-mi" eyebrow={about.eyebrow} title={about.title} />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-lg text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Titulaciones y experiencia">
              {about.credentials.map((c) => (
                <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.9rem] font-medium">
                  <Check aria-hidden className="size-4 text-green" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <ul className="wrap mt-16 grid gap-5 sm:mt-20 md:grid-cols-3">
        {about.differentials.map((d, i) => {
          const Icon = ICONS[d.icon];
          return (
            <Reveal as="li" key={d.title} delay={i * 0.08} className="rounded-md bg-surface p-7">
              <span className="grid size-12 place-items-center rounded-full bg-green-soft text-green">
                <Icon aria-hidden className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="display mt-5 text-[1.6rem]">{d.title}</h3>
              <p className="mt-2 text-muted">{d.text}</p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
