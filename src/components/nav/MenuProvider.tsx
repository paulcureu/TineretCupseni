"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Origine = { x: number; y: number };

type MenuContext = {
  deschis: boolean;
  origine: Origine | null;
  deschide: (buton?: HTMLElement | null) => void;
  inchide: (opts?: { faraFocus?: boolean }) => void;
  comuta: (buton?: HTMLElement | null) => void;
};

const Context = createContext<MenuContext | null>(null);

// Zonele paginii care devin inactive cât timp meniul pe tot ecranul e deschis.
// Bara de jos rămâne activă (stă deasupra meniului), ca meniul să se închidă din același buton.
const ZONE_FUNDAL = "#continut, .site-header, .site-footer";

export function MenuProvider({ children }: { children: ReactNode }) {
  const [deschis, setDeschis] = useState(false);
  const [origine, setOrigine] = useState<Origine | null>(null);
  const declansator = useRef<HTMLElement | null>(null);
  const redaFocus = useRef(false);

  const deschide = useCallback((buton?: HTMLElement | null) => {
    declansator.current = buton ?? null;
    if (buton) {
      const r = buton.getBoundingClientRect();
      setOrigine({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    } else {
      setOrigine(null);
    }
    setDeschis(true);
  }, []);

  const inchide = useCallback((opts?: { faraFocus?: boolean }) => {
    redaFocus.current = !opts?.faraFocus;
    setDeschis(false);
  }, []);

  const comuta = useCallback(
    (buton?: HTMLElement | null) => (deschis ? inchide() : deschide(buton)),
    [deschis, deschide, inchide],
  );

  useEffect(() => {
    if (!deschis) return;
    const radacina = document.documentElement;
    const overflow = radacina.style.overflow;
    radacina.style.overflow = "hidden";
    const fundal = document.querySelectorAll<HTMLElement>(ZONE_FUNDAL);
    fundal.forEach((el) => (el.inert = true));

    const laTasta = (e: KeyboardEvent) => {
      if (e.key === "Escape") inchide();
    };
    const laInapoi = () => inchide({ faraFocus: true });
    window.addEventListener("keydown", laTasta);
    window.addEventListener("popstate", laInapoi);
    return () => {
      radacina.style.overflow = overflow;
      fundal.forEach((el) => (el.inert = false));
      // Focusul revine pe butonul care a deschis meniul abia după ce pagina e din nou activă.
      if (redaFocus.current) declansator.current?.focus({ preventScroll: true });
      redaFocus.current = false;
      window.removeEventListener("keydown", laTasta);
      window.removeEventListener("popstate", laInapoi);
    };
  }, [deschis, inchide]);

  const valoare = useMemo(() => ({ deschis, origine, deschide, inchide, comuta }), [deschis, origine, deschide, inchide, comuta]);
  return <Context value={valoare}>{children}</Context>;
}

export function useMenu(): MenuContext {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useMenu trebuie folosit în interiorul <MenuProvider>.");
  return ctx;
}
