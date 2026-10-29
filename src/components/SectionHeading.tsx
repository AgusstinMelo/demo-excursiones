// Cabecera de sección: antetítulo + H2 (+ entradilla). En WordPress: grupo con párrafo pequeño y H2.
import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, intro, id, light = false, center = false, className = "" }: {
  eyebrow: string;
  title: string;
  intro?: string;
  /** id del H2, para aria-labelledby de la sección */
  id: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      <p className={`eyebrow inline-flex items-center gap-2.5 ${light ? "text-accent" : "text-green"}`}>
        <span aria-hidden className="size-2 rounded-full bg-coral" />
        {eyebrow}
      </p>
      <h2 id={id} className={`display mt-4 text-[2.4rem] sm:text-5xl lg:text-[3.5rem] ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {intro && <p className={`mt-5 text-lg ${light ? "text-white/85" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}
