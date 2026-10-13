"use client";

import { CU_MISCARE, EASE, gsap, ScrollTrigger } from "./gsap";

// Elementele care apar lin pe măsură ce derulezi. Sunt alese după clasele
// existente, ca markup-ul paginilor să rămână neschimbat.
const DE_ARATAT = [
  ".section-header",
  ".stat-tile",
  ".month-grid > li",
  ".story-card",
  ".auto-grid > li",
  ".mosaic > li",
  ".timeline__item",
  ".accordion__item",
  ".social-cards > li",
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

/**
 * Animațiile de apariție la derulare pentru o pagină. Elementele deja vizibile
 * la încărcare nu sunt ascunse (fără „pâlpâire”), iar cu „reduce motion” nu se
 * animă nimic. Întoarce o funcție de curățare.
 */
export function pornesteAparitii(radacina: HTMLElement): () => void {
  const mm = gsap.matchMedia();

  mm.add(CU_MISCARE, () => {
    const limita = window.innerHeight * 0.92;
    const sub = (el: Element) => el.getBoundingClientRect().top > limita;

    const elemente = gsap.utils.toArray<HTMLElement>(DE_ARATAT, radacina).filter((el) => sub(el) && !el.closest("[data-fara-aparitie]"));
    if (elemente.length) {
      gsap.set(elemente, { opacity: 0, y: 28 });
      ScrollTrigger.batch(elemente, {
        start: "top 92%",
        once: true,
        onEnter: (lot) => gsap.to(lot, { opacity: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.07, overwrite: true, clearProps: "transform" }),
      });
    }

    // Cifrele din plăcuțe numără până la valoarea lor.
    gsap.utils.toArray<HTMLElement>("[data-numar]", radacina).filter(sub).forEach((el) => {
      const tinta = Number(el.dataset.numar);
      const stare = { n: 0 };
      el.textContent = "0";
      gsap.to(stare, {
        n: tinta,
        duration: 1.4,
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
