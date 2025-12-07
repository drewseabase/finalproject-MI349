document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.55 }
  );

  items.forEach((item) => observer.observe(item));

  function initSlider(containerSelector, cardSelector, prevId, nextId, breakpoint) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const cards = Array.from(container.querySelectorAll(cardSelector));
    if (!cards.length) return;

    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    let currentIndex = 0;

    function applyActive(index) {
      currentIndex = index;
      cards.forEach((card, i) => {
        if (i === index) {
          card.classList.add("active");
          card.classList.remove("leaving");
        } else {
          card.classList.remove("active");
          card.classList.remove("leaving");
        }
      });
    }

    function go(delta) {
      if (window.innerWidth > breakpoint) return;
      if (!cards.length) return;
      const nextIndex = (currentIndex + delta + cards.length) % cards.length;
      const currentCard = cards[currentIndex];
      currentCard.classList.add("leaving");
      currentCard.classList.remove("active");
      setTimeout(() => {
        currentCard.classList.remove("leaving");
      }, 220);
      applyActive(nextIndex);
    }

    function handleResize() {
      if (window.innerWidth <= breakpoint) {
        applyActive(0);
      } else {
        cards.forEach((card) => {
          card.classList.remove("active");
          card.classList.remove("leaving");
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener("click", () => go(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => go(1));

    window.addEventListener("resize", handleResize);
    handleResize();
  }

  initSlider(".champ-grid", ".champ-card", "prev-champs", "next-champs", 650);
  initSlider(".spots-grid", ".spot-card", "prev-spots", "next-spots", 650);
  initSlider(".values-grid", ".value-card", "prev-values", "next-values", 650);
});

