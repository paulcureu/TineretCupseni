/** Date structurate (schema.org) pentru motoarele de căutare. */
export function JsonLd({ date }: { date: object }) {
  return (
    <script
      type="application/ld+json"
      // `<` e înlocuit ca textul să nu poată închide eticheta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(date).replace(/</g, "\\u003c") }}
    />
  );
}
