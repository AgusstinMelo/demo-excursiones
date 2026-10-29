// Excursiones: tarjetas con foto, duración, dificultad, punto de encuentro y precio «desde».
// «Ver detalles» abre un modal con itinerario, qué incluye, qué llevar, galería y dos CTA.
// En WordPress: tipo de entrada «Excursión» o bloques de tarjeta + ventana emergente (popup del maquetador).
import { ArrowRight, ArrowUpRight, CalendarCheck, Clock, MapPin, Route, Users, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Dialog } from "../components/Dialog";
import { WhatsAppIcon } from "../components/Icons";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { difficultyLabels, trips, type Difficulty, type Trip } from "../content";
import { navigate } from "../lib/router";
import { selectService } from "../lib/selection";
import { waLink } from "../lib/wa";

const L = trips.labels;

/** Indicador visual de dificultad: 3 barras + texto */
export function DifficultyMeter({ level, light = false }: { level: Difficulty; light?: boolean }) {
  const color = level === 1 ? "bg-green" : level === 2 ? "bg-accent" : "bg-coral";
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="flex items-end gap-[3px]">
        {[1, 2, 3].map((n) => (
          <span key={n} className={`w-[5px] rounded-full ${n <= level ? color : light ? "bg-white/30" : "bg-line"}`} style={{ height: 6 + n * 4 }} />
        ))}
      </span>
      <span>{difficultyLabels[level]}</span>
    </span>
  );
}

