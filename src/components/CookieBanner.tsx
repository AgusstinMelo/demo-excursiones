// Banner y panel de cookies (AEPD): Aceptar, Rechazar y Configurar con el mismo peso visual,
// configuración por categorías y decisión guardada en localStorage. Se reabre desde el pie.
// En WordPress lo sustituye Complianz o CookieYes con el bloqueo previo activado.
// El banner va abajo a la izquierda para no tapar el botón flotante de WhatsApp.
import { AnimatePresence, m } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cookies } from "../content";
import { acceptAll, activateScripts, closeCookieSettings, openCookieSettings, rejectAll, saveConsent, useConsent, useCookiePanel } from "../lib/consent";
import { linkHandler } from "../lib/router";

// Los tres botones comparten estilo: ninguna opción se destaca sobre las demás
const choiceBtn = "btn btn-outline flex-1 bg-surface !min-h-11 !px-4 text-[0.92rem]";

export function CookieBanner() {
  const consent = useConsent();
  const panel = useCookiePanel();

  // Activa los scripts ya aceptados en visitas anteriores
  useEffect(() => activateScripts(), []);

  return (
    <>
      <AnimatePresence>
        {!consent && !panel && (
          <m.section
            aria-labelledby="cookies-titulo"
            // Aparece sin fundido (no retrasa el LCP); solo se anima al cerrarse
            initial={false}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-x-3 bottom-3 z-50 rounded-lg border border-line bg-surface p-5 shadow-[0_24px_60px_-20px_rgba(29,43,58,0.45)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md sm:p-6"
          >
            <h2 id="cookies-titulo" className="font-display text-[1.5rem] leading-tight font-semibold">
              {cookies.title}
            </h2>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
              {cookies.text} {cookies.more}{" "}
              <a href="/cookies" onClick={linkHandler("/cookies")} className="font-bold text-green underline underline-offset-2">
                {cookies.moreLink}
              </a>
              .
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" className={choiceBtn} onClick={acceptAll}>
                {cookies.accept}
              </button>
              <button type="button" className={choiceBtn} onClick={rejectAll}>
                {cookies.reject}
              </button>
              <button type="button" className={choiceBtn} onClick={openCookieSettings}>
                {cookies.configure}
              </button>
            </div>
          </m.section>
        )}
      </AnimatePresence>
      <AnimatePresence>{panel && <CookiePanel />}</AnimatePresence>
    </>
  );
}

function CookiePanel() {
  const consent = useConsent();
  const [choice, setChoice] = useState({ analytics: consent?.analytics ?? false, marketing: consent?.marketing ?? false });
  const dialogRef = useRef<HTMLDivElement>(null);

  // Foco dentro del diálogo, Escape para cerrar y bloqueo del scroll de fondo
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("button, input")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCookieSettings();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const els = dialogRef.current.querySelectorAll<HTMLElement>("button, input, a[href]");
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prev?.focus?.();
    };
  }, []);

  return (
    <m.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && closeCookieSettings()}
    >
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookies-panel-titulo"
        aria-describedby="cookies-panel-texto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        className="max-h-[calc(100dvh-1.5rem)] w-full max-w-lg overflow-y-auto rounded-lg border border-line bg-surface p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="cookies-panel-titulo" className="font-display text-[1.75rem] leading-tight font-semibold">
            {cookies.panelTitle}
          </h2>
          <button type="button" onClick={closeCookieSettings} className="-mt-1 -mr-2 grid size-11 shrink-0 place-items-center rounded-full hover:bg-sand" aria-label="Cerrar">
            <X aria-hidden strokeWidth={1.5} />
          </button>
        </div>
        <p id="cookies-panel-texto" className="mt-2 text-[0.92rem] text-muted">
          {cookies.panelText}
        </p>

        <ul className="mt-6 border-t border-line">
          {cookies.categories.map((c) => {
            const fixed = c.id === "necessary";
            const checked = fixed || choice[c.id];
            const inputId = `cookie-${c.id}`;
            return (
              <li key={c.id} className="border-b border-line py-5">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor={inputId} className="font-bold">
                    {c.title}
                  </label>
                  {fixed ? (
                    <span className="text-[0.82rem] font-semibold text-success">{cookies.alwaysOn}</span>
                  ) : (
                    <span className="relative inline-flex">
                      <input
                        id={inputId}
                        type="checkbox"
                        role="switch"
                        checked={checked}
                        aria-describedby={`${inputId}-desc`}
                        onChange={(e) => setChoice((s) => ({ ...s, [c.id]: e.target.checked }))}
                        className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
                      />
                      <span
                        aria-hidden
                        className="h-7 w-12 rounded-full border border-line bg-sand transition-colors peer-checked:border-green peer-checked:bg-green peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sea"
                      />
                      <span aria-hidden className="absolute top-1 left-1 size-5 rounded-full bg-surface shadow transition-transform peer-checked:translate-x-5" />
                    </span>
                  )}
                </div>
                <p id={`${inputId}-desc`} className="mt-1.5 text-[0.88rem] text-muted">
                  {c.text}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" className={choiceBtn} onClick={rejectAll}>
            {cookies.reject}
          </button>
          <button type="button" className={choiceBtn} onClick={() => saveConsent(choice)}>
            {cookies.save}
          </button>
          <button type="button" className={choiceBtn} onClick={acceptAll}>
            {cookies.accept}
          </button>
        </div>
      </m.div>
    </m.div>
  );
}
