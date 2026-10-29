import type { ImgHTMLAttributes } from "react";
import type { Photo } from "../content";

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height" | "alt"> {
  photo: Photo;
  /** Prioridad alta: solo la imagen del hero */
  priority?: boolean;
  /** Calidad de compresión de Unsplash (0–100) */
  quality?: number;
}

// 750 cubre los móviles más comunes (≈ 400 px × 1,75–2 de densidad) sin descargar de más
const WIDTHS = [480, 750, 1080, 1440, 2000];

/**
 * Imagen responsive: Unsplash entrega AVIF/WebP (auto=format) al ancho justo vía srcset.
 * width/height reservan el espacio y evitan saltos de diseño (CLS).
 */
export function Img({ photo, priority, quality = 60, sizes = "100vw", className = "", ...rest }: Props) {
  const { src, alt, width, height } = photo;
  const url = (w: number) => `${src}?auto=format&fit=crop&w=${w}&h=${Math.round((w * height) / width)}&q=${quality}`;
  const widths = WIDTHS.filter((w) => w <= Math.max(width, 480));
  return (
    <img
      src={url(Math.min(width, 960))}
      srcSet={widths.map((w) => `${url(w)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={className}
      {...rest}
    />
  );
}
