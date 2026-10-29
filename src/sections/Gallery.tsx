// Galería: bento grid en tableta y escritorio, carrusel con scroll snap en móvil, y lightbox accesible.
// En WordPress: bloque Galería en mosaico + lightbox nativo (WP 6.4+) o el de la plantilla.
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { Dialog } from "../components/Dialog";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { gallery } from "../content";

const SPAN = {
  "": "",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  big: "md:col-span-2 md:row-span-2",
};

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="galeria" aria-labelledby="titulo-galeria" className="section-y bg-sky/60">
      <div className="wrap">
        <SectionHeading id="titulo-galeria" eyebrow={gallery.eyebrow} title={gallery.title} intro={gallery.intro} />
      </div>

      <ul
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2 sm:mt-14 md:mx-auto md:grid md:max-w-[calc(var(--container)+2*var(--gutter))] md:auto-rows-[200px] md:grid-flow-dense md:grid-cols-4 md:gap-4 md:overflow-visible lg:auto-rows-[240px]"
        aria-label="Fotos de excursiones"
      >
        {gallery.items.map((g, i) => (
          <Reveal as="li" key={g.src} delay={(i % 4) * 0.05} className={`w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto ${SPAN[g.span]}`}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-haspopup="dialog"
              className="group relative block aspect-[4/5] size-full overflow-hidden rounded-md md:aspect-auto"
            >
              <Img
                photo={g}
                sizes={g.span === "big" || g.span === "wide" ? "(min-width: 768px) 50vw, 80vw" : "(min-width: 768px) 25vw, 80vw"}
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <span className="sr-only">Ampliar foto: {g.alt}</span>
              <span
                aria-hidden
                className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <Expand className="size-4" />
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>{index !== null && <Lightbox index={index} setIndex={setIndex} />}</AnimatePresence>
    </section>
  );
}

function Lightbox({ index, setIndex }: { index: number; setIndex: (i: number | null) => void }) {
  const items = gallery.items;
  const photo = items[index];
  const go = (d: number) => setIndex((index + d + items.length) % items.length);

  // Flechas del teclado para navegar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const navBtn = "grid size-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30";

  return (
    <Dialog
      onClose={() => setIndex(null)}
      label="Galería de fotos"
      overlayClassName="!items-center !bg-black/90 p-3 sm:p-6"
      className="flex size-full max-w-6xl flex-col items-center justify-center gap-4 outline-none"
    >
      <div className="flex w-full items-center justify-between text-white">
        <p aria-live="polite" className="text-[0.95rem] text-white/85 tabular-nums">
          {index + 1} / {items.length}
        </p>
        <button type="button" onClick={() => setIndex(null)} data-autofocus aria-label="Cerrar galería" className={navBtn}>
          <X aria-hidden />
        </button>
      </div>

      <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <m.figure
            key={photo.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex max-h-full flex-col items-center"
          >
            <Img photo={photo} loading="eager" sizes="(min-width: 1152px) 1152px, 100vw" className="max-h-[72dvh] w-auto max-w-full rounded-sm object-contain" />
            <figcaption className="mt-3 max-w-xl text-center text-[0.95rem] text-white/85">{photo.alt}</figcaption>
          </m.figure>
        </AnimatePresence>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className={navBtn}>
          <ChevronLeft aria-hidden />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Foto siguiente" className={navBtn}>
          <ChevronRight aria-hidden />
        </button>
      </div>
    </Dialog>
  );
}
