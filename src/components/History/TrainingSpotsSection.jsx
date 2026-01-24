import SpotCard from "./SpotCard";

export default function TrainingSpotsSection({ spots }) {
  return (
    <section className="history-section">
      <div className="content">
        <div className="hero-eyebrow">Home Base</div>
        <h2>Where We Train</h2>
        <p className="hero-text">
          The routes and landmarks that have shaped generations of Spartan runners
        </p>
      </div>
      <div className="spots-grid">
        {spots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    </section>
  );
}