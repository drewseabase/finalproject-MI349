import { useState, useEffect } from "react";
import ChampCard from "./ChampCard";
import MobileSliderControls from "./MobileSliderControl";

export default function ChampionshipSection({ championships }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= 650;
      setIsMobile(mobile);
      if (!mobile) {
        setCurrentIndex(0);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function prev() {
    setCurrentIndex(
      (i) => (i - 1 + championships.length) % championships.length
    );
  }

  function next() {
    setCurrentIndex((i) => (i + 1) % championships.length);
  }

  return (
    <section className="history-section">
      <div className="content">
        <div className="hero-eyebrow">Highlights</div>
        <h2>Championship Moments</h2>
        <p className="hero-text">
          Races where everything came together, and the green and white rose to
          the moment
        </p>
      </div>
      <div className="champ-grid">
        {championships.map((champ, index) => (
          <ChampCard
            key={champ.id}
            champ={champ}
            isActive={!isMobile || index === currentIndex}
            onClick={() => isMobile && setCurrentIndex(index)}
          />
        ))}
      </div>
      <MobileSliderControls
        onPrev={prev}
        onNext={next}
        prevId="prev-champs"
        nextId="next-champs"
      />
    </section>
  );
}