import { useRef } from "react";
import useInView from "../hooks/useInView";

export default function MeetCard({ meet, onOpenCourse, isMobile }) {
  const itemRef = useRef(null);
  const isVisible = useInView(itemRef, { threshold: 0.55 });

  const cp = meet.courseProfile;

  return (
    <li
      ref={itemRef}
      className={`item ${isVisible ? "is-visible" : ""}`}
    >
      <div className="layout">
        <div className="timeline">
          <div className="timeline-marker" aria-hidden="true" />

          <div className="timeline-content">
            <div className="timeline-header">
              <span className="date">{meet.dateLabel}</span>
              <span className={`type ${meet.type}`}>{meet.typeLabel}</span>
            </div>

            <h3 className="meet-name">{meet.meetName}</h3>
            <p className="meet-meta">{meet.meetMeta}</p>

            <p className="description">{meet.description}</p>

            <div className="extra">
              <div className="field">
                <span className="field-label">
                  <strong>{meet.extra.fieldLabel}</strong>
                </span>{" "}
                <span className="field-value">{meet.extra.fieldValue}</span>
              </div>

              <div className="field">
                <span className="field-label">
                  <strong>{meet.extra.focusLabel}</strong>
                </span>{" "}
                <span className="field-value">{meet.extra.focusValue}</span>
              </div>
            </div>

            <button
              className="course-profile-btn"
              type="button"
              onClick={() => {
                if (!isMobile) return; // matches your original behavior
                onOpenCourse(meet);
              }}
            >
              View Course Profile
            </button>
          </div>
        </div>

        {/* Desktop / wide screens show it inline like your old layout */}
        <div className="meetprofile">
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
    </li>
  );
}
