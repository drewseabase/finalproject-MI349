import { useMemo, useState } from "react";
import { meets } from "../data/schedule";
import useMediaQuery from "../hooks/useMediaQuery";
import ScheduleTable from "../components/ScheduleTable";
import MeetTimeline from "../components/MeetTimeline";
import CourseModal from "../components/CourseModal";
import "./Schedule.css";

export default function Schedule() {
  const allMeets = useMemo(() => meets, []);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const [courseOpen, setCourseOpen] = useState(false);
  const [selectedMeet, setSelectedMeet] = useState(null);

  function openCourse(meet) {
    setSelectedMeet(meet);
    setCourseOpen(true);
  }

  function closeCourse() {
    setCourseOpen(false);
    setSelectedMeet(null);
  }

  return (
    <>
    <header className="background-img"></header>
    <main>
      <section className="schedule-hero">
        <div className="hero-wrapper">
          <h1>2025 Cross Country Schedule</h1>
          <p className="schedule-intro">
            Meet by meet, this is the path the Spartans took this year in their
            racing schedule, from early-season all the way to the National
            Championships. Track the season's momentum as we move from home turf
            tune-ups to a national-level showdown.
          </p>
        </div>
      </section>

      <section className="schedule-layout">
        <ScheduleTable meets={allMeets} />
      </section>

      <section className="timeline">
        <h2 className="timeline-title">Race-By-Race Timeline</h2>
      </section>

      <MeetTimeline meets={allMeets} onOpenCourse={openCourse} isMobile={isMobile} />

      <CourseModal open={courseOpen} onClose={closeCourse} meet={selectedMeet} />
    </main>
    </>
  );
}
