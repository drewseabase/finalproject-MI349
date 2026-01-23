import MeetCard from "./MeetCard";

export default function MeetTimeline({ meets, onOpenCourse, isMobile }) {
  return (
    <div className="meets-wrapper">
      <ol className="meets-list">
        {meets.map((m) => (
          <MeetCard
            key={m.id}
            meet={m}
            onOpenCourse={onOpenCourse}
            isMobile={isMobile}
          />
        ))}
      </ol>
    </div>
  );
}
