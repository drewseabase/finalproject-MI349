import HistoryTimelineItem from "./HistoryTimelineItem";

export default function HistoryTimeline({ items }) {
  return (
    <section className="xc-timeline">
      <div className="timeline-header">
        <h1>History of Spartan Cross Country</h1>
      </div>
      <div className="timeline-line"></div>
      {items.map((item) => (
        <HistoryTimelineItem key={item.id} item={item} />
      ))}
    </section>
  );
}