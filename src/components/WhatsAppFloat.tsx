// Botón flotante de WhatsApp siempre visible, con tooltip (al pasar el ratón o con el foco).
// En WordPress: plugin ligero tipo «Click to Chat» o un botón fijo del maquetador con el mismo enlace wa.me.
import { site } from "../content";
import { waLink } from "../lib/wa";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.whatsappTooltip} (WhatsApp, se abre en una pestaña nueva)`}
      className="group fixed right-4 bottom-4 z-30 sm:right-6 sm:bottom-6"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 translate-x-2 rounded-full bg-ink px-4 py-2 text-[0.9rem] font-bold whitespace-nowrap text-white opacity-0 shadow-lg transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      >
        {site.whatsappTooltip}
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgba(23,125,69,0.7)] transition-transform group-hover:scale-105">
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-20 motion-reduce:hidden" />
        <WhatsAppIcon className="relative size-7" />
      </span>
    </a>
  );
}
