"use client";

import { useRef, ViewTransition, type ReactNode } from "react";
import { useGSAP } from "@/lib/gsap";
import { pornesteAparitii } from "@/lib/motion";

const TRANZITII = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "page",
};

/**
 * Învelișul fiecărei pagini: tranziția la navigare (alunecare înainte/înapoi,
 * sau o apariție discretă) și apariția secțiunilor la derulare.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const radacina = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (radacina.current) return pornesteAparitii(radacina.current);
    },
    { scope: radacina },
  );

  return (
    <ViewTransition enter={TRANZITII} exit={TRANZITII} default="none">
      <div ref={radacina} className="page">
        {children}
      </div>
    </ViewTransition>
  );
}
