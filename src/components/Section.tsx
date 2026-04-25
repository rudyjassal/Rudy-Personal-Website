export default function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <hr className="hairline" />
      <p className="section-label">{label}</p>
      {children}
    </section>
  );
}
