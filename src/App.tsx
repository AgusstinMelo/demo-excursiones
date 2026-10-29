import { LazyMotion, MotionConfig } from "motion/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { CookieBanner } from "./components/CookieBanner";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { legalSlug, scrollToId, usePath } from "./lib/router";
import { LegalPage } from "./pages/Legal";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";

// Secciones bajo el hero y pie: se cargan aparte para acelerar el primer pintado en móvil
const BelowFold = lazy(() => import("./sections/BelowFold"));
const Footer = lazy(() => import("./sections/Footer").then((m) => ({ default: m.Footer })));

const loadFeatures = () => import("./lib/motionFeatures").then((r) => r.default);

export default function App() {
  const path = usePath();
  const legal = legalSlug(path);
  // Lo que va bajo el hero se monta después del primer pintado: el hero aparece antes en móvil
  const [afterPaint, setAfterPaint] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setTimeout(() => setAfterPaint(true)));
  }, []);

  // Enlace directo con ancla en páginas legales o al #inicio (el resto lo resuelve BelowFold al cargar)
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id === "inicio") requestAnimationFrame(() => scrollToId(id, true));
  }, []);

  return (
    // reducedMotion="user": Motion respeta prefers-reduced-motion en todas las animaciones
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <Header isHome={!legal} />
        <main id="main">
          {legal ? (
            <LegalPage slug={legal} />
          ) : (
            <>
              <Hero />
              {afterPaint ? (
                <Suspense fallback={<div className="min-h-screen" />}>
                  <BelowFold />
                </Suspense>
              ) : (
                <div className="min-h-screen" />
              )}
            </>
          )}
        </main>
        {afterPaint && (
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        )}
        <WhatsAppFloat />
        <CookieBanner />
      </LazyMotion>
    </MotionConfig>
  );
}
