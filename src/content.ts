// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO DE LA WEB
// Todos los textos, excursiones, información práctica, datos de contacto,
// número de WhatsApp y metadatos SEO están aquí. Son textos de EJEMPLO.
// ─────────────────────────────────────────────────────────────────────────────

const U = (id: string) => `https://images.unsplash.com/photo-${id}`;

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// ── Datos generales y SEO ────────────────────────────────────────────────────
export const site = {
  name: "Senderos con Laura",
  /** Dominio definitivo (canonical, Open Graph, sitemap) */
  url: "https://senderos-con-laura.vercel.app",
  /** Título SEO de la página de inicio (≈ 60 caracteres) */
  title: "Senderos con Laura · Excursiones guiadas en Andalucía",
  /** Metadescripción (≈ 155 caracteres) */
  description:
    "Excursiones guiadas en grupos reducidos por Andalucía: montaña, costa, patrimonio y gastronomía. Rutas propias y trato cercano. Consulta disponibilidad.",
  email: "hola@senderosconlaura.es",
  phone: "+34 600 000 000",
  phoneHref: "tel:+34600000000",
  /** Número de WhatsApp en formato internacional, sin + ni espacios */
  whatsapp: "34600000000",
  /** Mensaje por defecto del botón flotante */
  whatsappDefault: "¡Hola, Laura! Me gustaría información sobre vuestras excursiones.",
  whatsappTooltip: "¿Hablamos por WhatsApp?",
  address: {
    locality: "Ronda",
    region: "Málaga",
    postalCode: "29400",
    country: "ES",
  },
  geo: { lat: 36.7423, lng: -5.1671 },
  /** Consulta para el mapa de Google (zona de actividad) */
  mapQuery: "Serranía de Ronda, Málaga",
  areaServed: "Andalucía",
  socials: [
    { label: "Instagram", icon: "instagram" as const, href: "https://www.instagram.com/" },
    { label: "Facebook", icon: "facebook" as const, href: "https://www.facebook.com/" },
  ],
  /** Licencia o registro de turismo activo (Andalucía) */
  license: "Registro de Turismo de Andalucía: AT/MA/00000 (ejemplo)",
  demoNotice: "Demo de propuesta — contenido de ejemplo",
};

// ── Menú (anclas) ────────────────────────────────────────────────────────────
export const nav = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "excursiones", label: "Excursiones" },
  { id: "galeria", label: "Galería" },
  { id: "info", label: "Info práctica" },
  { id: "opiniones", label: "Opiniones" },
  { id: "contacto", label: "Contacto" },
];
export const ctaLabel = "Consulta disponibilidad";

// ── 1. Presentación ──────────────────────────────────────────────────────────
export const hero = {
  eyebrow: "Excursiones guiadas en grupos reducidos",
  /** El titular se anima palabra a palabra; las palabras entre * van en cursiva */
  title: "Descubre Andalucía *paso a paso*",
  subtitle:
    "Rutas de montaña, calas escondidas, pueblos blancos y sabores de siempre. Te llevo por los rincones que conozco desde niña, sin prisas y en buena compañía.",
  primaryCta: "Ver excursiones",
  whatsappCta: "Escríbeme por WhatsApp",
  whatsappMessage: "¡Hola, Laura! He visto tu web y me gustaría saber qué excursiones tienes disponibles.",
  image: {
    src: U("1501555088652-021faa106b9b"),
    alt: "Senderista con mochila amarilla caminando por un valle verde entre montañas",
    width: 2000,
    height: 1333,
  } satisfies Photo,
  /**
   * Vídeo opcional (YouTube): se abre en un modal y no se carga hasta aceptar las
   * cookies de «Marketing y terceros». Pon `video: null` para ocultar el botón.
   */
  video: { youtubeId: "LXb3EKWsInQ", label: "Ver vídeo", title: "Vídeo de paisajes naturales (ejemplo)" } as { youtubeId: string; label: string; title: string } | null,
  /**
   * Vídeo de fondo opcional (MP4 propio, sin sonido). Usa la foto del hero como póster y NO se carga
   * con ahorro de datos, conexiones lentas (2G/3G) o movimiento reducido. Ej.: "/video/hero.mp4".
   */
  backgroundVideo: null as string | null,
  stats: [
    { value: "+12", label: "años guiando" },
    { value: "máx. 12", label: "personas por grupo" },
    { value: "4,9/5", label: "valoración media (ejemplo)" },
  ],
};

