// Todo lo que va bajo el hero, en un chunk aparte: el primer pintado solo necesita cabecera + hero.
import { useEffect } from "react";
import { scrollToId } from "../lib/router";
import { About } from "./About";
import { Contact } from "./Contact";
import { Gallery } from "./Gallery";
import { Practical } from "./Practical";
import { Testimonials } from "./Testimonials";
import { Trips } from "./Trips";

export default function BelowFold() {
  // Enlace directo con ancla (/#contacto): se desplaza cuando las secciones ya existen
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && id !== "inicio") requestAnimationFrame(() => scrollToId(id, true));
  }, []);

  return (
    <>
      <About />
      <Trips />
      <Gallery />
      <Practical />
      <Testimonials />
      <Contact />
    </>
  );
}
