document.addEventListener("DOMContentLoaded", function () {
  /* Array of Roster Images */ 
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

  /*Allows access the roster slideshow Html element*/
  const rosterEl = document.querySelector(".roster-slideshow");
  if (!rosterEl || rosterImages.length === 0) return;

  let currentIndex = 0;
  rosterEl.src = rosterImages[0]; /* Makes the first index of the array to show up automatically when the page loads*/
  
  /* showNextRosterImage function adds a css class to the image, controlling the opacity
  using CSS transitions */
  function showNextRosterImage() {
    rosterEl.classList.add("is-fading");

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % rosterImages.length;
      rosterEl.src = rosterImages[currentIndex];
    }, 600); 

    setTimeout(() => {
      rosterEl.classList.remove("is-fading");
    }, 600 + 1000); 
  }
/* Calls the showNextRosterImage every 7 seconds */
  setInterval(showNextRosterImage, 7000);
});
