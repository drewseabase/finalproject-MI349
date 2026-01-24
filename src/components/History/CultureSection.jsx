export default function CultureSection({ culture }) {
  return (
    <section className="history-section history-culture">
      <div className="content">
        <div className="hero-eyebrow">Culture</div>
        <h2>Tradition &amp; Identity</h2>
        <p className="hero-text">
          What is has always meant - and still means - to run for Michigan State
        </p>
      </div>
      <div className="two-col">
        <div className="tradition-copy">
          {culture.traditionCopy.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <ul className="identity-list">
          {culture.identityList.map((item) => (
            <li key={item.id} className="identity-item">
              <span className="identity-label">{item.label}</span>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}