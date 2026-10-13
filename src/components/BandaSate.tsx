// Banda cu cele patru sate ale comunei, din mood board-ul din branding. Fiecare sat are
// stilul lui de literă, tot din fonturile brandului. Pur decorativă.

const SATE = [
  { nume: "Libotin", stil: "libotin" },
  { nume: "Cupșeni", stil: "cupseni" },
  { nume: "Ungureni", stil: "ungureni" },
  { nume: "Costeni", stil: "costeni" },
] as const;

// Satele de două ori pe rând, ca rândul să fie mai lat decât ecranul.
const RAND = [...SATE, ...SATE];

export function BandaSate() {
  const rand = (
    <span className="banda-sate__rand">
      {RAND.map((sat, i) => (
        <span key={i} className="banda-sate__element">
          <span className={`banda-sate__sat banda-sate__sat--${sat.stil}`}>{sat.nume}</span>
          <span className="banda-sate__punct" />
        </span>
      ))}
    </span>
  );
  return (
    <div className="banda-sate" aria-hidden="true">
      <div className="banda-sate__pista">
        {rand}
        {rand}
      </div>
    </div>
  );
}
