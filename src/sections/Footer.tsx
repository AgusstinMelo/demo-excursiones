// Pie: contacto, redes, enlaces legales y botón para reabrir la configuración de cookies.
// En WordPress: pie de la plantilla con columnas de widgets, iconos sociales y menú legal.
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../components/Icons";
import { footer, legalPages, nav, site, type LegalSlug } from "../content";
import { openCookieSettings } from "../lib/consent";
import { linkHandler } from "../lib/router";
import { waLink } from "../lib/wa";
import { Logo } from "./Header";

const SOCIAL = { instagram: InstagramIcon, facebook: FacebookIcon };

export function Footer() {
  const link = "text-white/80 transition-colors hover:text-white hover:underline underline-offset-4";
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="wrap grid gap-12 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo light />
          <p className="mt-5 max-w-xs text-white/75">{footer.tagline}</p>
          <ul className="mt-6 flex gap-2">
            {site.socials.map((s) => {
              const Icon = SOCIAL[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (se abre en una pestaña nueva)`}
                    className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-ink"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp (se abre en una pestaña nueva)"
                className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-ink"
              >
                <WhatsAppIcon className="size-5" />
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Secciones">
          <p className="eyebrow !text-[0.75rem] text-accent">Explora</p>
          <ul className="mt-5 space-y-2.5">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`/#${n.id}`} onClick={linkHandler(`/#${n.id}`)} className={link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow !text-[0.75rem] text-accent">Contacto</p>
          <ul className="mt-5 space-y-2.5">
            <li>
              <a href={site.phoneHref} className={link}>
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${link} break-all`}>
                {site.email}
              </a>
            </li>
            <li className="text-white/80">
              {site.address.locality} ({site.address.region})
            </li>
          </ul>
        </div>

        <nav aria-label="Información legal">
          <p className="eyebrow !text-[0.75rem] text-accent">Legal</p>
          <ul className="mt-5 space-y-2.5">
            {(Object.keys(legalPages) as LegalSlug[]).map((slug) => (
              <li key={slug}>
                <a href={`/${slug}`} onClick={linkHandler(`/${slug}`)} className={link}>
                  {legalPages[slug].title}
                </a>
              </li>
            ))}
            <li>
              <button type="button" onClick={openCookieSettings} className={`${link} cursor-pointer text-left`}>
                {footer.cookieSettings}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-1.5 py-6 pr-24 text-[0.85rem] text-white/65 sm:flex-row sm:justify-between">
          <p>
            {footer.copyright} · {site.license}
          </p>
          <p>{site.demoNotice}</p>
        </div>
      </div>
    </footer>
  );
}
