// Mapa de Google con bloqueo previo: el iframe no existe hasta aceptar «Marketing y terceros».
// Antes, un placeholder sin conexiones a Google.
import { MapPin } from "lucide-react";
import { contact, site } from "../content";
import { allow, openCookieSettings, useConsent } from "../lib/consent";

export function MapEmbed({ className = "" }: { className?: string }) {
  const consent = useConsent();
  const q = encodeURIComponent(site.mapQuery);

  return (
    <div className={`relative overflow-hidden rounded-lg border border-line bg-green-soft ${className}`}>
      {consent?.marketing ? (
        <iframe
          title={contact.map.title}
          src={`https://www.google.com/maps?q=${q}&z=10&output=embed`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          {/* Curvas de nivel decorativas (SVG local, sin peticiones externas) */}
          <svg aria-hidden className="absolute inset-0 size-full text-green/15" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <ellipse key={n} cx="230" cy="150" rx={40 + n * 32} ry={26 + n * 22} fill="none" stroke="currentColor" strokeWidth="1.5" transform={`rotate(${-12 + n * 3} 230 150)`} />
            ))}
          </svg>
          <span className="relative grid size-14 place-items-center rounded-full bg-surface text-green shadow">
            <MapPin aria-hidden />
          </span>
          <div className="relative">
            <p className="font-display text-2xl font-medium">{site.mapQuery}</p>
            <p className="mt-1 max-w-sm text-[0.92rem] text-muted">{contact.map.blocked}</p>
          </div>
          <div className="relative flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => allow("marketing")} className="btn btn-dark !min-h-11">
              {contact.map.accept}
            </button>
            <button type="button" onClick={openCookieSettings} className="btn btn-outline !min-h-11 bg-surface">
              Configurar cookies
            </button>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-[0.9rem] font-bold text-green underline underline-offset-4"
          >
            {contact.map.open}
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        </div>
      )}
    </div>
  );
}
