export default function ChampCard({ champ, isActive, onClick }) {
  return (
    <article
      className={`champ-card ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="champ-img">
        <img src={champ.img} alt={champ.label} />
        <div className="champ-label">{champ.label}</div>
      </div>
      <div className="champ-body">
        <h3 className="champ-title">{champ.title}</h3>
        {champ.details.map((detail, index) => (
          <p key={index} className="hero-meta">
            {detail}
          </p>
        ))}
      </div>
    </article>
  );
}