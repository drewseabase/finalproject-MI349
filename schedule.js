document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.meets-list .item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible'); // remove to "disappear" when scrolled away
        }
      });
    },
    {
      threshold: 0.25, 
    }
  );

  items.forEach((item) => observer.observe(item));
});
