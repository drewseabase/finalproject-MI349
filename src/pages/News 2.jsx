import { useMemo } from "react";
import { newsRecaps } from "../data/newsRecaps";
import { progressionBoard } from "../data/progressionBoard";
import { trainingWeeks } from "../data/trainingWeek";
import useNewsSlider from "../hooks/useNewsSlider";
import "./News.css";

export default function News() {
  const recaps = useMemo(() => newsRecaps, []);
  const progression = useMemo(() => progressionBoard, []);
  const training = useMemo(() => trainingWeeks, []);

  const recapsSlider = useNewsSlider(recaps.length);
  const trainingSlider = useNewsSlider(training.length);

  return (
    <>
      <header className="background-img"></header>
      <main className="news-page">
        <section className="news-title">
          <h1>News & Highlights</h1>
          <p className="subtitle">
            Stay up to date with meet recaps, PRs, training insights, and more
            moments that define Michigan State Cross Country.
          </p>
        </section>

        {/* Race Recaps Section */}
        <section className="news-section">
          <div className="section-header">
            <div>
              <h2>Race Recaps</h2>
              <p className="tagline">
                Key meets, finishes, and results that shaped our season.
              </p>
            </div>
            <span className="pill">Meets</span>
          </div>
          <div className="race-grid race-grid--recaps">
            {recaps.map((recap, index) => (
              <article
                key={recap.id}
                className={`race-card ${
                  index === recapsSlider.currentIndex ? "active" : ""
                }`}
                onClick={() => recapsSlider.setActive(index)}
              >
                <div className="meta">
                  <span className="course">{recap.course}</span>
                  <span>
                    {recap.date.split("th")[0]}
                    <sup>th</sup> · {recap.location}
                  </span>
                </div>
                <h3>{recap.title}</h3>
                <p className="summary">{recap.summary}</p>
                <div className="details">
                  {recap.details.map((detail, i) => (
                    <div key={i} className="chip">
                      {detail}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="race-controls">
            <button className="control-btn" onClick={recapsSlider.prev}>
              ‹Prev
            </button>
            <button className="control-btn" onClick={recapsSlider.next}>
              Next›
            </button>
          </div>
        </section>

        {/* Progression Board Section */}
        <section className="news-section">
          <div className="section-header">
            <div>
              <h2>Progression Board</h2>
              <p className="tagline">
                Click on a Spartan to view their progress through the Season
              </p>
            </div>
            <span className="pill">Spartan Prs</span>
          </div>
          <div className="prog-list">
            <div className="prog-row prog-header">
              <div>Athlete / Event</div>
              <div>Start → Season PR</div>
              <div>Best Race</div>
            </div>

            {progression.map((athlete) => (
              <div key={athlete.id} className="prog-row">
                <div>
                  <div className="athlete">{athlete.athlete}</div>
                  <div className="event">{athlete.event}</div>
                </div>
                <div className="time">
                  <span>{athlete.startTime}</span>
                  <span className="arrow">→</span>
                  <span>{athlete.seasonPR}</span>
                </div>
                <div className="race">{athlete.bestRace}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Training Week Section */}
        <section className="news-section">
          <div className="section-header">
            <div>
              <h2>Inside Training</h2>
              <p className="tagline">A look at how the Spartans train weekly</p>
            </div>
            <span className="pill">Training Week</span>
          </div>
          <div className="race-grid training-weeks">
            {training.map((day, index) => (
              <article
                key={day.id}
                className={`race-card ${
                  index === trainingSlider.currentIndex ? "active" : ""
                }`}
                onClick={() => trainingSlider.setActive(index)}
              >
                <h2 className="missing-header">Empty header</h2>
                <div className="training-meta">
                  <span className="day-name">{day.dayName}</span>
                  <span className="training-label">{day.trainingLabel}</span>
                </div>
                <p className="description">{day.description}</p>
                <ul className="training-notes">
                  <li>
                    <strong>Focus:</strong> {day.focus}
                  </li>
                  <li>
                    <strong>Location:</strong> {day.location}
                  </li>
                </ul>
              </article>
            ))}
          </div>
          <div className="race-controls">
            <button className="control-btn" onClick={trainingSlider.prev}>
              ‹Prev
            </button>
            <button className="control-btn" onClick={trainingSlider.next}>
              Next›
            </button>
          </div>
        </section>
      </main>
    </>
  );
}