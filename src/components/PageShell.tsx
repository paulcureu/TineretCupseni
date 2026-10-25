"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, ViewTransition, type ReactNode } from "react";
import { useGSAP } from "@/lib/gsap";
import { pornesteAparitii } from "@/lib/motion";

const TRANZITII = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "page",
};

// Prima pagină încărcată nu mută focusul (utilizatorul abia a ajuns); următoarele da.
let aNavigat = false;

/**
 * Învelișul fiecărei pagini: tranziția la navigare (alunecare înainte/înapoi,
 * sau o apariție discretă), apariția secțiunilor la derulare și mutarea
 * focusului pe conținut după navigare, pentru cititoarele de ecran.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const radacina = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (radacina.current) return pornesteAparitii(radacina.current);
    },
    { scope: radacina },
  );

  useEffect(() => {
    if (!aNavigat) {
      aNavigat = true;
      return;
    }
    // Doar dacă focusul nu a fost deja așezat de componenta care a declanșat navigarea.
    const activ = document.activeElement;
    if (activ && activ !== document.body && activ.closest("#continut")) return;
    document.getElementById("continut")?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <ViewTransition enter={TRANZITII} exit={TRANZITII} default="none">
      <div ref={radacina} className="page">
        {children}
      </div>
    </ViewTransition>
  );
}