/** Cinta animada con destinos */
export const destinations = ["Serranía de Ronda", "Sierra de Grazalema", "Costa de Maro", "Sierra Nevada", "Sevilla", "Pueblos blancos", "Caminito del Rey", "Cabo de Gata"];

// ── 2. Sobre la profesional ──────────────────────────────────────────────────
export const about = {
  eyebrow: "Sobre mí",
  title: "Hola, soy Laura. Guía, montañera y enamorada de mi tierra.",
  paragraphs: [
    "Crecí en Ronda, entre sierras y pueblos blancos, y desde hace más de doce años comparto esos caminos con personas de todo el mundo. Diseño cada ruta yo misma, la recorro antes en cada estación y la adapto al grupo.",
    "Mi forma de guiar es sencilla: grupos pequeños, ritmo tranquilo y muchas historias por el camino. Quiero que vuelvas a casa con buenas fotos, sí, pero sobre todo con la sensación de haber conocido el lugar de verdad.",
  ],
  credentials: [
    "Técnica Deportiva en Media Montaña",
    "Guía de Turismo de Andalucía",
    "Primeros auxilios en zonas remotas (WFR)",
    "Inglés y francés",
  ],
  differentials: [
    { icon: "users" as const, title: "Grupos reducidos", text: "Nunca más de 12 personas, para disfrutar del camino y del silencio." },
    { icon: "map" as const, title: "Rutas propias", text: "Itinerarios diseñados y probados por mí, lejos de las rutas masificadas." },
    { icon: "heart" as const, title: "Trato cercano", text: "Te asesoro antes, te acompaño durante y te escucho después." },
  ],
  image: {
    src: U("1508214751196-bcfd4ca60f91"),
    alt: "Laura, guía de excursiones, sonriendo al aire libre al atardecer",
    width: 1000,
    height: 1250,
  } satisfies Photo,
  secondaryImage: {
    src: U("1539635278303-d4002c07eae3"),
    alt: "Grupo pequeño de senderistas riendo durante una pausa en la montaña",
    width: 900,
    height: 675,
  } satisfies Photo,
};

// ── 3. Excursiones ───────────────────────────────────────────────────────────
export type Difficulty = 1 | 2 | 3;
export const difficultyLabels: Record<Difficulty, string> = { 1: "Fácil", 2: "Moderada", 3: "Exigente" };

export interface Trip {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  image: Photo;
  duration: string;
  /** Duración en formato ISO 8601 para el JSON-LD */
  durationIso: string;
  distance: string;
  difficulty: Difficulty;
  meetingPoint: string;
  priceFrom: number;
  groupSize: string;
  itinerary: { time: string; text: string }[];
  includes: string[];
  bring: string[];
  gallery: Photo[];
}

const img = (id: string, alt: string, width = 1200, height = 900): Photo => ({ src: U(id), alt, width, height });

