// Presentación: hero a pantalla completa con foto, titular animado, CTA a excursiones y a WhatsApp,
// y botón de vídeo (YouTube bloqueado hasta aceptar cookies). Debajo, cinta con destinos.
// En WordPress: sección a pantalla completa con imagen de fondo + capa oscura, H1 y dos botones.
import { ArrowDown, Play } from "lucide-react";
import { AnimatePresence, m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "../components/Icons";
import { Img } from "../components/Img";
import { EASE } from "../components/Reveal";
import { VideoModal } from "../components/VideoModal";
import { destinations, hero } from "../content";
import { linkHandler } from "../lib/router";
import { waLink } from "../lib/wa";

/** Titular que entra palabra a palabra. Las palabras entre *asteriscos* van en cursiva. */
function AnimatedTitle({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  let i = 0;
  return (
    <>
      {parts.map((part, p) => {
        const italic = part.startsWith("*");
        return part
          .replace(/\*/g, "")
          .split(" ")
          .filter(Boolean)
          .map((word) => {
            const n = i++;
            // El espacio va fuera del inline-block: dentro se colapsaría y las palabras quedarían pegadas
            return (
              <Fragment key={`${p}-${n}`}>
                <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <m.span
                    className={`inline-block ${italic ? "font-normal text-accent italic" : ""}`}
                    initial={reduced ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15 + n * 0.08, ease: EASE }}
                  >
                    {word}
                  </m.span>
                </span>{" "}
              </Fragment>
            );
          });
      })}
    </>
  );
}

/** Solo reproduce vídeo de fondo si la conexión lo permite (ahorro de datos y 2G/3G lo desactivan) */
function useCanPlayVideo() {
  const reduced = useReducedMotion();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    setOk(!reduced && !c?.saveData && !/(^|-)(2g|3g)$/.test(c?.effectiveType ?? ""));
  }, [reduced]);
  return ok;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [video, setVideo] = useState(false);
  const canPlay = useCanPlayVideo();
  // Parallax suave de la foto (solo transform)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "18%"]);
  const fade = (delay: number) =>
    reduced ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } };

  return (
    <>
      <section ref={ref} id="inicio" aria-labelledby="titulo-inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
        <m.div style={{ y }} className="absolute inset-0 -z-10">
          <Img photo={hero.image} priority quality={50} sizes="100vw" className="size-full scale-110 object-cover" />
          {hero.backgroundVideo && canPlay && (
            <video
              className="absolute inset-0 size-full scale-110 object-cover"
              src={hero.backgroundVideo}
              poster={`${hero.image.src}?auto=format&fit=crop&w=1600&q=60`}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
            />
          )}
        </m.div>
        {/* Capa oscura: garantiza contraste AA del texto sobre la foto */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/30 to-black/25" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/45 to-transparent" />

        <div className="wrap flex flex-1 flex-col justify-end pt-36 pb-12 sm:pb-16 lg:pb-20">
          <m.p {...fade(0)} className="eyebrow inline-flex items-center gap-2.5 text-white/90">
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            {hero.eyebrow}
          </m.p>
          <h1 id="titulo-inicio" className="display mt-5 max-w-4xl text-[3.1rem] sm:text-7xl lg:text-[6.2rem]">
            <AnimatedTitle text={hero.title} />
          </h1>
          {/* Sin animación: es el candidato a LCP y debe pintarse en cuanto carga la página */}
          <p className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl">{hero.subtitle}</p>

          <m.div {...fade(0.65)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="/#excursiones" onClick={linkHandler("/#excursiones")} className="btn btn-accent">
              {hero.primaryCta}
              <ArrowDown aria-hidden className="size-4" />
            </a>
            <a href={waLink(hero.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-glass">
              <WhatsAppIcon className="size-5" />
              {hero.whatsappCta}
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
            {hero.video && (
              <button type="button" onClick={() => setVideo(true)} className="btn group !px-3 text-white sm:ml-1">
                <span className="grid size-10 place-items-center rounded-full bg-white text-ink transition-transform group-hover:scale-110">
                  <Play aria-hidden className="size-4 translate-x-px fill-current" />
                </span>
                {hero.video.label}
              </button>
            )}
          </m.div>

          <m.dl {...fade(0.8)} className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/25 pt-6 sm:gap-8">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl leading-none font-medium sm:text-4xl">{s.value}</dd>
                <dd aria-hidden className="mt-2 text-[0.8rem] leading-snug text-white/80 sm:text-sm">
                  {s.label}
                </dd>
              </div>
            ))}
          </m.dl>
        </div>
      </section>

      <DestinationsMarquee />

      <AnimatePresence>{video && hero.video && <VideoModal video={hero.video} onClose={() => setVideo(false)} />}</AnimatePresence>
    </>
  );
}

/** Cinta infinita con destinos (CSS, se detiene con movimiento reducido) */
function DestinationsMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {destinations.map((d) => (
        <li key={d} className="flex items-center">
          <span className="px-6 font-display text-2xl whitespace-nowrap italic sm:px-8 sm:text-3xl">{d}</span>
          <span aria-hidden className="text-xl text-coral">✺</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-b border-line bg-accent py-4 text-accent-ink">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
