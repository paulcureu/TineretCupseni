"use client";

import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { Icon } from "./Icon";

/**
 * Videoclip YouTube „ușor”: până la apăsarea pe play se încarcă doar coperta
 * (salvată local), fără scripturi sau cookie-uri YouTube. Apoi pornește
 * playerul youtube-nocookie, direct în pagină.
 */
export function VideoYouTube({ id, titlu, coperta, autor }: { id: string; titlu: string; coperta: string; autor?: string }) {
  const [porneste, setPorneste] = useState(false);

  // Paginile rămân montate (ascunse) după navigare: oprim filmul când pleci de pe pagină.
  useLayoutEffect(() => () => setPorneste(false), []);

  return (
    <figure className="video">
      <div className="video__frame">
        {porneste ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={titlu}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video__poster" onClick={() => setPorneste(true)} aria-label={`Pornește videoclipul: ${titlu}`}>
            <Image src={coperta} alt="" fill sizes="(max-width: 1248px) 100vw, 1200px" />
            <span className="video__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" focusable="false">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
              </svg>
            </span>
            <span className="video__label" aria-hidden="true">
              Vezi filmul candidaturii
            </span>
          </button>
        )}
      </div>
      <figcaption className="video__caption">
        <span>{titlu}</span>
        <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">
          {autor ? `${autor} · ` : ""}YouTube <Icon name="extern" size={16} />
        </a>
      </figcaption>
    </figure>
  );
}
