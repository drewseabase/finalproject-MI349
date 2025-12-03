 document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Uncomment if you only want the animation to happen once:
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    items.forEach((item) => observer.observe(item));
  });