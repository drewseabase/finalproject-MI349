import useIntersectionReveal from "../../hooks/useIntersectionReveal";

export default function HistoryTimelineItem({ item }) {
  const { ref, isVisible } = useIntersectionReveal(0.55);

  return (
    <article
      ref={ref}
      className={`timeline-item ${isVisible ? "visible" : ""}`}
    >
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <h2>{item.title}</h2>
        <p className="era-sub">{item.eraSub}</p>
        <p className="era-desc">{item.eraDesc}</p>
        <ul className="milestones">
          {item.milestones.map((milestone, index) => (
            <li key={index}>
              <span>{milestone.year}</span> — {milestone.text}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}