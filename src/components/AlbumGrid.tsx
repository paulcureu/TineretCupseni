"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Foto } from "@/data/galerie";
import { Icon } from "./Icon";

export function AlbumGrid({ foto, titlu }: { foto: Foto[]; titlu: string }) {
  const [deschis, setDeschis] = useState<number | null>(null);
  const butonInchide = useRef<HTMLButtonElement>(null);
  const ultimulDeclansator = useRef<HTMLElement | null>(null);

  const inchide = useCallback(() => {
    setDeschis(null);
    ultimulDeclansator.current?.focus();
  }, []);
  const urmator = useCallback(() => setDeschis((i) => (i === null ? i : (i + 1) % foto.length)), [foto.length]);
  const anterior = useCallback(() => setDeschis((i) => (i === null ? i : (i - 1 + foto.length) % foto.length)), [foto.length]);

  // Pagina rămâne montată (ascunsă) după navigare: închidem lightbox-ul când pleacă utilizatorul.
  useLayoutEffect(() => () => setDeschis(null), []);

  useEffect(() => {
    if (deschis === null) return;
    butonInchide.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const laTasta = (e: KeyboardEvent) => {
      if (e.key === "Escape") inchide();
      if (e.key === "ArrowRight") urmator();
      if (e.key === "ArrowLeft") anterior();
    };
    window.addEventListener("keydown", laTasta);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", laTasta);
    };
  }, [deschis, inchide, urmator, anterior]);

  const curenta = deschis === null ? null : foto[deschis];

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
          <button type="button" className="lightbox__close" onClick={inchide} ref={butonInchide} aria-label="Închide">
            <Icon name="inchide" size={22} />
          </button>
          <div className="lightbox__stage">
            <button type="button" className="lightbox__nav" onClick={anterior} aria-label="Fotografia anterioară">
              <Icon name="stanga" size={24} />
            </button>
            <Image key={curenta.src} src={curenta.src} alt={curenta.alt} width={curenta.w} height={curenta.h} sizes="90vw" className="lightbox__img" priority />
            <button type="button" className="lightbox__nav" onClick={urmator} aria-label="Fotografia următoare">
              <Icon name="dreapta" size={24} />
            </button>
          </div>
          <p className="lightbox__caption">
            {deschis! + 1} / {foto.length} · {curenta.alt}
          </p>
        </div>
      ) : null}
    </>
  );
}
