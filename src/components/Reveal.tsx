// Revelado suave al hacer scroll. Solo anima opacity y transform; con movimiento reducido no anima.
import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "p";
}) {
  const reduced = useReducedMotion();
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
