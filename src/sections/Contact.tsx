// Contacto y disponibilidad: formulario con validación accesible y envío simulado,
// botón alternativo «Enviar por WhatsApp» que arma el mensaje con los datos, correo y mapa bloqueado.
// En WordPress: Contact Form 7 / WPForms con los mismos campos + botón de WhatsApp + mapa gestionado por Complianz/CookieYes.
import { CheckCircle2, ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { WhatsAppIcon } from "../components/Icons";
import { MapEmbed } from "../components/MapEmbed";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { contact, site, trips } from "../content";
import { linkHandler } from "../lib/router";
import { useSelectedService } from "../lib/selection";
import { openWhatsApp, waLink } from "../lib/wa";

type Field = "name" | "email" | "phone" | "trip" | "date" | "people" | "message" | "privacy";
type Values = Record<Exclude<Field, "privacy">, string> & { privacy: boolean };
const EMPTY: Values = { name: "", email: "", phone: "", trip: "", date: "", people: "2", message: "", privacy: false };
const PEOPLE = [...Array.from({ length: 12 }, (_, i) => String(i + 1)), "Más de 12"];

const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

function validate(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  const E = contact.errors;
  if (v.name.trim().length < 2) e.name = E.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = E.email;
  if (v.phone.trim() && !/^\+?[\d\s]{9,15}$/.test(v.phone.trim())) e.phone = E.phone;
  if (!v.trip) e.trip = E.trip;
  if (v.date && v.date < today()) e.date = E.date;
  if (!v.people) e.people = E.people;
  if (!v.privacy) e.privacy = E.privacy;
  return e;
}

const tripTitle = (slug: string) => trips.items.find((t) => t.slug === slug)?.title ?? (slug ? contact.form.tripOther : "");
const formatDate = (iso: string) => (iso ? new Date(`${iso}T12:00:00`).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : "");

/** Mensaje de WhatsApp con los datos que haya rellenado la persona */
function whatsappMessage(v: Values) {
  const lines = [
    "¡Hola, Laura! Quería consultar disponibilidad:",
    v.trip && `• Excursión: ${tripTitle(v.trip)}`,
    v.date && `• Fecha: ${formatDate(v.date)}`,
    v.people && `• Personas: ${v.people}`,
    v.message.trim() && `• Comentarios: ${v.message.trim()}`,
    v.name.trim() && `Soy ${v.name.trim()}.`,
  ];
  return lines.filter(Boolean).join("\n");
}

export function Contact() {
  const f = contact.form;
  const uid = useId();
  const [values, setValues] = useState<Values>(() => {
    const s = new URLSearchParams(window.location.search).get("excursion") ?? "";
    return { ...EMPTY, trip: trips.items.some((t) => t.slug === s) ? s : "" };
  });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const selected = useSelectedService();

  // Al pulsar «Consultar disponibilidad» en el detalle de una excursión
  useEffect(() => {
    if (selected) setValues((v) => ({ ...v, trip: selected }));
  }, [selected]);

  const errors = validate(values);
  const show = (k: Field) => (submitted || touched[k]) && errors[k];
  const set = (k: Field) => (e: { target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement }) =>
    setValues((v) => ({ ...v, [k]: k === "privacy" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const first = (Object.keys(errors) as Field[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // Envío simulado: en WordPress lo gestiona Contact Form 7 / WPForms con SMTP
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      requestAnimationFrame(() => successRef.current?.focus());
    }, 900);
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
  };

  const fp = (k: Field, hint = false) => ({
    id: `${uid}-${k}`,
    name: k,
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    "aria-invalid": show(k) ? true : undefined,
    "aria-describedby": show(k) ? `${uid}-${k}-error` : hint ? `${uid}-${k}-hint` : undefined,
  });
  const field = (k: Field, label: string, control: ReactNode, opts: { required?: boolean; hint?: string; className?: string } = {}) => (
    <div className={opts.className}>
      <label htmlFor={`${uid}-${k}`} className="mb-1.5 block text-[0.95rem] font-bold">
        {label}
        {opts.required && <span aria-hidden className="text-error"> *</span>}
        {opts.required && <span className="sr-only"> (obligatorio)</span>}
      </label>
      {control}
      {show(k) ? (
        <ErrorText id={`${uid}-${k}-error`}>{errors[k]}</ErrorText>
      ) : (
        opts.hint && (
          <p id={`${uid}-${k}-hint`} className="mt-1.5 text-[0.85rem] text-muted">
            {opts.hint}
          </p>
        )
      )}
    </div>
  );

  return (
    <section id="contacto" aria-labelledby="titulo-contacto" className="section-y bg-sand">
      <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex min-w-0 flex-col">
          <SectionHeading id="titulo-contacto" eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro} />

          <Reveal delay={0.1} className="mt-9">
            <p className="font-bold">{contact.direct.title}</p>
            <ul className="mt-4 grid gap-3">
              <DirectRow icon={<WhatsAppIcon className="size-5" />} label={contact.direct.whatsapp} tone="bg-whatsapp text-white">
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {site.phone}
                  <span className="sr-only"> (WhatsApp, se abre en una pestaña nueva)</span>
                </a>
              </DirectRow>
              <DirectRow icon={<Mail className="size-5" />} label={contact.direct.email}>
                <a href={`mailto:${site.email}`} className="break-all hover:underline">
                  {site.email}
                </a>
              </DirectRow>
              <DirectRow icon={<Phone className="size-5" />} label={contact.direct.phone}>
                <a href={site.phoneHref} className="hover:underline">
                  {site.phone}
                </a>
              </DirectRow>
              <DirectRow icon={<MapPin className="size-5" />} label={contact.direct.zone}>
                {site.mapQuery}
              </DirectRow>
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 flex-1">
            <MapEmbed className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[280px]" />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-w-0">
          <div className="rounded-lg bg-surface p-6 shadow-[0_30px_60px_-40px_rgba(28,42,35,0.45)] sm:p-10">
            {status === "sent" ? (
              <div ref={successRef} tabIndex={-1} role="status" className="flex min-h-[32rem] flex-col items-center justify-center text-center outline-none">
                <span className="grid size-20 place-items-center rounded-full bg-green-soft text-green">
                  <CheckCircle2 aria-hidden className="size-10" strokeWidth={1.5} />
                </span>
                <p className="display mt-6 text-3xl">{f.successTitle}</p>
                <p className="mt-3 max-w-sm text-muted">{f.successText}</p>
                <button type="button" onClick={reset} className="btn btn-outline mt-8">
                  {f.successReset}
                </button>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="titulo-contacto">
                {submitted && Object.keys(errors).length > 0 && (
                  <p role="alert" className="mb-6 rounded-sm border-l-4 border-error bg-error/5 px-4 py-3 text-[0.95rem] text-error">
                    {contact.errors.summary}
                  </p>
                )}
                <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  {field("name", f.name, <input {...fp("name")} type="text" autoComplete="name" required value={values.name} onChange={set("name")} className="field" />, { required: true })}
                  {field("email", f.email, <input {...fp("email")} type="email" autoComplete="email" inputMode="email" required value={values.email} onChange={set("email")} className="field" />, { required: true })}
                  {field("phone", f.phone, <input {...fp("phone", true)} type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={set("phone")} className="field" />, { hint: f.phoneHint })}
                  {field(
                    "trip",
                    f.trip,
                    <Select {...fp("trip")} required value={values.trip} onChange={set("trip")}>
                      <option value="" disabled>
                        {f.tripPlaceholder}
                      </option>
                      {trips.items.map((t) => (
                        <option key={t.slug} value={t.slug}>
                          {t.title}
                        </option>
                      ))}
                      <option value="privado">{f.tripOther}</option>
                    </Select>,
                    { required: true },
                  )}
                  {field("date", f.date, <input {...fp("date", true)} type="date" min={today()} value={values.date} onChange={set("date")} className="field" />, { hint: f.dateHint })}
                  {field(
                    "people",
                    f.people,
                    <Select {...fp("people")} required value={values.people} onChange={set("people")}>
                      {PEOPLE.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </Select>,
                    { required: true },
                  )}
                  {field(
                    "message",
                    f.message,
                    <textarea {...fp("message")} rows={4} placeholder={f.messagePlaceholder} value={values.message} onChange={set("message")} className="field resize-y" />,
                    { className: "sm:col-span-2" },
                  )}
                </div>

                <div className="mt-5">
                  <div className="flex items-start gap-3">
                    <input {...fp("privacy")} type="checkbox" required checked={values.privacy} onChange={set("privacy")} className="mt-1 size-5 shrink-0 cursor-pointer accent-[var(--c-green)]" />
                    <label htmlFor={`${uid}-privacy`} className="cursor-pointer text-[0.95rem] leading-snug">
                      {f.privacy}{" "}
                      <a href="/privacidad" onClick={linkHandler("/privacidad")} className="font-bold text-green underline underline-offset-2">
                        {f.privacyLink}
                      </a>
                      <span aria-hidden className="text-error"> *</span>
                    </label>
                  </div>
                  {show("privacy") && <ErrorText id={`${uid}-privacy-error`}>{errors.privacy}</ErrorText>}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <button type="submit" disabled={status === "sending"} className="btn btn-accent disabled:opacity-70">
                    {status === "sending" ? f.sending : f.submit}
                  </button>
                  <button type="button" onClick={() => openWhatsApp(whatsappMessage(values))} className="btn btn-whatsapp" aria-describedby={`${uid}-wa-hint`}>
                    <WhatsAppIcon className="size-5" />
                    {f.whatsapp}
                  </button>
                </div>
                <p id={`${uid}-wa-hint`} className="mt-2 text-center text-[0.82rem] text-muted sm:text-right">
                  {f.whatsappHint}
                </p>

                <p className="mt-6 text-[0.8rem] leading-relaxed text-muted">{f.legalNote}</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className="field cursor-pointer appearance-none pr-10">
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2" />
    </div>
  );
}

function DirectRow({ icon, label, tone = "bg-green-soft text-green", children }: { icon: ReactNode; label: string; tone?: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-4 rounded-md bg-surface p-3.5 pr-5">
      <span aria-hidden className={`grid size-11 shrink-0 place-items-center rounded-full ${tone}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[0.8rem] font-bold tracking-wide text-muted uppercase">{label}</p>
        <div className="font-bold">{children}</div>
      </div>
    </li>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[0.875rem] font-bold text-error">
      {children}
    </p>
  );
}
