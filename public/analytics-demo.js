// Script de analítica de EJEMPLO. Solo se descarga y ejecuta si se aceptan las cookies analíticas.
// En producción aquí iría Google Analytics 4, Matomo, Plausible, etc.
(function () {
  window.__analyticsDemo = { loadedAt: new Date().toISOString() };
  console.info("[analítica demo] Script cargado tras el consentimiento:", window.__analyticsDemo.loadedAt);
})();
