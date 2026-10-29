# Senderos con Laura — Demo de propuesta

Demo one-page para una profesional que organiza excursiones guiadas en grupos reducidos (montaña, costa, patrimonio y gastronomía), pensada como **muestra de la dirección visual y de la estructura** de la web definitiva, que se montará en **WordPress con una plantilla que se elegirá con la clienta**. No hay reservas ni pagos online: el objetivo es que la persona consulte disponibilidad por formulario, correo o WhatsApp. Todo el contenido es de ejemplo.

- **Stack:** Vite + React + TypeScript + Tailwind CSS 4 + Motion + lucide-react
- **Sin backend:** el formulario simula el envío; el despliegue es estático en Vercel
- **Rutas:** `/` (one-page), `/aviso-legal`, `/privacidad`, `/cookies`

---

## Cómo ejecutarla

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # comprueba tipos y genera /dist
npm run preview   # sirve /dist en local
```

Requiere Node 20 o superior.

## Despliegue en Vercel

1. Sube la carpeta a un repositorio de GitHub (o usa `npx vercel` desde la carpeta).
2. En Vercel: **Add New → Project**, importa el repositorio. Vercel detecta Vite automáticamente (build `npm run build`, salida `dist`).
3. Pulsa **Deploy** y obtendrás un link público `https://<proyecto>.vercel.app`.
4. Actualiza `site.url` en `src/content.ts` con ese dominio y vuelve a desplegar: se usa en canonical, Open Graph, JSON-LD, `robots.txt` y `sitemap.xml`.

`vercel.json` incluye el rewrite de SPA. Además, el build genera `/aviso-legal/index.html`, `/privacidad/index.html` y `/cookies/index.html` con su propio título y metadescripción.

## Cómo cambiar contenidos

Todo está en **`src/content.ts`**:

- **Datos generales:** nombre, correo, teléfono, **número de WhatsApp** (`site.whatsapp`, formato internacional sin `+`), mensaje por defecto y tooltip del botón flotante, zona, redes sociales, registro de turismo, **título SEO y metadescripción**.
- **Presentación:** titular (las palabras entre `*asteriscos*` salen en cursiva y color de acento), subtítulo, botones, cifras y foto. `hero.video` es el vídeo de YouTube del botón «Ver vídeo» (`null` para ocultarlo). `hero.backgroundVideo` permite poner un MP4 propio de fondo (desactivado por defecto).
- **Excursiones (`trips.items`):** cada una con foto, categoría, resumen, descripción, duración, distancia, dificultad (1 fácil, 2 moderada, 3 exigente), punto de encuentro, precio «desde», tamaño de grupo, itinerario, qué incluye, qué llevar y galería. Se generan automáticamente las tarjetas, el modal, el desplegable del formulario y el JSON-LD `TouristTrip`.
- **Galería, información práctica, opiniones, contacto, cookies y páginas legales:** cada bloque tiene su apartado.
- **Fotos:** URL de Unsplash sin parámetros + ancho y alto originales (para reservar el espacio). El componente `Img` pide el tamaño y formato (AVIF/WebP) adecuado a cada pantalla.

## Cómo cambiar colores y tipografías

Todo está en **`src/styles/tokens.css`**, como variables CSS comentadas:

| Variable | Uso | Valor |
|---|---|---|
| `--c-bg` / `--c-sand` | Blanco cálido de fondo / arena para secciones alternas | `#fbf7f0` / `#f2e9da` |
| `--c-ink` | Texto principal (verde casi negro) | `#1c2a23` |
| `--c-green` / `--c-green-soft` | Verde bosque (enlaces, iconos) / verde suave (fondos) | `#2e5b44` / `#dfe9db` |
| `--c-sea` / `--c-sky` | Azul mar (info práctica) / azul cielo (galería) | `#22647f` / `#dbeaf0` |
| `--c-accent` | Mostaza de los botones de llamada a la acción | `#f2b33d` |
| `--c-coral` | Detalles decorativos | `#e26d4f` |
| `--c-whatsapp` | Botones de WhatsApp (contraste AA con texto blanco) | `#177d45` |
| `--f-display` / `--f-body` | Títulos / texto | Fraunces / DM Sans |
| `--r-sm` / `--r-md` / `--r-lg` | Radios de campos, tarjetas y fotos grandes | 12 / 20 / 32 px |

