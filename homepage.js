document.addEventListener("DOMContentLoaded", function () {
  const rosterImages = [
    "Images/rileyhough.PNG",
    "Images/thomaswestphal.PNG",
    "Images/jackpennewell.PNG",
    "Images/mosesosterink.PNG",
    "Images/mikehegarty.PNG",
    "Images/parkerlambers.PNG",
    "Images/jaspercane.PNG",
    "Images/paddybyrnes.PNG",
    "Images/evanloughridge.PNG",
    "Images/bradymcardle.PNG",
    "Images/drewseabase.PNG",
    "Images/nathanlarson.PNG"
  ];

  const rosterEl = document.querySelector(".roster-slideshow");
  if (!rosterEl || rosterImages.length === 0) return;

  let currentIndex = 0;
  rosterEl.src = rosterImages[0];

  function showNextRosterImage() {
    rosterEl.classList.add("is-fading");

    const onEnd = (e) => {
      if (e.propertyName !== "opacity") return;
      rosterEl.removeEventListener("transitionend", onEnd);

      currentIndex = (currentIndex + 1) % rosterImages.length;
      rosterEl.src = rosterImages[currentIndex];

      requestAnimationFrame(() => {
        rosterEl.classList.remove("is-fading");
      });
    };

    rosterEl.addEventListener("transitionend", onEnd);
  }

  setInterval(showNextRosterImage, 7000);
});
