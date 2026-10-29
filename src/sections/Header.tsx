// Cabecera: logo, menú con anclas y botón «Consulta disponibilidad».
// Transparente sobre el hero y sólida al hacer scroll; menú a pantalla completa en móvil.
// En WordPress: cabecera «transparente + sticky» de la plantilla y menú de enlaces personalizados (#ancla).
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "../components/Icons";
import { ctaLabel, nav, site } from "../content";
import { linkHandler } from "../lib/router";
import { waLink } from "../lib/wa";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${light ? "text-white" : "text-ink"}`}>
      <svg viewBox="0 0 40 40" aria-hidden className="size-9 shrink-0">
        <rect width="40" height="40" rx="12" fill={light ? "rgb(255 255 255 / 0.16)" : "var(--c-green)"} />
        <path d="M6 29 L16 15 L21 21.5 L25 17 L34 29 Z" fill={light ? "#fff" : "var(--c-bg)"} />
        <circle cx="28.5" cy="11" r="3.2" fill="var(--c-accent)" />
      </svg>
      <span className="font-display text-[1.3rem] leading-none font-semibold tracking-tight">{site.name}</span>
    </span>
  );
}

export function Header({ isHome }: { isHome: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!isHome) return setActive("");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: "-45% 0px -50% 0px",
    });
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || !isHome;
  const light = !solid && !open;
  const go = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    linkHandler(href)(e);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <p className="relative z-10 bg-ink px-4 py-1.5 text-center text-[0.75rem] font-medium tracking-wide text-white/85">
        <span aria-hidden className="mr-2 inline-block size-1.5 -translate-y-px rounded-full bg-accent align-middle" />
        {site.demoNotice}
      </p>
      <div
        className={`relative z-10 transition-[background-color,box-shadow] duration-300 ${
          solid || open ? "bg-bg/95 shadow-[0_10px_30px_-20px_rgba(28,42,35,0.35)] backdrop-blur-md" : "bg-gradient-to-b from-black/35 to-transparent"
        }`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <a href="/#inicio" onClick={go("/#inicio")} aria-label={`${site.name}, ir al inicio`} className="rounded-sm">
            <Logo light={light} />
          </a>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`/#${n.id}`}
                    onClick={go(`/#${n.id}`)}
                    aria-current={active === n.id ? "location" : undefined}
                    className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
                      light
                        ? active === n.id ? "bg-white/20 text-white" : "text-white/90 hover:bg-white/15 hover:text-white"
                        : active === n.id ? "bg-green-soft text-green" : "text-ink hover:bg-sand"
                    }`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href="/#contacto" onClick={go("/#contacto")} className="btn btn-accent hidden !min-h-11 !px-5 !text-[0.92rem] sm:inline-flex">
              {ctaLabel}
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={`grid size-11 place-items-center rounded-full transition-colors xl:hidden ${light ? "text-white hover:bg-white/15" : "text-ink hover:bg-sand"}`}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú a pantalla completa (móvil y tableta) */}
      <AnimatePresence>
        {open && (
          <m.nav
            id="menu-movil"
            aria-label="Menú móvil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-0 flex flex-col overflow-y-auto bg-bg pt-[calc(var(--header-h)+28px)] xl:hidden"
          >
            <ul className="wrap flex-1 py-8">
              {nav.map((n, i) => (
                <m.li
                  key={n.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <a href={`/#${n.id}`} onClick={go(`/#${n.id}`)} className="display block py-2.5 text-[2.6rem] text-ink transition-colors hover:text-green sm:text-6xl">
                    {n.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="wrap grid gap-3 pb-10 sm:grid-cols-2">
              <a href="/#contacto" onClick={go("/#contacto")} className="btn btn-accent">
                {ctaLabel}
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsAppIcon className="size-5" /> WhatsApp
              </a>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
