// Sigla grupului: Șatra lui Pintea, soarele care răsare, bradul și drumul.
// `id` trebuie să fie unic în pagină (folosit pentru clipPath).

export function Emblem({ id, size = 52 }: { id: string; size?: number }) {
  const clip = `emblema-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}>
          <circle cx="32" cy="32" r="27" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="31" fill="#FFFFFF" />
      <circle cx="32" cy="32" r="27.5" fill="none" stroke="var(--navy)" strokeWidth="1.5" />
      <g clipPath={`url(#${clip})`}>
        <circle cx="30" cy="29" r="10" fill="var(--sun)" />
        <path d="M10 41 L17 32 Q19 30 22 30 L40 29 Q43 29 45 31 L52 41 Z" fill="var(--navy)" />
        <path d="M4 41 H60 V62 H4 Z" fill="#FFFFFF" />
        <path d="M4 44 C20 41 40 41 60 45" stroke="var(--navy)" strokeWidth="2.5" fill="none" />
        <path d="M4 50 C22 46 40 46 60 51" stroke="#3B5A8C" strokeWidth="2.5" fill="none" />
        <path d="M4 56 C22 52 40 52 60 57" stroke="var(--navy)" strokeWidth="2.5" fill="none" />
        <path d="M47 21 L51 28 H43 Z M47 25 L52.5 33 H41.5 Z M47 29 L54 40 H40 Z" fill="var(--green)" />
      </g>
    </svg>
  );
}
