// Diálogo modal accesible (detalle de excursión, lightbox, vídeo, cookies):
// foco atrapado, cierre con Escape y clic fuera, scroll del fondo bloqueado y foco devuelto al cerrar.
import { m } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

export function Dialog({ onClose, labelledBy, label, children, className = "", overlayClassName = "" }: {
  onClose: () => void;
  labelledBy?: string;
  label?: string;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const auto = ref.current?.querySelector<HTMLElement>("[data-autofocus]");
    (auto ?? ref.current)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
      }
      if (e.key !== "Tab" || !ref.current) return;
      const els = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const sbw = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    html.style.paddingRight = `${sbw}px`;
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = "";
      html.style.paddingRight = "";
      prev?.focus?.({ preventScroll: true });
    };
  }, []);

  return (
    <m.div
      className={`fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6 ${overlayClassName}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <m.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={label}
        tabIndex={-1}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </m.div>
  );
}
