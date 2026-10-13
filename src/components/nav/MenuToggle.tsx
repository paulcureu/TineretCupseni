"use client";

import { Icon } from "../Icon";
import { useMenu } from "./MenuProvider";

/** Butonul de meniu din antet (tabletă). Pe telefon, meniul se deschide din bara de jos. */
export function MenuToggle() {
  const { deschis, comuta } = useMenu();
  return (
    <button
      type="button"
      className="menu-toggle"
      aria-expanded={deschis}
      aria-controls="meniu-principal"
      aria-label={deschis ? "Închide meniul" : "Deschide meniul"}
      onClick={(e) => comuta(e.currentTarget)}
    >
      <Icon name="meniu" size={22} />
    </button>
  );
}
