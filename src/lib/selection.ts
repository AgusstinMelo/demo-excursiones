// Excursión preseleccionada en el formulario al pulsar «Consultar disponibilidad» en el detalle de una excursión.
import { useSyncExternalStore } from "react";

let selected = "";
const listeners = new Set<() => void>();

export function selectService(slug: string) {
  selected = slug;
  listeners.forEach((l) => l());
}

export const useSelectedService = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => selected,
    () => "",
  );
