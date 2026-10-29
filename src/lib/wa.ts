// WhatsApp: enlaces con mensaje precargado. Todos los botones de WhatsApp pasan por aquí.
import { site } from "../content";

/** Enlace de WhatsApp con el mensaje precargado */
export const waLink = (mensaje: string = site.whatsappDefault) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;

/** Abre WhatsApp en una pestaña nueva */
export const openWhatsApp = (mensaje?: string) => window.open(waLink(mensaje), "_blank", "noopener");