export function Trips() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = trips.items.find((t) => t.slug === openSlug);

  return (
    <section id="excursiones" aria-labelledby="titulo-excursiones" className="section-y">
      <div className="wrap">
        <SectionHeading id="titulo-excursiones" eyebrow={trips.eyebrow} title={trips.title} intro={trips.intro} />

        <ul className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
          {trips.items.map((t, i) => (
            <Reveal as="li" key={t.slug} delay={(i % 3) * 0.08} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-surface shadow-[0_1px_0_var(--c-line),0_20px_40px_-30px_rgba(28,42,35,0.4)] transition-shadow duration-300 hover:shadow-[0_1px_0_var(--c-line),0_30px_60px_-30px_rgba(28,42,35,0.55)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Img
                    photo={t.image}
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 46vw, 92vw"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.8rem] font-bold text-ink backdrop-blur">{t.category}</span>
                  <span className="absolute right-4 bottom-4 rounded-full bg-ink/85 px-3.5 py-1.5 text-white backdrop-blur">
                    <span className="text-[0.75rem] text-white/80">{trips.fromLabel} </span>
                    <span className="font-display text-lg font-semibold">{t.priceFrom} €</span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="display text-[1.7rem]">{t.title}</h3>
                  <p className="mt-2 text-muted">{t.summary}</p>

                  <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5 text-[0.92rem]">
                    <div>
                      <dt className="sr-only">{L.duration}</dt>
                      <dd className="flex items-start gap-2">
                        <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-green" />
                        {t.duration}
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">{L.difficulty}</dt>
                      <dd>
                        <DifficultyMeter level={t.difficulty} />
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="sr-only">{L.meetingPoint}</dt>
                      <dd className="flex items-start gap-2">
                        <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-green" />
                        {t.meetingPoint}
                      </dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => setOpenSlug(t.slug)}
                    aria-haspopup="dialog"
                    className="btn btn-dark mt-6 w-full justify-between !px-5 after:absolute after:inset-0 after:content-['']"
                  >
                    {trips.consultLabel}
                    <span className="sr-only">: {t.title}</span>
                    <ArrowUpRight aria-hidden className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimatePresence>{open && <TripModal trip={open} onClose={() => setOpenSlug(null)} />}</AnimatePresence>
    </section>
  );
}

function TripModal({ trip: t, onClose }: { trip: Trip; onClose: () => void }) {
  const M = trips.modal;
  const titleId = `modal-${t.slug}`;

  const book = () => {
    selectService(t.slug);
    onClose();
    // Espera a que el modal se cierre (y devuelva el foco) antes de desplazarse al formulario
    setTimeout(() => navigate("/#contacto"), 400);
  };

  return (
    <Dialog
      onClose={onClose}
      labelledBy={titleId}
      className="relative max-h-[94dvh] w-full max-w-4xl overflow-y-auto rounded-t-lg bg-bg outline-none sm:max-h-[90dvh] sm:rounded-lg"
    >
      <div className="relative aspect-[16/9] max-h-[45vh] w-full overflow-hidden sm:aspect-[21/9]">
        <Img photo={t.image} sizes="(min-width: 896px) 896px, 100vw" className="size-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <button
          type="button"
          onClick={onClose}
          data-autofocus
          aria-label={M.close}
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/95 text-ink shadow transition-transform hover:scale-105"
        >
          <X aria-hidden />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
          <p className="eyebrow text-accent">{t.category}</p>
          <h3 id={titleId} className="display mt-2 text-4xl sm:text-5xl">
            {t.title}
          </h3>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <dl className="grid grid-cols-2 gap-4 rounded-md bg-sand p-5 text-[0.95rem] sm:grid-cols-3 lg:grid-cols-5">
          <Fact icon={<Clock />} label={L.duration} value={t.duration} />
          <Fact icon={<Route />} label={L.distance} value={t.distance} />
          <Fact label={L.difficulty} value={<DifficultyMeter level={t.difficulty} />} />
          <Fact icon={<Users />} label={L.group} value={t.groupSize} />
          <Fact icon={<MapPin />} label={L.meetingPoint} value={t.meetingPoint} className="col-span-2 sm:col-span-1" />
        </dl>

        <p className="mt-7 text-lg text-muted">{t.description}</p>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h4 className="display text-2xl">{M.itinerary}</h4>
            <ol className="mt-4 border-l-2 border-green-soft">
              {t.itinerary.map((s) => (
                <li key={s.text} className="relative pb-4 pl-6 last:pb-0">
                  <span aria-hidden className="absolute top-2 -left-[7px] size-3 rounded-full border-2 border-bg bg-green" />
                  <span className="block text-[0.85rem] font-bold text-green">{s.time}</span>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid content-start gap-7">
            <ListBlock title={M.includes} items={t.includes} marker="✓" />
            <ListBlock title={M.bring} items={t.bring} marker="•" />
          </div>
        </div>

        <h4 className="display mt-9 text-2xl">{M.gallery}</h4>
        <ul className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {t.gallery.map((g) => (
            <li key={g.src} className="aspect-[4/3] overflow-hidden rounded-sm">
              <Img photo={g} sizes="(min-width: 896px) 280px, 33vw" className="size-full object-cover" />
            </li>
          ))}
        </ul>
      </div>

      {/* CTA fijos al pie del modal */}
      <div className="sticky bottom-0 flex flex-col gap-2 border-t border-line bg-bg/95 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="hidden sm:block">
          <span className="text-muted">{trips.fromLabel} </span>
          <span className="font-display text-2xl font-semibold">{t.priceFrom} €</span>
          <span className="text-muted"> / persona</span>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a href={waLink(M.whatsappMessage(t.title))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon className="size-5" />
            {M.whatsapp}
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
          <button type="button" onClick={book} className="btn btn-accent">
            <CalendarCheck aria-hidden className="size-5" />
            {M.book}
            <ArrowRight aria-hidden className="size-4" />
          </button>
        </div>
      </div>
    </Dialog>
  );
}

function Fact({ icon, label, value, className = "" }: { icon?: React.ReactNode; label: string; value: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <dt className="flex items-center gap-1.5 text-[0.78rem] font-bold tracking-wide text-muted uppercase [&>svg]:size-3.5">
        {icon && <span aria-hidden className="text-green [&>svg]:size-3.5">{icon}</span>}
        {label}
      </dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}

function ListBlock({ title, items, marker }: { title: string; items: string[]; marker: string }) {
  return (
    <div>
      <h4 className="display text-2xl">{title}</h4>
      <ul className="mt-3 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5">
            <span aria-hidden className="font-bold text-green">
              {marker}
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