export const trips = {
  eyebrow: "Excursiones",
  title: "Elige tu próxima aventura",
  intro: "Salidas de medio día o día completo, con fechas regulares y también en privado. Precios orientativos por persona.",
  consultLabel: "Ver detalles",
  fromLabel: "desde",
  items: [
    {
      slug: "cumbres-sierra-nevada",
      title: "Cumbres de Sierra Nevada",
      category: "Montaña",
      summary: "Una travesía entre lagunas glaciares y vistas que llegan hasta el mar.",
      description:
        "Subimos por el barranco del Poqueira hasta las lagunas de alta montaña, con paradas para recuperar el aliento y descubrir la flora única de la sierra. Una jornada exigente que recompensa cada paso.",
      image: img("1551632811-561732d1e306", "Dos senderistas con mochila en un sendero de montaña con cumbres nevadas al fondo", 1600, 1067),
      duration: "Día completo (7 h)",
      durationIso: "PT7H",
      distance: "14 km · +850 m",
      difficulty: 3,
      meetingPoint: "Capileira (Granada)",
      priceFrom: 55,
      groupSize: "4–10 personas",
      itinerary: [
        { time: "08:30", text: "Encuentro en Capileira y presentación de la ruta" },
        { time: "09:00", text: "Ascenso por el barranco del Poqueira" },
        { time: "12:30", text: "Picnic junto a la laguna" },
        { time: "14:00", text: "Descenso por la vereda de la Estrella" },
        { time: "16:00", text: "Regreso y despedida con algo fresquito" },
      ],
      includes: ["Guía titulada en media montaña", "Seguro de responsabilidad civil y accidentes", "Bastones si los necesitas", "Fotos de la jornada"],
      bring: ["Botas de montaña ya usadas", "Agua (mínimo 2 litros)", "Comida tipo picnic", "Capa cortavientos y gorra", "Protección solar"],
      gallery: [
        img("1464822759023-fed622ff2c3b", "Valle verde con montañas nevadas y cielo azul"),
        img("1506905925346-21bda4d32df4", "Mar de nubes a los pies de las cumbres al amanecer"),
        img("1520962922320-2038eebab146", "Bosque de coníferas frente a montañas nevadas"),
      ],
    },
    {
      slug: "calas-acantilados-maro",
      title: "Calas y acantilados de Maro",
      category: "Costa",
      summary: "Senderos sobre el Mediterráneo con baño en calas de agua turquesa.",
      description:
        "Recorremos el paraje natural de los acantilados de Maro-Cerro Gordo por senderos panorámicos, bajamos a dos calas escondidas para darnos un baño y terminamos con vistas de las torres vigía.",
      image: img("1510414842594-a61c69b5ae57", "Cala de agua turquesa rodeada de acantilados y pinos", 1600, 1067),
      duration: "Medio día (4 h)",
      durationIso: "PT4H",
      distance: "8 km · +250 m",
      difficulty: 2,
      meetingPoint: "Maro, Nerja (Málaga)",
      priceFrom: 35,
      groupSize: "4–12 personas",
      itinerary: [
        { time: "09:30", text: "Encuentro en la plaza de Maro" },
        { time: "10:00", text: "Sendero de los acantilados y torre de Maro" },
        { time: "11:30", text: "Baño en una cala escondida" },
        { time: "13:30", text: "Regreso por el camino de la costa" },
      ],
      includes: ["Guía titulada", "Seguro de responsabilidad civil y accidentes", "Fruta y agua de temporada"],
      bring: ["Calzado con buena suela", "Bañador y toalla pequeña", "Agua", "Protección solar"],
      gallery: [
        img("1507525428034-b723cf961d3e", "Orilla de playa con agua cristalina al atardecer"),
        img("1505142468610-359e7d316be0", "Vista aérea de olas rompiendo en la costa"),
        img("1559827260-dc66d52bef19", "Ola del mar al atardecer con nubes rosadas"),
      ],
    },
    {
      slug: "sevilla-monumental",
      title: "Sevilla monumental a pie",
      category: "Patrimonio",
      summary: "Catedral, Giralda y barrio de Santa Cruz contados como nunca te los han contado.",
      description:
        "Un paseo tranquilo por el corazón de Sevilla para entender su historia a través de sus patios, plazas y leyendas. Terminamos en un mirador al atardecer.",
      image: img("1509840841025-9088ba78a826", "Vista de Sevilla con la Giralda y la catedral al atardecer", 1600, 1067),
      duration: "3 h",
      durationIso: "PT3H",
      distance: "4 km · llano",
      difficulty: 1,
      meetingPoint: "Plaza Virgen de los Reyes, Sevilla",
      priceFrom: 25,
      groupSize: "2–12 personas",
      itinerary: [
        { time: "17:00", text: "Encuentro junto a la Giralda" },
        { time: "17:30", text: "Barrio de Santa Cruz y sus leyendas" },
        { time: "18:30", text: "Plaza de España y parque de María Luisa" },
        { time: "19:45", text: "Mirador al atardecer" },
      ],
      includes: ["Guía oficial de turismo", "Auriculares para grupos de más de 8 personas"],
      bring: ["Calzado cómodo", "Agua", "Gorra en verano"],
      gallery: [
        img("1527631746610-bca00a040d60", "Viajera con mochila paseando por una calle estrecha del casco antiguo"),
        img("1533105079780-92b9be482077", "Escalera encalada de un pueblo blanco con vistas al mar"),
        img("1539037116277-4db20889f2d4", "Tejados y avenidas de la ciudad al atardecer"),
      ],
    },
    {
      slug: "ruta-de-sabores",
      title: "Ruta de tapas y sabores",
      category: "Gastronomía",
      summary: "Mercado, bodega y cuatro tabernas de toda la vida. Llegas con hambre, te vas con historias.",
      description:
        "Visitamos el mercado de abastos, probamos productos locales con quienes los elaboran y recorremos tabernas tradicionales con maridaje de vinos de la tierra.",
      image: img("1528605248644-14dd04022da1", "Grupo de amigos compartiendo comida y bebida en una mesa de taberna", 1600, 1067),
      duration: "3,5 h",
      durationIso: "PT3H30M",
      distance: "2 km · llano",
      difficulty: 1,
      meetingPoint: "Mercado de Ronda (Málaga)",
      priceFrom: 59,
      groupSize: "4–10 personas",
      itinerary: [
        { time: "12:00", text: "Mercado y productores locales" },
        { time: "13:00", text: "Visita a una bodega familiar" },
        { time: "14:00", text: "Ruta por cuatro tabernas tradicionales" },
        { time: "15:30", text: "Postre casero y despedida" },
      ],
      includes: ["Guía local", "8 degustaciones y 3 vinos (o bebida sin alcohol)", "Visita a bodega"],
      bring: ["Hambre", "Avísame de alergias o intolerancias al reservar"],
      gallery: [
        img("1515669097368-22e68427d265", "Mesa con tapas variadas y platos para compartir"),
        img("1534080564583-6be75777b70a", "Paella de marisco en una sartén sobre mesa oscura"),
        img("1414235077428-338989a2e8c0", "Plato elaborado servido en una mesa de restaurante"),
      ],
    },
    {
      slug: "bosque-pinsapar",
      title: "El bosque del pinsapar",
      category: "Naturaleza",
      summary: "Un bosque relicto, único en Europa, en el corazón de la Sierra de Grazalema.",
      description:
        "Caminamos entre pinsapos centenarios por uno de los bosques más singulares de la península. Ruta con permiso de acceso que gestiono yo, con paradas para interpretar la flora y la fauna.",
      image: img("1441974231531-c6227db76b6e", "Sendero entre árboles altos en un bosque con luz suave", 1600, 1067),
      duration: "5 h",
      durationIso: "PT5H",
      distance: "11 km · +500 m",
      difficulty: 2,
      meetingPoint: "Grazalema (Cádiz)",
      priceFrom: 39,
      groupSize: "4–12 personas",
      itinerary: [
        { time: "09:00", text: "Encuentro en Grazalema" },
        { time: "09:30", text: "Subida al puerto de las Palomas" },
        { time: "11:30", text: "Bosque de pinsapos y almuerzo" },
        { time: "14:00", text: "Descenso a Benamahoma" },
      ],
      includes: ["Guía titulada", "Permiso de acceso al pinsapar", "Seguro", "Traslado de vuelta al punto de inicio"],
      bring: ["Botas de montaña", "Agua (1,5 litros)", "Almuerzo", "Ropa de abrigo según la estación"],
      gallery: [
        img("1473625247510-8ceb1760943f", "Viajero contemplando un paisaje al atardecer desde un arco"),
        img("1500534314209-a25ddb2bd429", "Capas de colinas azuladas al amanecer"),
        img("1445307806294-bff7f67ff225", "Persona descansando en una hamaca frente a un valle"),
      ],
    },
    {
      slug: "noche-de-estrellas",
      title: "Noche de estrellas",
      category: "Experiencia",
      summary: "Paseo al atardecer y observación del cielo en uno de los lugares más oscuros de Andalucía.",
      description:
        "Caminamos hasta un mirador para ver la puesta de sol y, cuando cae la noche, aprendemos a reconocer constelaciones con un telescopio y mucha calma.",
      image: img("1517824806704-9040b037703b", "Tienda de campaña iluminada bajo la Vía Láctea", 1600, 1067),
      duration: "3 h",
      durationIso: "PT3H",
      distance: "3 km · +100 m",
      difficulty: 1,
      meetingPoint: "Mirador del Tajo, Ronda (Málaga)",
      priceFrom: 32,
      groupSize: "2–12 personas",
      itinerary: [
        { time: "Atardecer", text: "Paseo hasta el mirador" },
        { time: "+1 h", text: "Puesta de sol con picnic ligero" },
        { time: "+1,5 h", text: "Observación con telescopio y mitos de las constelaciones" },
      ],
      includes: ["Guía", "Telescopio y punteros", "Picnic ligero y bebida caliente", "Linternas frontales"],
      bring: ["Ropa de abrigo (refresca de noche)", "Calzado cómodo", "Ganas de mirar arriba"],
      gallery: [
        img("1504280390367-361c6d9f38f4", "Vista del bosque desde el interior de una tienda de campaña"),
        img("1476514525535-07fb3b4ae5f1", "Barca de madera en un lago de montaña"),
        img("1501785888041-af3ef285b470", "Lago turquesa entre montañas con una barca"),
      ],
    },
  ] satisfies Trip[],
  modal: {
    itinerary: "Itinerario",
    includes: "Qué incluye",
    bring: "Qué llevar",
    gallery: "Galería",
    close: "Cerrar",
    book: "Consultar disponibilidad",
    whatsapp: "Preguntar por WhatsApp",
    whatsappMessage: (title: string) => `¡Hola, Laura! Me interesa la excursión «${title}». ¿Qué fechas tienes disponibles?`,
  },
  labels: { duration: "Duración", difficulty: "Dificultad", meetingPoint: "Punto de encuentro", group: "Grupo", distance: "Distancia" },
};

