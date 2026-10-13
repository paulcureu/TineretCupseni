"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { flushSync } from "react-dom";
import type { Foto } from "@/data/galerie";
import { gsap } from "@/lib/gsap";
import { Icon } from "./Icon";

type Gest = { x: number; y: number; t: number; axa: "x" | "y" | null; id: number };

const faraMiscare = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function AlbumGrid({ foto, titlu }: { foto: Foto[]; titlu: string }) {
  const [deschis, setDeschis] = useState<number | null>(null);
  const butonInchide = useRef<HTMLButtonElement>(null);
  const ultimulDeclansator = useRef<HTMLElement | null>(null);
  const cadru = useRef<HTMLDivElement>(null);
  const fundal = useRef<HTMLDivElement>(null);
  const gest = useRef<Gest | null>(null);
  const ocupat = useRef(false);

  const inchide = useCallback(() => {
    const final = () => {
      setDeschis(null);
      ultimulDeclansator.current?.focus({ preventScroll: true });
    };
    if (faraMiscare() || !cadru.current) return final();
    gsap.to(fundal.current, { opacity: 0, duration: 0.25 });
    gsap.to(cadru.current, { opacity: 0, scale: 0.94, duration: 0.25, ease: "power2.in", onComplete: final });
  }, []);

  /** Trece la poza următoare (+1) sau anterioară (-1), cu alunecare în direcția gestului. */
  const muta = useCallback(
    (pas: 1 | -1) => {
      const el = cadru.current;
      if (ocupat.current) return;
      const schimba = () => flushSync(() => setDeschis((i) => (i === null ? i : (i + pas + foto.length) % foto.length)));
      if (faraMiscare() || !el) return schimba();
      ocupat.current = true;
      const latime = window.innerWidth;
      gsap.to(el, {
        x: -pas * latime * 0.6,
        opacity: 0,
        rotation: 0,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          schimba();
          gsap.fromTo(
            el,
            { x: pas * latime * 0.35, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.42, ease: "power3.out", onComplete: () => void (ocupat.current = false) },
          );
        },
      });
    },
    [foto.length],
  );

  // Pagina rămâne montată (ascunsă) după navigare: închidem lightbox-ul când pleacă utilizatorul.
  useLayoutEffect(() => () => setDeschis(null), []);

  const esteDeschis = deschis !== null;

  useEffect(() => {
    if (!esteDeschis) return;
    butonInchide.current?.focus({ preventScroll: true });
    const radacina = document.documentElement;
    const overflow = radacina.style.overflow;
    radacina.style.overflow = "hidden";
    if (!faraMiscare()) {
      gsap.fromTo(fundal.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(cadru.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    }
    const laTasta = (e: KeyboardEvent) => {
      if (e.key === "Escape") inchide();
      if (e.key === "ArrowRight") muta(1);
      if (e.key === "ArrowLeft") muta(-1);
    };
    window.addEventListener("keydown", laTasta);
    return () => {
      radacina.style.overflow = overflow;
      window.removeEventListener("keydown", laTasta);
    };
  }, [esteDeschis, inchide, muta]);

  // --- Gesturi: glisare stânga/dreapta = altă poză, glisare în jos = închide ---

  const laApasare = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button") || ocupat.current) return;
    gest.current = { x: e.clientX, y: e.clientY, t: performance.now(), axa: null, id: e.pointerId };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Unele browsere refuză captura pentru anumite tipuri de pointer; gestul merge și fără.
    }
  };

  const laMiscare = (e: PointerEvent<HTMLDivElement>) => {
    const g = gest.current;
    const el = cadru.current;
    if (!g || g.id !== e.pointerId || !el) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!g.axa && Math.hypot(dx, dy) > 8) g.axa = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (g.axa === "x") gsap.set(el, { x: dx, rotation: dx * 0.015 });
    if (g.axa === "y" && dy > 0) {
      gsap.set(el, { y: dy, scale: Math.max(1 - dy / 1600, 0.85) });
      gsap.set(fundal.current, { opacity: Math.max(1 - dy / 450, 0.25) });
    }
  };

  const laEliberare = (e: PointerEvent<HTMLDivElement>) => {
    const g = gest.current;
    gest.current = null;
    const el = cadru.current;
    if (!g || g.id !== e.pointerId || !el) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    const viteza = Math.abs(dx) / Math.max(performance.now() - g.t, 1);
    if (g.axa === "x" && (Math.abs(dx) > 70 || viteza > 0.6)) return muta(dx < 0 ? 1 : -1);
    if (g.axa === "y" && dy > 110) return inchide();
    gsap.to(el, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.45, ease: "elastic.out(1, 0.75)" });
    gsap.to(fundal.current, { opacity: 1, duration: 0.3 });
  };

  const curenta = deschis === null ? null : foto[deschis];
  const vecini = deschis === null ? [] : [foto[(deschis + 1) % foto.length], foto[(deschis - 1 + foto.length) % foto.length]];

  return (
    <>
      <ul className="masonry">
        {foto.map((f, i) => (
          <li key={f.src}>
            <button
              type="button"
              className="masonry__item"
              onClick={(e) => {
                ultimulDeclansator.current = e.currentTarget;
                setDeschis(i);
              }}
              aria-label={`Deschide fotografia ${i + 1}: ${f.alt}`}
            >
              <Image src={f.src} alt={f.alt} width={f.w} height={f.h} sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 280px" />
            </button>
          </li>
        ))}
      </ul>

      {curenta ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Fotografie din albumul ${titlu}`}>
          <div className="lightbox__backdrop" ref={fundal} aria-hidden="true" />
          <div className="lightbox__top">
            <p className="lightbox__counter">
              {deschis! + 1} / {foto.length}
            </p>
            <button type="button" className="lightbox__close" onClick={inchide} ref={butonInchide} aria-label="Închide">
              <Icon name="inchide" size={22} />
            </button>
          </div>
          <div className="lightbox__stage" onPointerDown={laApasare} onPointerMove={laMiscare} onPointerUp={laEliberare} onPointerCancel={laEliberare}>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => muta(-1)} aria-label="Fotografia anterioară">
              <Icon name="stanga" size={24} />
            </button>
            <div className="lightbox__frame" ref={cadru}>
              <Image key={curenta.src} src={curenta.src} alt={curenta.alt} width={curenta.w} height={curenta.h} sizes="92vw" className="lightbox__img" loading="eager" draggable={false} />
            </div>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => muta(1)} aria-label="Fotografia următoare">
              <Icon name="dreapta" size={24} />
            </button>
          </div>
          <p className="lightbox__hint" aria-hidden="true">
            Glisează pentru următoarea · trage în jos ca să închizi
          </p>
          {/* Pozele vecine se încarcă din timp, ca trecerea să fie instantanee. */}
          <div hidden>
            {vecini.map((f) => (
              <Image key={`vecin-${f.src}`} src={f.src} alt="" width={f.w} height={f.h} sizes="92vw" loading="eager" />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