## Estructura

```
src/
  content.ts               ← todos los textos, excursiones y datos
  styles/tokens.css        ← colores, tipografías y medidas
  sections/                ← una sección = un componente
    Header, Hero (+ cinta de destinos), About, Trips (+ modal), Gallery (+ lightbox),
    Practical, Testimonials, Contact, Footer
  components/              ← Img, Reveal, Dialog (modal accesible), VideoModal, MapEmbed,
                             CookieBanner, WhatsAppFloat, Icons
  pages/Legal.tsx          ← plantilla de páginas legales
  lib/wa.ts                ← waLink(mensaje): todos los enlaces de WhatsApp
  lib/consent.ts           ← consentimiento de cookies y bloqueo previo
  lib/router.ts            ← enrutado mínimo sin dependencias
public/analytics-demo.js   ← script de analítica de ejemplo (solo con consentimiento)
```

## WhatsApp

Todos los botones usan `waLink(mensaje)` de `src/lib/wa.ts`:

- **Botón flotante** siempre visible, con tooltip al pasar el ratón o con el foco.
- **Hero** y **menú móvil**: mensaje genérico.
- **Modal de excursión**: «Preguntar por WhatsApp» con el nombre de la excursión en el mensaje.
- **Formulario**: «Enviar por WhatsApp» arma el mensaje con la excursión, la fecha, las personas, los comentarios y el nombre que se hayan rellenado.

## Cookies y bloqueo previo

- Banner con **Aceptar, Rechazar y Configurar con el mismo estilo** (criterio de la AEPD) y panel por categorías: necesarias, analíticas y marketing/terceros. Se coloca abajo a la izquierda para no tapar el botón de WhatsApp.
- Decisión guardada en `localStorage` (`sl-consent`) durante 12 meses; se cambia desde **«Configurar cookies»** en el pie y en la política de cookies.
- **Bloqueo previo real** (sin ninguna petición a terceros antes de aceptar):
  - **Mapa de Google:** placeholder con «Aceptar cookies para ver el mapa».
  - **Vídeo de YouTube:** el modal muestra la foto del hero como póster y «Aceptar cookies para ver el vídeo»; al aceptar se carga desde `youtube-nocookie.com`.
  - **Analítica:** script en `index.html` como `type="text/plain" data-consent="analytics"`, activado solo al aceptar analíticas (el mismo patrón que Complianz o CookieYes).

## Rendimiento, accesibilidad y SEO

- Imágenes con `srcset` y AVIF/WebP, dimensiones fijas, `loading="lazy"`; la del hero se precarga con `fetchpriority="high"`.
- Primer pintado rápido en móvil: cabecera y hero se pintan primero; el resto de secciones y el pie se cargan en un chunk aparte justo después (`sections/BelowFold.tsx`). Las fuentes de Google (preconnect + `display=swap`) se inyectan tras ese primer pintado desde `main.tsx`, con fuentes de reserva de métricas medidas para que el cambio no mueva el texto (CLS ≈ 0).
- Lighthouse móvil en local: 93–94 en rendimiento y 100 en accesibilidad, buenas prácticas y SEO.
- Vídeo de fondo opcional con póster, `preload="none"` y desactivado con ahorro de datos, 2G/3G o movimiento reducido.
- Animaciones solo de `opacity` y `transform` (parallax suave, titular palabra a palabra, revelado al hacer scroll, zoom de fotos, cinta de destinos), desactivadas con `prefers-reduced-motion`.
- Capas oscuras sobre las fotos para contraste AA, foco visible, enlace «Saltar al contenido».
- Modal de excursión, lightbox, vídeo y panel de cookies con foco atrapado, cierre con Escape y foco devuelto al cerrar; lightbox con flechas del teclado.
- Formulario con labels, `aria-invalid`, mensajes de error asociados y foco en el primer campo erróneo.
- `lang="es-ES"`, título y descripción desde `content.ts`, Open Graph con la foto destacada, JSON-LD `LocalBusiness` + un `TouristTrip` por excursión (con itinerario y precio), un solo H1, favicon, `robots.txt` y `sitemap.xml`.

