"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMenu } from "./MenuProvider";

/**
 * Antetul lipicios. Pe ecrane mici se ascunde când derulezi în jos și revine
 * imediat ce derulezi în sus. Expune înălțimea vizibilă în `--header-offset`,
 * ca elementele lipicioase (ex. selectorul de lună) să stea sub el.
 */
export function ScrollHeader({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { deschis } = useMenu();

  useEffect(() => {
    const antet = ref.current;
    if (!antet) return;
    const mobil = window.matchMedia("(max-width: 1079px)");
    const radacina = document.documentElement;
    let ultimulY = window.scrollY;
    let programat = false;

    const seteaza = (ascuns: boolean) => {
      antet.dataset.hidden = String(ascuns);
      radacina.style.setProperty("--header-offset", ascuns ? "0px" : `${antet.offsetHeight}px`);
    };

    const actualizeaza = () => {
      programat = false;
      const y = Math.max(window.scrollY, 0);
      antet.dataset.scrolled = String(y > 8);
      const delta = y - ultimulY;
      if (Math.abs(delta) < 6) return;
      seteaza(mobil.matches && delta > 0 && y > 140);
      ultimulY = y;
    };

    const laDerulare = () => {
      if (!programat) {
        programat = true;
        requestAnimationFrame(actualizeaza);
      }
    };

    seteaza(false);
    actualizeaza();
    window.addEventListener("scroll", laDerulare, { passive: true });
    const laSchimbare = () => seteaza(false);
    mobil.addEventListener("change", laSchimbare);
    return () => {
      window.removeEventListener("scroll", laDerulare);
      mobil.removeEventListener("change", laSchimbare);
    };
  }, []);

  useEffect(() => {
    if (deschis && ref.current) ref.current.dataset.hidden = "false";
  }, [deschis]);

  return (
    <header ref={ref} className="site-header" data-hidden="false" data-scrolled="false" style={{ viewTransitionName: "site-header" }}>
      {children}
    </header>
  );
}
