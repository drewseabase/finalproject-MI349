export default function MobileSliderControls({ onPrev, onNext, prevId, nextId }) {
  return (
    <div className="history-controls">
      <button className="control-btn" id={prevId} onClick={onPrev}>
        ‹Prev
      </button>
      <button className="control-btn" id={nextId} onClick={onNext}>
        Next›
      </button>
    </div>
  );
}