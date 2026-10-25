"use client";

import { CU_MISCARE, gsap, ScrollTrigger } from "./gsap";

// Token-urile de mișcare (aceleași ca în globals.css: --dur-*, --ease-*), ca toate
// animațiile să aibă același ritm. Ieșirile sunt mai scurte decât intrările.
export const MISCARE = {
  /** Apariție discretă: text, titluri, blocuri. Se citește ca o estompare, nu ca o alunecare. */
  aparitie: { y: 16, durata: 0.5, ease: "power2.out" },
  /** Elementele din grile intră în val, cu un mic „arc” (nu se folosește pe tabele). */
  grila: { y: 16, scara: 0.94, durata: 0.45, ease: "back.out(1.4)", pas: 0.05 },
} as const;

// Blocuri care apar lin pe măsură ce derulezi (titluri, texte, panouri).
const DE_ARATAT = [
  ".section-header",
  ".stat-tile",
  ".story-card",
  ".timeline__item",
  ".accordion__item",
  ".album-list > li",
  ".check-list > li",
  ".photo-row > img",
  ".masonry > li",
  ".wide-photo",
  ".prose > p",
  ".thanks",
  ".cta-panel",
  ".form-card",
  ".form-aside",
  ".collage",
  ".split__side > .logo-card",
  ".info-grid",
  ".months-strip",
].join(",");

// Elementele din grile: intră eșalonat, 50 ms între ele, cu un arc scurt.
const GRILE = [".month-grid > li", ".auto-grid > li", ".mosaic > li", ".social-cards > li"].join(",");

/**
 * Animațiile de apariție la derulare pentru o pagină. Elementele deja vizibile
 * la încărcare nu sunt ascunse (fără „pâlpâire”, iar Google vede tot textul),
 * iar cu „reduce motion” nu se animă nimic. Întoarce o funcție de curățare.
 */
export function pornesteAparitii(radacina: HTMLElement): () => void {
  const mm = gsap.matchMedia();

  mm.add(CU_MISCARE, () => {
    const limita = window.innerHeight * 0.92;
    const sub = (el: Element) => el.getBoundingClientRect().top > limita;
    const alege = (selector: string) =>
      gsap.utils.toArray<HTMLElement>(selector, radacina).filter((el) => sub(el) && !el.closest("[data-fara-aparitie]"));

    const blocuri = alege(DE_ARATAT);
    if (blocuri.length) {
      gsap.set(blocuri, { opacity: 0, y: MISCARE.aparitie.y });
      ScrollTrigger.batch(blocuri, {
        start: "top 92%",
        once: true,
        onEnter: (lot) =>
          gsap.to(lot, { opacity: 1, y: 0, duration: MISCARE.aparitie.durata, ease: MISCARE.aparitie.ease, stagger: 0.05, overwrite: true, clearProps: "transform" }),
      });
    }

    const celule = alege(GRILE);
    if (celule.length) {
      gsap.set(celule, { opacity: 0, y: MISCARE.grila.y, scale: MISCARE.grila.scara });
      ScrollTrigger.batch(celule, {
        start: "top 92%",
        once: true,
        onEnter: (lot) =>
          gsap.to(lot, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: MISCARE.grila.durata,
            ease: MISCARE.grila.ease,
            stagger: { each: MISCARE.grila.pas, from: "start" },
            overwrite: true,
            clearProps: "transform",
          }),
      });
    }

    // Cifrele din plăcuțe numără până la valoarea lor (cifre tabulare, ca textul de lângă să nu se mute).
    gsap.utils.toArray<HTMLElement>("[data-numar]", radacina).filter(sub).forEach((el) => {
      const tinta = Number(el.dataset.numar);
      const stare = { n: 0 };
      el.textContent = "0";
      gsap.to(stare, {
        n: tinta,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(stare.n));
        },
        onComplete: () => {
          el.textContent = String(tinta);
        },
      });
    });

    return () => {
      gsap.utils.toArray<HTMLElement>("[data-numar]", radacina).forEach((el) => {
        el.textContent = el.dataset.numar ?? el.textContent;
      });
    };
  });

  return () => mm.revert();
}
