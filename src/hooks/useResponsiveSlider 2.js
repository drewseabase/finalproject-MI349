import { useState, useEffect } from "react";

export default function useResponsiveSlider(itemCount, breakpoint = 650) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= breakpoint;
      setIsMobile(mobile);
      if (!mobile) {
        setCurrentIndex(0);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  function prev() {
    setCurrentIndex((i) => (i - 1 + itemCount) % itemCount);
  }

  function next() {
    setCurrentIndex((i) => (i + 1) % itemCount);
  }

  function setActive(index) {
    setCurrentIndex(index);
  }

  return {
    currentIndex,
    isMobile,
    prev,
    next,
    setActive,
  };
}