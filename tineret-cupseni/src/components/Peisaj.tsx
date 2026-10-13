// Ilustrații decorative: banda de dealuri de sub hero și scena cu Șatra lui Pintea.

export function BandaDealuri() {
  return (
    <svg className="banda-dealuri" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <path d="M180 120 L262 52 Q274 42 292 41 L520 38 Q540 38 552 50 L640 120 Z" fill="#0B1428" />
      <path d="M0 120 L0 86 C200 60 380 70 600 84 C820 98 1000 64 1200 70 C1320 74 1400 82 1440 86 L1440 120 Z" fill="#1B2B4B" />
      <path d="M0 104 C360 86 1080 86 1440 102" stroke="#E8EEF5" strokeWidth="5" fill="none" />
      <path d="M0 116 C360 98 1080 98 1440 114" stroke="#6F8BB8" strokeWidth="5" fill="none" />
      <path d="M1200 28 L1218 56 L1182 56 Z M1200 44 L1224 76 L1176 76 Z M1200 60 L1230 96 L1170 96 Z" fill="var(--green)" />
      <path d="M1252 48 L1266 70 L1238 70 Z M1252 60 L1270 86 L1234 86 Z M1252 72 L1274 100 L1230 100 Z" fill="var(--green-dark)" />
      <path d="M110 42 L126 68 L94 68 Z M110 56 L132 86 L88 86 Z M110 70 L136 102 L84 102 Z" fill="var(--green-dark)" />
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
      <path d="M40 310 C90 280 120 212 150 186 L175 167 C186 160 196 158 210 158 L395 152 C412 152 424 158 432 168 L460 202 C490 242 522 280 570 310 Z" fill="#0B1428" />
      <path d="M0 340 C80 302 160 282 260 298 C340 312 420 280 600 298 L600 420 L0 420 Z" fill="#1B2B4B" />
      <path d="M0 378 C140 348 300 346 600 370 L600 420 L0 420 Z" fill="#22355C" />
      <path d="M0 400 C160 372 330 368 600 392" stroke="#E8EEF5" strokeWidth="7" fill="none" />
      <path d="M500 216 L532 272 L468 272 Z M500 244 L542 310 L458 310 Z M500 276 L552 352 L448 352 Z" fill="var(--green)" />
      <path d="M556 270 L578 308 L534 308 Z M556 290 L585 334 L527 334 Z M556 312 L592 364 L520 364 Z" fill="var(--green-dark)" />
      <path d="M84 280 L102 312 L66 312 Z M84 298 L108 336 L60 336 Z M84 318 L114 362 L54 362 Z" fill="var(--green-dark)" />
    </svg>
  );
}
