# Tineret Cupșeni — site

Site-ul grupului de inițiativă al tinerilor din comuna Cupșeni (Cupșeni, Costeni, Libotin, Ungureni), finaliști Satul European de Tineret 2027.

Construit cu Next.js 16 (App Router, Cache Components), React 19 și TypeScript. Fără bază de date: tot conținutul stă în fișiere din `src/data/`.

## Pornire

```bash
npm install
npm run dev
```

Site-ul apare la http://localhost:3000. Pentru versiunea de producție: `npm run build` și apoi `npm start`.

## Pagini

| Adresă | Ce conține |
| --- | --- |
| `/` | Acasă: anul 2027 lună de lună, primele activități, direcțiile, echipa, galeria |
| `/despre` | Povestea, cele 4 sate, echipa, drumul nostru, Șatra lui Pintea |
| `/calendar` | Toate cele 33 de activități; vedere pe luni sau pe tot anul, filtre pe direcții (`?luna=8&directie=s5`) |
| `/activitati/[slug]` | O pagină pentru fiecare activitate (33, generate static) |
| `/galerie` și `/galerie/[album]` | Albumele foto, cu vizualizare mare (săgeți, Esc) |
| `/sat-european-2027` | Candidatura: cele 7 schimbări (S1–S7) și etapele |
| `/implica-te` | Formular de voluntariat, parteneri, contact |

## Unde modifici conținutul

- `src/data/activitati.ts` — cele 33 de activități din Anexa 3 (titlu, descriere, luni, direcție). Ediții deja ținute (ex. seara de film) se adaugă în `editii`.
- `src/data/directii.ts` — cele 7 direcții (S1–S7): nume, culori și formularea din Fișa 3 (`formulare`).
- `src/data/echipa.ts` — grupul de inițiativă (10 membri): nume, poză și, opțional, rol și sat.
- `src/data/galerie.ts` — albumele foto. Pozele stau în `public/foto/`.
- `src/data/site.ts` — linkuri sociale, e-mail, parteneri, satele.

### De completat înainte de lansare

Textele între paranteze drepte `[ ]` apar pe site așa cum sunt, ca să nu fie uitate:

- rolul și satul fiecărui membru, dacă vreți să apară (`echipa.ts`);
- formularea celor 7 schimbări din Fișa 3 (`directii.ts`);
- o frază despre fiecare sat și adresa de e-mail (`site.ts`);
- povestea grupului (`src/app/despre/page.tsx`);
- descrierea programului, datele etapelor și linkul de vot, dacă există (`src/app/sat-european-2027/page.tsx`).

## Formulare și e-mail (Resend)

Formularele trimit conținutul pe e-mail prin [Resend](https://resend.com), din `src/lib/email.ts` (`trimiteFormular`). Formularul de voluntariat (`src/app/implica-te/actions.ts`) îl folosește deja; un formular nou apelează aceeași funcție cu câmpurile lui.

Variabilele de mediu (copiați `.env.example` în `.env.local`; pe Vercel, în Settings → Environment Variables):

- `RESEND_API_KEY` — cheia API Resend;
- `FORMULARE_EMAIL_DESTINATAR` — cine primește formularele;
- `FORMULARE_EMAIL_EXPEDITOR` — expeditorul. Cu `onboarding@resend.dev`, Resend trimite doar către adresa contului vostru Resend. Ca să trimiteți și altor adrese, verificați un domeniu în Resend și folosiți o adresă de pe el.

Fără cheie, în dezvoltare formularul apare doar în terminal, iar în producție le cere oamenilor să vă scrie pe Instagram sau Facebook. Un câmp ascuns oprește roboții simpli de spam.

## Poze

- `public/foto/intalnire/` — prima întâlnire a echipei (septembrie 2026), din folderul „Poze prima intalnire”.
- `public/foto/film/` — prima seară de film (28 septembrie 2026): 30 de poze din folderul „Poze film” și 5 din postarea de pe Facebook.
- `public/foto/echipa/` — portretele grupului de inițiativă.
- `public/foto/video-candidatura.jpg` — coperta filmului candidaturii (YouTube). Filmul se încarcă de pe youtube-nocookie.com abia când apeși play.
- `public/sigle/` — siglele programului (din Anexa 3).

Pozele sunt redimensionate la maximum 1600 px; `next/image` le optimizează mai departe.

## Publicare

Cel mai simplu: un cont gratuit pe [Vercel](https://vercel.com), conectat la depozitul GitHub. Setați acolo `NEXT_PUBLIC_SITE_URL` și, opțional, `INSCRIERI_WEBHOOK_URL`.