// ── 4. Galería (bento grid) ──────────────────────────────────────────────────
// `span` define el tamaño en la rejilla de escritorio: "wide", "tall", "big" o normal.
export const gallery = {
  eyebrow: "Galería",
  title: "Momentos del camino",
  intro: "Algunas fotos de nuestras salidas. Pulsa en cualquiera para verla en grande.",
  items: [
    { ...img("1539635278303-d4002c07eae3", "Grupo de senderistas sonriendo en una pausa entre montañas rocosas", 1200, 1200), span: "big" },
    { ...img("1507525428034-b723cf961d3e", "Playa de arena fina y agua transparente al atardecer", 1200, 900), span: "" },
    { ...img("1533105079780-92b9be482077", "Escalera blanca de un pueblo encalado con vistas al mar azul", 900, 1200), span: "tall" },
    { ...img("1500534314209-a25ddb2bd429", "Colinas en capas envueltas en bruma al amanecer", 1200, 900), span: "" },
    { ...img("1515669097368-22e68427d265", "Mesa con tapas y platos para compartir", 1600, 900), span: "wide" },
    { ...img("1445307806294-bff7f67ff225", "Descanso en hamaca frente a un valle verde con lago", 1600, 900), span: "wide" },
    { ...img("1527631746610-bca00a040d60", "Paseo por una calle estrecha del casco antiguo", 900, 1200), span: "" },
    { ...img("1505142468610-359e7d316be0", "Olas del mar vistas desde el aire", 1600, 900), span: "wide" },
    { ...img("1534080564583-6be75777b70a", "Paella de marisco recién hecha en la sartén", 1200, 900), span: "" },
  ] as (Photo & { span: "" | "wide" | "tall" | "big" })[],
};

