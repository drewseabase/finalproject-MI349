import { useEffect, useRef } from "react";
import "./CourseModal.css";
export default function CourseModal({ open, onClose, meet }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !meet) return null;

  const cp = meet.courseProfile;

  return (
    <div className={`course-modal ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="course-modal-backdrop" onClick={onClose} />

      <div className="course-modal-panel" role="dialog" aria-modal="true">
        <button
          ref={closeRef}
          className="course-modal-close"
          type="button"
          aria-label="Close course profile"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="course-modal-body">
          <h4>Course Profile</h4>
          <ul>
            <li>
              <strong>Distance:</strong> {cp.distance}
            </li>
            <li>
              <strong>Terrain:</strong> {cp.terrain}
            </li>
            <li>
              <strong>Key Feature:</strong> {cp.keyFeature}
            </li>
            <li>
              <strong>Conditions:</strong> {cp.conditions}
            </li>
          </ul>

          <div className="difficulty">
            <span className="difficultylabel">Course Difficulty</span>
            <div className="bar">
              <span className={`level level-${cp.difficultyLevel}`} />
            </div>
            <p className="notes">{cp.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
