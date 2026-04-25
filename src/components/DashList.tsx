export default function DashList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="dash-list font-serif" style={{ fontSize: "17px" }}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
