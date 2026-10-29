import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Fuentes web tras el primer pintado (ver index.html): evita el texto invisible mientras descargan
requestAnimationFrame(() =>
  setTimeout(() => {
    const href = document.querySelector<HTMLMetaElement>('meta[name="fonts-href"]')?.content;
    if (!href) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.append(link);
  }),
);
