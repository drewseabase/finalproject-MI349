document.addEventListener("DOMContentLoaded", function () {
  // Empty HTMl elements to eventually store athlete data
  const featuredImg = document.getElementById("featured-photo");
  const featuredName = document.getElementById("featured-name");
  const featuredMeta = document.getElementById("featured-meta");
  const featuredBio = document.getElementById("featured-bio");
  const featuredPRList = document.querySelector("#featured-prs ul");
  const featuredFactsList = document.querySelector("#featured-facts ul");

  // Puts each athlete into an Array
  const cards = Array.from(document.querySelectorAll(".roster-card"));
  const prevBtn = document.getElementById("prev-roster");
  const nextBtn = document.getElementById("next-roster");

  let currentIndex = 0;

  function updateFeaturedFromCard(card) {
    const name = card.dataset.name;
    const meta = card.dataset.meta;
    const bio = card.dataset.bio;
    const img = card.dataset.img;
    const prs = card.dataset.prs;
    const facts = card.dataset.facts;

    featuredName.textContent = name;
    featuredMeta.textContent = meta;
    featuredBio.textContent = bio;
    featuredImg.src = img;
    featuredImg.alt = name + " headshot";

    if (prs && featuredPRList) {
      featuredPRList.innerHTML = "";
      prs.split("|").forEach(pr => {
        const li = document.createElement("li");
        li.textContent = pr.trim();
        featuredPRList.appendChild(li);
      });
    }

    if (facts && featuredFactsList) {
      featuredFactsList.innerHTML = "";
      facts.split("|").forEach(fact => {
        const li = document.createElement("li");
        li.textContent = fact.trim();
        featuredFactsList.appendChild(li);
      });
    }
  }

  function setActiveCard(index) {
    currentIndex = index; //sets global index to current index to change card 
    cards.forEach((card, i) => { //iterates through every card in the array
      card.classList.toggle("active", i === index); //if card is clicked the card with that specific index is "active"
    });
  }

  //If there is a card, sets the active card index to the first element in array by default & uses the first card's data
  // to populate the featured section so that there isn't a blank space
  if (cards.length > 0) {
    setActiveCard(0);
    updateFeaturedFromCard(cards[0]);
  }

  // A click listener for each card, allowing for the data of each card to transition per athlete

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      updateFeaturedFromCard(card);
      setActiveCard(index);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });

  //Buttons for smaller screen size to move the roster back and forth
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      if (!cards.length) return;
      const newIndex = (currentIndex - 1 + cards.length) % cards.length;
      setActiveCard(newIndex);
    });

    nextBtn.addEventListener("click", () => {
      if (!cards.length) return;
      const newIndex = (currentIndex + 1) % cards.length;
      setActiveCard(newIndex);
    });
  }
});