// ── 5. Información práctica ──────────────────────────────────────────────────
export const practical = {
  eyebrow: "Información práctica",
  title: "Todo lo que necesitas saber",
  intro: "Si te queda alguna duda, escríbeme y te respondo personalmente.",
  items: [
    {
      icon: "pin" as const,
      title: "Punto de encuentro",
      text: "Cada excursión tiene su punto de encuentro, indicado en la ficha. Al confirmar te envío la ubicación exacta en Google Maps y el teléfono de contacto del día.",
    },
    {
      icon: "backpack" as const,
      title: "Qué llevar",
      text: "Calzado cómodo y adecuado a la ruta, agua, protección solar y ropa por capas. En cada ficha encontrarás una lista concreta. Si te falta algo, pregúntame: tengo bastones y frontales de préstamo.",
    },
    {
      icon: "gauge" as const,
      title: "Nivel físico",
      text: "Fácil: apta para casi todo el mundo. Moderada: requiere caminar 4–5 horas con algún desnivel. Exigente: buena forma física y experiencia en montaña. Si dudas, te ayudo a elegir.",
    },
    {
      icon: "cloud" as const,
      title: "Cancelación por meteorología",
      text: "Si el tiempo no acompaña o hay alerta, cancelo la salida y te ofrezco otra fecha o la devolución íntegra. Tú puedes cancelar gratis hasta 48 horas antes.",
    },
    {
      icon: "languages" as const,
      title: "Idiomas",
      text: "Las excursiones se realizan en español, inglés o francés. Indícalo al consultar disponibilidad.",
    },
    {
      icon: "users" as const,
      title: "Grupos privados",
      text: "Organizo salidas privadas para familias, grupos de amigos, colegios y empresas, con fecha y ritmo a medida.",
    },
    {
      icon: "accessibility" as const,
      title: "Accesibilidad",
      text: "Las rutas de patrimonio y gastronomía son llanas y adaptables. Cuéntame tus necesidades y buscaremos la mejor opción.",
    },
  ],
};

