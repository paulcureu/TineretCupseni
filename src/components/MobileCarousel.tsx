"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * O listă care pe desktop rămâne grila obișnuită, iar pe telefon devine un
 * carusel orizontal cu „snap” și o bară de progres. Copiii trebuie să fie <li>.
 */
export function MobileCarousel({
  className,
  label,
  latime = "78%",
  as: Tag = "ul",
  children,
}: {
  className: string;
  label: string;
  latime?: string;
  as?: "ul" | "ol";
  children: ReactNode;
}) {
  const pista = useRef<HTMLUListElement & HTMLOListElement>(null);
  const bara = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = pista.current;
    const indicator = bara.current;
    if (!el || !indicator) return;
    let programat = false;
    const actualizeaza = () => {
      programat = false;
      const vizibil = el.scrollWidth > 0 ? Math.min(el.clientWidth / el.scrollWidth, 1) : 1;
      const max = el.scrollWidth - el.clientWidth;
      indicator.style.setProperty("--w", String(vizibil));
      indicator.style.setProperty("--p", String(max > 0 ? el.scrollLeft / max : 0));
    };
    const laDerulare = () => {
      if (!programat) {
        programat = true;
        requestAnimationFrame(actualizeaza);
      }
    };
    actualizeaza();
    el.addEventListener("scroll", laDerulare, { passive: true });
    window.addEventListener("resize", laDerulare);
    return () => {
      el.removeEventListener("scroll", laDerulare);
      window.removeEventListener("resize", laDerulare);
    };
  }, []);

  return (
    <div className="carousel">
      <Tag ref={pista} className={`${className} carousel__track`} aria-label={label} style={{ "--slide": latime } as CSSProperties}>
        {children}
      </Tag>
      <div className="carousel__progress" aria-hidden="true">
        <span ref={bara} />
      </div>
    </div>
  );
}
