// Consentimiento de cookies: se guarda en localStorage y se comparte con cualquier componente
// mediante useConsent(). Nada de terceros se carga hasta que se acepta su categoría.
import { useSyncExternalStore } from "react";

export type Category = "analytics" | "marketing";
export interface Consent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** Fecha de la decisión: se vuelve a preguntar a los 12 meses */
  date: string;
  version: number;
}

const KEY = "sl-consent";
const VERSION = 1;
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

let consent: Consent | null = read();
let panelOpen = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (c.version !== VERSION || Date.now() - Date.parse(c.date) > MAX_AGE_MS) return null;
    return c;
  } catch {
    return null;
  }
}

/** Guarda la decisión. Si se retira un permiso ya concedido, se recarga para descargar los scripts. */
export function saveConsent(choice: { analytics: boolean; marketing: boolean }) {
  const revoked = (consent?.analytics && !choice.analytics) || (consent?.marketing && !choice.marketing);
  consent = { necessary: true, ...choice, date: new Date().toISOString(), version: VERSION };
  try {
    localStorage.setItem(KEY, JSON.stringify(consent));
  } catch {
    /* modo privado: la decisión dura esta visita */
  }
  panelOpen = false;
  emit();
  if (revoked) window.location.reload();
  else activateScripts();
}

export const acceptAll = () => saveConsent({ analytics: true, marketing: true });
export const rejectAll = () => saveConsent({ analytics: false, marketing: false });
/** Acepta una sola categoría manteniendo el resto (p. ej. desde el mapa) */
export const allow = (cat: Category) => saveConsent({ analytics: consent?.analytics ?? false, marketing: consent?.marketing ?? false, [cat]: true });

export function openCookieSettings() {
  panelOpen = true;
  emit();
}
export function closeCookieSettings() {
  panelOpen = false;
  emit();
}

/**
 * Bloqueo previo: activa los <script type="text/plain" data-consent="..."> de index.html
 * cuya categoría esté aceptada, sustituyéndolos por scripts ejecutables.
 */
export function activateScripts() {
  if (!consent) return;
  document.querySelectorAll<HTMLScriptElement>('script[type="text/plain"][data-consent]').forEach((blocked) => {
    const cat = blocked.dataset.consent as Category;
    if (!consent?.[cat]) return;
    const s = document.createElement("script");
    if (blocked.src) s.src = blocked.src;
    else s.textContent = blocked.textContent;
    s.async = true;
    blocked.replaceWith(s);
  });
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** Estado del consentimiento (null = todavía no ha decidido) */
export const useConsent = () => useSyncExternalStore(subscribe, () => consent, () => null);
export const useCookiePanel = () => useSyncExternalStore(subscribe, () => panelOpen, () => false);