// ── 6. Opiniones ─────────────────────────────────────────────────────────────
export const testimonials = {
  eyebrow: "Opiniones",
  title: "Lo que cuentan quienes ya han caminado conmigo",
  sampleLabel: "Opinión de ejemplo",
  items: [
    { name: "Marta G.", origin: "Madrid", trip: "Calas y acantilados de Maro", text: "Laura conoce cada rincón y cada historia. Grupo pequeño, ritmo perfecto y unas calas que jamás habríamos encontrado solos." },
    { name: "Jordi y Anna", origin: "Barcelona", trip: "El bosque del pinsapar", text: "Fuimos con nuestros hijos de 10 y 12 años y lo disfrutaron muchísimo. Se nota que adapta la ruta a cada grupo." },
    { name: "Claire D.", origin: "Lyon", trip: "Sevilla monumental a pie", text: "Une visite pleine d'émotion. Laura habla francés perfectamente y nos hizo sentir como en casa." },
    { name: "Javier R.", origin: "Málaga", trip: "Ruta de tapas y sabores", text: "Pensaba que conocía Ronda, pero descubrí sitios nuevos y gente encantadora. Repetiremos con la ruta de estrellas." },
  ],
};

// ── 7. Contacto y disponibilidad ─────────────────────────────────────────────
export const contact = {
  eyebrow: "Contacto y disponibilidad",
  title: "¿Te vienes de excursión?",
  intro: "Cuéntame qué excursión te interesa, cuándo y con cuántas personas. Te respondo en menos de 24 horas con la disponibilidad.",
  form: {
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono",
    phoneHint: "Opcional",
    trip: "Excursión de interés",
    tripPlaceholder: "Selecciona una excursión",
    tripOther: "Grupo privado / otra",
    date: "Fecha deseada",
    dateHint: "Aproximada",
    people: "Personas",
    message: "Mensaje",
    messagePlaceholder: "Edades, nivel, idioma, dudas…",
    privacy: "He leído y acepto la",
    privacyLink: "política de privacidad",
    submit: "Consultar disponibilidad",
    sending: "Enviando…",
    whatsapp: "Enviar por WhatsApp",
    whatsappHint: "Abre WhatsApp con los datos que hayas rellenado.",
    successTitle: "¡Gracias! Ya tengo tu consulta.",
    successText: "Te respondo en menos de 24 horas con la disponibilidad. (Envío simulado: esta demo no envía datos.)",
    successReset: "Enviar otra consulta",
    legalNote:
      "Responsable: Laura [Apellidos]. Finalidad: responder a tu consulta de disponibilidad. Legitimación: tu consentimiento. No se cederán datos a terceros salvo obligación legal. Puedes ejercer tus derechos como se indica en la política de privacidad.",
  },
  errors: {
    name: "Escribe tu nombre.",
    email: "Escribe un correo válido, por ejemplo nombre@correo.es.",
    phone: "Escribe un teléfono válido (solo números, espacios y +).",
    trip: "Selecciona la excursión que te interesa.",
    date: "Elige una fecha a partir de hoy.",
    people: "Indica cuántas personas seréis.",
    privacy: "Debes aceptar la política de privacidad para enviar la consulta.",
    summary: "Revisa los campos marcados para poder enviar la consulta.",
  },
  direct: {
    title: "¿Prefieres escribirme directamente?",
    whatsapp: "WhatsApp",
    email: "Correo",
    phone: "Teléfono",
    zone: "Zona",
  },
  map: {
    title: "Mapa de la zona de actividad",
    blocked: "El mapa lo proporciona Google y utiliza cookies de terceros.",
    accept: "Aceptar cookies para ver el mapa",
    open: "Abrir en Google Maps",
  },
};

