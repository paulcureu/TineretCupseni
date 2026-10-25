import type { SVGProps } from "react";

const paths = {
  oameni: "M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8",
  motiv: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z",
  bec: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z",
  munte: "M3 20l6.5-11 4 6.5 2.5-4L21 20z",
  stea: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6l-5.4 2.9 1.2-6-4.5-4.2 6.1-.7z",
  inima: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  frunza: "M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19l7-7",
  sageata: "M5 12h14M13 6l6 6-6 6",
  extern: "M7 17 17 7M9 7h8v8",
  calendar: "M3 5h18v16H3zM3 10h18M8 3v4M16 3v4",
  lista: "M4 6h16M4 12h10M4 18h13",
  pin: "M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  trofeu: "M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8",
  facebook: "M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z",
  instagram: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01",
  tiktok: "M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.8 2.4 4.6 5 5",
  meniu: "M4 7h16M4 12h16M4 17h16",
  inchide: "M6 6l12 12M18 6 6 18",
  film: "M3 4h18v16H3zM7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4",
  zaruri: "M3 3h18v18H3zM8 8h.01M16 16h.01M12 12h.01",
  microfon: "M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3M8 21h8",
  nota: "M9 18V5l12-2v13M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  descarca: "M12 3v12M7 10l5 5 5-5M5 21h14",
  mail: "M3 5h18v14H3zM3 7l9 6 9-6",
  plus: "M12 5v14M5 12h14",
  stanga: "M15 6l-6 6 6 6",
  dreapta: "M9 6l6 6-6 6",
  jos: "M6 9l6 6 6-6",
  bifa: "M5 12l5 5L20 7",
  casa: "M3 9l9-6 9 6v11H3zM9 20v-6h6v6",
  poza: "M3 5h18v14H3zM9 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM21 16l-5-5-8 8",
  atentie: "M12 9v4M12 17h.01M10.3 3.9 2.6 17.3A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.7L13.7 3.9a2 2 0 0 0-3.4 0z",
} as const;

export type IconName = keyof typeof paths;

type Props = Omit<SVGProps<SVGSVGElement>, "children"> & {
  name: IconName;
  size?: number;
  label?: string;
};

export function Icon({ name, size = 20, strokeWidth = 2, label, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
