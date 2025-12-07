document.addEventListener("DOMContentLoaded", function () {
  function setupSlider(containerSelector, prevId, nextId) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const cards = Array.from(container.querySelectorAll(".race-card"));
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);

    if (!cards.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function setActiveCard(index) {
      currentIndex = index;
      cards.forEach((card, i) => {
        card.classList.toggle("active", i === index);
      });
    }

    setActiveCard(0);

    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        setActiveCard(index);
      });
    });

    prevBtn.addEventListener("click", () => {
      const newIndex = (currentIndex - 1 + cards.length) % cards.length;
      setActiveCard(newIndex);
    });

    nextBtn.addEventListener("click", () => {
      const newIndex = (currentIndex + 1) % cards.length;
      setActiveCard(newIndex);
    });
  }

  setupSlider(".race-grid.race-recaps", "prev-news", "next-news");
  setupSlider(".race-grid.training-weeks", "prev-training", "next-training");
});
