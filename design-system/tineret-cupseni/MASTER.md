# Tineret Cupșeni — sistemul de design (MASTER)

Sursa de adevăr pentru felul în care arată și se comportă site-ul. Generat cu metoda
[UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (`--design-system`,
variance 6, motion 5, density 3), apoi adaptat la brandul fix al grupului: paleta și fonturile
propuse de unealtă (mov + Inter/Playfair) au fost înlocuite cu cele din siglă și din branding.
Token-urile de mai jos sunt definite în `src/app/globals.css` (`:root`).

Reguli de aplicare:

1. Componentele folosesc token-uri (`--color-*`, `--space-*`, `--text-*`, `--radius-*`,
   `--shadow-*`, `--dur-*`), nu valori scrise direct. Excepție: culorile celor 7 direcții
   (`src/data/directii.ts`), care sunt date de conținut, nu de temă.
2. Dacă există `design-system/tineret-cupseni/pages/<pagina>.md`, regulile de acolo au prioritate
   pentru pagina respectivă. Altfel se aplică doar acest fișier.

## Direcție

- **Stil:** „Accessible & Ethical” (contrast ≥ 4.5:1, text ≥ 16px, navigare din tastatură, inel
  de focus vizibil, `prefers-reduced-motion`), cu căldura stilului „Nature Distilled”: hârtie
  caldă, granulație fină pe fundalurile închise, umbre naturale, colțuri rotunjite inegal.
- **Tipar de pagină (Acasă):** Hero → cifre → dovadă socială (evenimente deja ținute, cu poze și
  date) → film → calendar → direcții → echipă → program → galerie → CTA. Dovada socială vine
  înaintea planurilor și a îndemnului la acțiune.
- **Un singur buton principal pe ecran** (portocaliu), restul subordonate (contur sau text).

## Culori

| Rol | Token | Valoare | Contrast verificat |
| --- | --- | --- | --- |
| Primar (bleumarin) | `--color-primary` | `#1A2E40` | alb pe el 12.6:1 |
| Primar, hover | `--color-primary-hover` | `#243B52` | alb pe el 11.5:1 |
| Text pe primar | `--color-on-primary` / `-muted` / `-soft` | `#FFFFFF` / `#C9D1DA` / `#A3B0BF` | 9.0:1 / 6.3:1 |
| Secundar (verde) | `--color-secondary` | `#2D5A27` | alb pe el 8.1:1 |
| Accent (soare) | `--color-accent` | `#E89D35` | bleumarin pe el 6.2:1 |
| Accent, hover | `--color-accent-hover` | `#F2AC4C` | bleumarin pe el 7.2:1 |
| Fundal (hârtie caldă) | `--color-background` | `#F8F5EF` | |
| Text | `--color-foreground` | `#1A2E40` | 14.6:1 |
| Text secundar | `--color-muted-foreground` / `-2` | `#4E5B69` / `#5B6875` | 6.9:1 / 5.7:1 pe alb |
| Card | `--color-card` | `#FFFFFF` | |
| Suprafață estompată | `--color-muted` / `-2` | `#EFEDE7` / `#E4E1D9` | |
| Bordură | `--color-border` / `-strong` | `#E2DFD8` / `#C9C4B9` | decorative |
| Bordură de câmp | `--color-border-input` | `#8A949F` | 3.1:1 pe alb (limită de control) |
| Eroare | `--color-destructive` / `-soft` | `#9E2A2B` / `#FBECEC` | 7.5:1 pe alb |
| Inel de focus | `--color-ring` | `#E89D35` | 3px, offset 3px |

Culoarea nu e niciodată singurul indicator: erorile au pictogramă + text, pagina curentă din
meniu are literă grasă + liniuță, filtrele apăsate au fundal plin + bifă.

## Tipografie

Branding: **Times New Roman** (titluri; Tinos ca înlocuitor pe Android), **Poppins** (text).

| Token | Dimensiune | Folosire |
| --- | --- | --- |
| `--text-display` | 48–104px | titlul de pe Acasă |
| `--text-display-md` | 42–84px | titlurile paginilor |
| `--text-4xl` / `-3xl` / `-2xl` | 40–68 / 34–56 / 26–34px | h1 / h2 / h3 |
| `--text-xl` / `-lg` | 24 / 20px | nume de card, h4 |
| `--text-md` | 18px | lead, prose (Poppins 300) |
| `--text-base` | 17px | text curent (Poppins 400) |
| `--text-sm` / `-xs` | 14 / 13px | etichete, meta; niciodată text curent |

Lungimea rândului: `--measure: 65ch`. Titlurile au `text-wrap: balance`, paragrafele `pretty`.
Cifrele care se schimbă (contoare) sunt tabulare, cu lățime rezervată.

## Spațiere și layout

- Scară: `--space-1…10` = 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px (densitate „spacious”).
- Secțiune: 64–96px; secțiune strânsă: 32–48px; interior: 24–32px.
- Container 1200px; gutter 16px pe telefon, 24px de la 601px, 32px de la 1024px.
- Breakpoint-uri folosite: 600, 700, 768, 1024, 1080.
- Straturi: `--z-sticky 20`, `--z-header 40`, `--z-menu 90`, `--z-dock 95`, `--z-modal 100`, `--z-skip 110`.

## Forme și elevație

- Raze: `--radius-xs 8`, `-sm 12`, `-md 20`, `-lg 28`, `-xl 36`, `-full`.
- Umbre, o singură scară: `--shadow-sm` (card în repaus), `--shadow-md` (hover), `--shadow-lg`
  (media mare), `--shadow-dark` (elemente albe peste bleumarin).
- Cardurile: bordură 1px + `--shadow-sm`; la hover (doar mouse) se ridică 2px și primesc
  `--shadow-md`; la apăsare scad la 98%, fără să mute vecinii.

## Mișcare

- Durate: `--dur-fast 150ms` (culoare, bordură), `--dur-base 250ms` (transformări, umbre),
  `--dur-slow 400ms`. Ieșirile sunt la ~60–70% din intrări.
- Curbe: `--ease-out` (sosire), `--ease-in` (plecare), `--ease-spring` (accent).
- GSAP (`src/lib/motion.ts`): blocurile apar cu `y: 16`, 0.5s, `power2.out`; elementele din
  grile cu `y: 16, scale: 0.94`, 0.45s, `back.out(1.4)`, 50ms între ele. Fără arc pe tabele.
- Tot ce se mișcă respectă `prefers-reduced-motion`; elementele vizibile la încărcare nu sunt
  ascunse niciodată (SEO, fără pâlpâire).

## Interacțiune și accesibilitate

- Ținte de atingere ≥ 44px (butoane, linkuri de meniu, breadcrumb, antetul tabelului).
- Răspuns la apăsare în ≤ 150ms pe orice pointer (`:active`), hover doar cu `(hover: hover)`.
- Formulare: etichetă vizibilă, text ajutător sub câmp, eroare sub câmp cu pictogramă, rezumat
  de erori cu focus și linkuri către câmpuri, `aria-describedby`, `aria-required`.
- Navigare: pagina curentă marcată, bara de jos cu max. 5 elemente, focus mutat pe conținut după
  navigare, `Escape` închide meniul și lightbox-ul, gesturile au alternative cu butoane.
- Pictograme: un singur set (Lucide-like, 2px), decorative cu `aria-hidden`, fără emoji.

## De evitat

- Culori sau dimensiuni scrise direct în componente.
- Text sub 13px; text curent sub 16px.
- Animații pe `width/height/top/left`; o singură durată pentru tot.
- Carusele care se mișcă singure, fără pauză.
- Eliminarea inelului de focus fără înlocuitor.
