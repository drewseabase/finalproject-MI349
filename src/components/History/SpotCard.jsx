export default function SpotCard({ spot }) {
  return (
    <article className="spot-card">
      <div className="spot-img">
        <img src={spot.img} alt={spot.title} />
      </div>
      <div className="spot-card__body">
        <div className="spot-card__tag">{spot.tag}</div>
        <h3 className="spot-card__title">{spot.title}</h3>
        <p>{spot.description}</p>
      </div>
    </article>
  );
}