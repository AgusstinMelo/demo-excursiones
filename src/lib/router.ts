// Enrutado mínimo sin dependencias: la one-page en "/" y las páginas legales en su propia ruta.
import { useSyncExternalStore, type MouseEvent } from "react";
import { legalPages, type LegalSlug } from "../content";

const subscribe = (l: () => void) => {
  window.addEventListener("popstate", l);
  return () => window.removeEventListener("popstate", l);
};

export const usePath = () => useSyncExternalStore(subscribe, () => window.location.pathname, () => "/");

/** Slug de la página legal actual, o null si estamos en la portada */
export function legalSlug(path: string): LegalSlug | null {
  const slug = path.replace(/^\/|\/$/g, "");
  return slug in legalPages ? (slug as LegalSlug) : null;
}

/** Navega sin recargar. Admite anclas ("/#contacto"): se desplaza al llegar. */
export function navigate(href: string) {
  const url = new URL(href, window.location.origin);
  const samePage = url.pathname === window.location.pathname;
  if (!samePage) {
    window.history.pushState(null, "", url.pathname + url.search + url.hash);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
  if (url.hash) {
    if (samePage) window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    // Espera a que se pinte la nueva vista antes de buscar el ancla
    requestAnimationFrame(() => scrollToId(url.hash.slice(1), !samePage));
  } else if (!samePage) {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

export function scrollToId(id: string, instant = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: instant ? "instant" : "smooth", block: "start" });
  // Lleva el foco al destino para teclado y lectores de pantalla
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/** onClick para enlaces internos: navegación SPA respetando Ctrl/Cmd+clic */
export function linkHandler(href: string) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href);
  };
}
