// Información práctica: acordeón accesible (botones con aria-expanded) sobre fondo azul mar.
// Solo anima opacidad y desplazamiento al abrir (sin animar la altura).
// En WordPress: bloque Detalles / Acordeón de la plantilla (o FAQ de Rank Math/Yoast para schema FAQ).
import { Accessibility, Backpack, CloudRain, Gauge, Languages, MapPin, Plus, Users } from "lucide-react";
import { m } from "motion/react";
import { useId, useState } from "react";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { practical, trips } from "../content";

const ICONS = { pin: MapPin, backpack: Backpack, gauge: Gauge, cloud: CloudRain, languages: Languages, users: Users, accessibility: Accessibility };

export function Practical() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="info" aria-labelledby="titulo-info" className="on-dark section-y relative isolate overflow-hidden bg-sea text-white">
      <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading id="titulo-info" light eyebrow={practical.eyebrow} title={practical.title} intro={practical.intro} />
          <Reveal delay={0.1} className="mt-10 hidden lg:block">
            <Img photo={trips.items[1].gallery[0]} sizes="40vw" className="aspect-[4/3] w-full rounded-lg object-cover" />
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <ul className="divide-y divide-white/20 border-y border-white/20">
            {practical.items.map((it, i) => {
              const Icon = ICONS[it.icon];
              const isOpen = open === i;
              return (
                <li key={it.title}>
                  <h3>
                    <button
                      type="button"
                      id={`${uid}-b${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${uid}-p${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center gap-4 py-5 text-left"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/12 text-accent">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <span className="flex-1 font-display text-xl font-medium sm:text-2xl">{it.title}</span>
                      <Plus aria-hidden className={`size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                    </button>
                  </h3>
                  {isOpen && (
                    <m.div
                      id={`${uid}-p${i}`}
                      role="region"
                      aria-labelledby={`${uid}-b${i}`}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="pr-4 pb-6 pl-15 text-white/90">{it.text}</p>
                    </m.div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
