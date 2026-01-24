export default function ValueCard({ value, isActive, onClick }) {
  return (
    <article
      className={`value-card ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <h3 className="value-title">{value.title}</h3>
      <p>{value.description}</p>
    </article>
  );
}