---

## De la demo a WordPress

| Sección de la demo | Cómo se monta en WordPress |
|---|---|
| **Plantilla** | Se elige con la clienta entre 2–3 opciones que cumplan: ligera (buena puntuación en móvil), compatible con el maquetador que se vaya a usar y con buena galería (rejilla + lightbox). |
| **Colores y tipografías** (`tokens.css`) | Ajustes globales de la plantilla: paleta con los colores de la tabla, tipografías Fraunces + DM Sans alojadas localmente, estilo global de botones (redondeados, mostaza) y radios. |
| **Header** | Cabecera transparente sobre el hero y fija al hacer scroll (opción de la plantilla), menú de enlaces personalizados a anclas y botón «Consulta disponibilidad». Menú móvil a pantalla completa (off-canvas). |
| **Presentación** | Sección a pantalla completa con imagen de fondo (o vídeo con póster), capa oscura, H1, subtítulo y dos botones (excursiones y WhatsApp). Efecto de entrada del titular con las animaciones del maquetador. |
| **Cinta de destinos** | Widget de marquee / texto en movimiento del maquetador (o bloque CSS sencillo). |
| **Sobre mí** | Dos columnas (imágenes / texto), lista de titulaciones y fila de 3 columnas con icono para los diferenciales. |
| **Excursiones** | Tipo de entrada «Excursión» con campos personalizados (ACF o los del maquetador) y una plantilla de tarjeta en bucle; el detalle se abre en un popup del maquetador o en la página de cada excursión. El botón de consulta enlaza a `#contacto?excursion=slug`. |
| **Galería con lightbox** | Bloque Galería en mosaico con lightbox nativo de WordPress (6.4+) o el de la plantilla; en móvil, carrusel. |
| **Información práctica** | Bloque Detalles / acordeón; opcionalmente bloque FAQ de Yoast/Rank Math para el schema de preguntas frecuentes. |
| **Opiniones** | Bloque de testimonios de la plantilla, o reseñas reales de Google con un plugin (cargado tras el consentimiento). |
| **Formulario** | **Contact Form 7** o **WPForms Lite** con los mismos campos (fecha, personas, excursión de interés), casilla obligatoria de privacidad y envío fiable con **WP Mail SMTP**. Antispam con honeypot o Turnstile. |
| **Botón de WhatsApp** | Botón flotante con un plugin ligero (tipo «Click to Chat») o un botón fijo del maquetador con enlace `wa.me` y mensaje precargado; botones en el hero y en cada excursión. |
| **Mapa y vídeo** | Bloques de Google Maps y YouTube gestionados por el plugin de cookies, que los sustituye por un placeholder hasta el consentimiento. |
| **Footer** | Pie de la plantilla con widgets de contacto, iconos sociales, menú legal y enlace «Configurar cookies». |
| **Páginas legales** | Páginas de WordPress con plantilla sin barra lateral y los textos facilitados por la clienta. |
| **Banner de cookies** | **Complianz** o **CookieYes** con bloqueo previo activado, botones Aceptar / Rechazar / Configurar con el mismo peso y categorías necesarias, analíticas y marketing. |
| **SEO** | **Yoast SEO** o **Rank Math**: título y metadescripción por página, Open Graph con foto destacada, sitemap, schema `LocalBusiness` y, si se crea el tipo «Excursión», `TouristTrip`. |
| **Optimización de imágenes** | Conversión a WebP y redimensionado al subir (Converter for Media o EWWW), `loading="lazy"`, dimensiones fijas y tamaños adecuados para la galería. |
| **Rendimiento** | Plugin de caché (LiteSpeed Cache o WP Super Cache), carga diferida de JS y del vídeo, fuentes locales. Objetivo Lighthouse 90+ en móvil. |
| **Copias de seguridad** | **UpdraftPlus** con copias automáticas y almacenamiento externo. |
| **Seguridad básica** | Wordfence o Solid Security, limitación de intentos de acceso, contraseñas seguras y 2FA, actualizaciones al día y SSL forzado. |