// ── 8. Pie de página ─────────────────────────────────────────────────────────
export const footer = {
  tagline: "Excursiones guiadas en grupos reducidos por montaña, costa, patrimonio y gastronomía de Andalucía.",
  cookieSettings: "Configurar cookies",
  copyright: `© ${new Date().getFullYear()} Senderos con Laura`,
};

// ── Cookies ──────────────────────────────────────────────────────────────────
export const cookies = {
  title: "¿Te parece bien?",
  text: "Uso cookies propias necesarias para que la web funcione y, solo si lo aceptas, cookies de análisis y de terceros (mapa de Google y vídeos de YouTube). Puedes aceptarlas, rechazarlas o elegir cuáles permites.",
  more: "Más información en la",
  moreLink: "política de cookies",
  accept: "Aceptar",
  reject: "Rechazar",
  configure: "Configurar",
  save: "Guardar preferencias",
  panelTitle: "Configuración de cookies",
  panelText: "Elige qué categorías permites. Puedes cambiar tu decisión en cualquier momento desde «Configurar cookies» en el pie de página.",
  alwaysOn: "Siempre activas",
  categories: [
    { id: "necessary" as const, title: "Necesarias", text: "Imprescindibles para que la web funcione, por ejemplo para recordar tus preferencias de cookies. No se pueden desactivar." },
    { id: "analytics" as const, title: "Analíticas", text: "Me ayudan a saber de forma anónima cuántas personas visitan la web y qué excursiones interesan más." },
    { id: "marketing" as const, title: "Marketing y terceros", text: "Servicios externos que pueden usar sus propias cookies: el mapa de Google Maps y los vídeos de YouTube." },
  ],
  video: {
    blocked: "Este vídeo se reproduce desde YouTube, que utiliza cookies de terceros.",
    accept: "Aceptar cookies para ver el vídeo",
  },
};

// ── Páginas legales ──────────────────────────────────────────────────────────
export type LegalSlug = "aviso-legal" | "privacidad" | "cookies";

