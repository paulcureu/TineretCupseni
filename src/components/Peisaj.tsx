// Ilustrații decorative: banda de dealuri de sub hero și scena cu Șatra lui Pintea.

export function BandaDealuri() {
  return (
    <svg className="banda-dealuri" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <path d="M180 120 L262 52 Q274 42 292 41 L520 38 Q540 38 552 50 L640 120 Z" fill="#0F1C27" />
      <path d="M0 120 L0 86 C200 60 380 70 600 84 C820 98 1000 64 1200 70 C1320 74 1400 82 1440 86 L1440 120 Z" fill="#22384D" />
      <path d="M0 104 C360 86 1080 86 1440 102" stroke="#E5E9EE" strokeWidth="5" fill="none" />
      <path d="M0 116 C360 98 1080 98 1440 114" stroke="#7F93A8" strokeWidth="5" fill="none" />
      <path d="M1200 30 L1215 52 L1185 52 Z M1200 42 L1221 66 L1179 66 Z M1200 54 L1227 80 L1173 80 Z M1197 80 H1203 V89 H1197 Z" fill="var(--green)" />
      <path d="M1252 50 L1263 66 L1241 66 Z M1252 58 L1268 76 L1236 76 Z M1252 66 L1272 87 L1232 87 Z M1250 87 H1254 V93 H1250 Z" fill="var(--green-dark)" />
      <path d="M110 46 L124 66 L96 66 Z M110 56 L130 79 L90 79 Z M110 67 L135 92 L85 92 Z M107 92 H113 V99 H107 Z" fill="var(--green-dark)" />
    </svg>
  );
}

export function SatraLuiPintea() {
  return (
    <svg className="satra" viewBox="0 0 600 420" aria-hidden="true" focusable="false">
      <circle cx="90" cy="60" r="1.8" fill="#FFFFFF" opacity="0.55" />
      <circle cx="520" cy="80" r="1.6" fill="#FFFFFF" opacity="0.5" />
      <circle cx="300" cy="40" r="1.4" fill="#FFFFFF" opacity="0.45" />
      <circle cx="300" cy="230" r="170" fill="var(--sun)" opacity="0.1" />
      <circle cx="300" cy="230" r="126" fill="var(--sun)" />
      <path d="M40 310 C90 280 120 212 150 186 L175 167 C186 160 196 158 210 158 L395 152 C412 152 424 158 432 168 L460 202 C490 242 522 280 570 310 Z" fill="#0F1C27" />
      <path d="M0 340 C80 302 160 282 260 298 C340 312 420 280 600 298 L600 420 L0 420 Z" fill="#22384D" />
      <path d="M0 378 C140 348 300 346 600 370 L600 420 L0 420 Z" fill="#2A4258" />
      <path d="M0 400 C160 372 330 368 600 392" stroke="#E5E9EE" strokeWidth="7" fill="none" />
      <path d="M500 216 L532 272 L468 272 Z M500 244 L542 310 L458 310 Z M500 276 L552 352 L448 352 Z" fill="var(--green)" />
      <path d="M556 270 L578 308 L534 308 Z M556 290 L585 334 L527 334 Z M556 312 L592 364 L520 364 Z" fill="var(--green-dark)" />
      <path d="M84 280 L102 312 L66 312 Z M84 298 L108 336 L60 336 Z M84 318 L114 362 L54 362 Z" fill="var(--green-dark)" />
    </svg>
  );
}
