import { useState, useEffect } from "react";
import ValueCard from "./ValueCard";
import MobileSliderControls from "./MobileSliderControl";

export default function ValuesSection({ values }) {
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
    setCurrentIndex((i) => (i - 1 + values.length) % values.length);
  }

  function next() {
    setCurrentIndex((i) => (i + 1) % values.length);
  }

  return (
    <section className="history-section">
      <div className="content">
        <div className="hero-eyebrow">Principles</div>
        <h2>Team Standards</h2>
        <p className="hero-text">
          The values that connect every era of Spartan Cross Country
        </p>
      </div>
      <div className="values-grid">
        {values.map((value, index) => (
          <ValueCard
            key={value.id}
            value={value}
            isActive={!isMobile || index === currentIndex}
            onClick={() => isMobile && setCurrentIndex(index)}
          />
        ))}
      </div>
      <MobileSliderControls
        onPrev={prev}
        onNext={next}
        prevId="prev-values"
        nextId="next-values"
      />
    </section>
  );
}