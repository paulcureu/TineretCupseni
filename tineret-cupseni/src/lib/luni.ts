export const AN_PROGRAM = 2027;

export const LUNI = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
] as const;

export const LUNI_ABREVIATE = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

const LUNI_SCURT = ["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec."];

/** „Feb. – nov. 2027”, „Apr., mai 2027”, „Tot anul 2027” … */
export function formateazaLuni(luni: number[], cuAn = true): string {
  const sufix = cuAn ? ` ${AN_PROGRAM}` : "";
  if (luni.length === 12) return `Tot anul${sufix}`;

  const intervale: [number, number][] = [];
  for (const luna of luni) {
    const ultim = intervale[intervale.length - 1];
    if (ultim && luna === ultim[1] + 1) ultim[1] = luna;
    else intervale.push([luna, luna]);
  }

  const text = intervale
    .map(([a, b]) => {
      if (a === b) return LUNI_SCURT[a - 1];
      if (b - a === 1) return `${LUNI_SCURT[a - 1]}, ${LUNI_SCURT[b - 1]}`;
      return `${LUNI_SCURT[a - 1]} – ${LUNI_SCURT[b - 1]}`;
    })
    .join(", ");

  return text.charAt(0).toUpperCase() + text.slice(1) + sufix;
}

/** Acordul numeralului în română: „1 fotografie”, „7 fotografii”, „35 de fotografii”. */
export function cuNumar(n: number, singular: string, plural: string): string {
  if (n === 1) return `1 ${singular}`;
  const rest = n % 100;
  return n !== 0 && (rest === 0 || rest >= 20) ? `${n} de ${plural}` : `${n} ${plural}`;
}

export function pluralActivitati(n: number): string {
  return n === 0 ? "nicio activitate" : cuNumar(n, "activitate", "activități");
}
