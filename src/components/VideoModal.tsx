// Vídeo de YouTube en un modal. El iframe no se inserta hasta aceptar «Marketing y terceros»:
// antes se muestra la foto del hero como póster (sin peticiones a YouTube) y un botón de aceptación.
import { X } from "lucide-react";
import { cookies, hero } from "../content";
import { allow, openCookieSettings, useConsent } from "../lib/consent";
import { Dialog } from "./Dialog";
import { Img } from "./Img";

export function VideoModal({ video, onClose }: { video: { youtubeId: string; title: string }; onClose: () => void }) {
  const consent = useConsent();
  return (
    <Dialog onClose={onClose} label={video.title} className="relative w-full max-w-5xl outline-none" overlayClassName="!items-center p-3 sm:p-6">
      <button
        type="button"
        onClick={onClose}
        data-autofocus
        aria-label="Cerrar vídeo"
        className="absolute -top-14 right-0 grid size-11 place-items-center rounded-full bg-white text-ink"
      >
        <X aria-hidden />
      </button>
      <div className="relative aspect-video overflow-hidden rounded-md bg-ink">
        {consent?.marketing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            <Img photo={hero.image} sizes="(min-width: 1024px) 1024px, 100vw" className="absolute inset-0 size-full object-cover opacity-40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-white">
              <p className="max-w-md text-[0.95rem] sm:text-lg">{cookies.video.blocked}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button type="button" className="btn btn-accent" onClick={() => allow("marketing")}>
                  {cookies.video.accept}
                </button>
                <button type="button" className="btn btn-glass" onClick={openCookieSettings}>
                  Configurar cookies
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