export const legalPlaceholder =
  "Esta plantilla muestra la estructura y la maquetación; el contenido legal definitivo debe proporcionarlo la clienta o su asesoría.";

const titular = `${site.name} · Titular: Laura [Apellidos] · NIF: 00000000X · ${site.address.locality} (${site.address.region}) · ${site.email}`;

export const legalPages: Record<
  LegalSlug,
  { title: string; seoTitle: string; description: string; updated: string; sections: { heading: string; body: string[] }[] }
> = {
  "aviso-legal": {
    title: "Aviso legal",
    seoTitle: "Aviso legal · Senderos con Laura",
    description: "Aviso legal e información sobre la titular del sitio web Senderos con Laura.",
    updated: "Última actualización: [fecha]",
    sections: [
      {
        heading: "1. Datos identificativos",
        body: ["En cumplimiento del artículo 10 de la Ley 34/2002 (LSSI-CE), se facilitan los datos de la titular del sitio web:", titular, site.license],
      },
      { heading: "2. Objeto y condiciones de uso", body: ["[Texto a sustituir por el facilitado] Descripción del objeto del sitio web y condiciones de uso."] },
      { heading: "3. Contratación de excursiones", body: ["[Texto a sustituir por el facilitado] Condiciones generales de las actividades, precios, pagos, cancelaciones y seguros."] },
      { heading: "4. Propiedad intelectual", body: ["[Texto a sustituir por el facilitado] Titularidad de textos, fotografías y logotipos."] },
      { heading: "5. Legislación aplicable", body: ["[Texto a sustituir por el facilitado] Ley aplicable y jurisdicción."] },
    ],
  },
  privacidad: {
    title: "Política de privacidad",
    seoTitle: "Política de privacidad · Senderos con Laura",
    description: "Cómo trata Senderos con Laura los datos personales de quienes consultan disponibilidad.",
    updated: "Última actualización: [fecha]",
    sections: [
      { heading: "1. Responsable del tratamiento", body: [titular] },
      { heading: "2. Finalidades", body: ["[Texto a sustituir por el facilitado] Responder a consultas de disponibilidad y gestionar las reservas de excursiones."] },
      { heading: "3. Legitimación", body: ["[Texto a sustituir por el facilitado] Consentimiento y, en su caso, ejecución del contrato de la actividad."] },
      { heading: "4. Conservación", body: ["[Texto a sustituir por el facilitado] Plazos de conservación de los datos."] },
      { heading: "5. Destinatarios", body: ["[Texto a sustituir por el facilitado] Aseguradora de la actividad, proveedores de alojamiento web y correo. WhatsApp (Meta) si eliges ese canal."] },
      { heading: "6. Derechos", body: [`[Texto a sustituir por el facilitado] Acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${site.email}. Reclamación ante la AEPD (www.aepd.es).`] },
    ],
  },
  cookies: {
    title: "Política de cookies",
    seoTitle: "Política de cookies · Senderos con Laura",
    description: "Qué cookies utiliza la web Senderos con Laura y cómo configurarlas.",
    updated: "Última actualización: [fecha]",
    sections: [
      { heading: "1. ¿Qué son las cookies?", body: ["[Texto a sustituir por el facilitado] Definición según el artículo 22.2 de la LSSI-CE."] },
      {
        heading: "2. Cookies que utiliza esta web",
        body: [
          "Necesarias: preferencias de consentimiento (localStorage «sl-consent»). Duración: 12 meses.",
          "Analíticas (solo con consentimiento): [herramienta, cookies y duración].",
          "Marketing y terceros (solo con consentimiento): Google Maps (mapa de la zona) y YouTube (vídeo de presentación).",
        ],
      },
      { heading: "3. Cómo cambiar tu consentimiento", body: ["Desde «Configurar cookies» en el pie de página, o borrando las cookies en tu navegador."] },
      { heading: "4. Transferencias internacionales", body: ["[Texto a sustituir por el facilitado] Proveedores de terceros y garantías."] },
    ],
  },
};
