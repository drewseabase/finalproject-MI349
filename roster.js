document.addEventListener("DOMContentLoaded", function () {
  const featuredImg = document.getElementById("featured-photo");
  const featuredName = document.getElementById("featured-name");
  const featuredMeta = document.getElementById("featured-meta");
  const featuredBio = document.getElementById("featured-bio");
  const featuredPRList = document.querySelector("#featured-prs ul");
  const featuredFactsList = document.querySelector("#featured-facts ul");

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
    currentIndex = index;
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });
  }

  if (cards.length > 0) {
    setActiveCard(0);
    updateFeaturedFromCard(cards[0]);
  }


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
