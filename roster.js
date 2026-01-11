document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".roster-card"));

  // ---- Modal elements (created from HTML you’ll add below) ----
  const modal = document.getElementById("athlete-modal");
  const overlay = document.getElementById("athlete-overlay");
  const closeBtn = document.getElementById("athlete-close");

  const modalImg = document.getElementById("modal-photo");
  const modalName = document.getElementById("modal-name");
  const modalMeta = document.getElementById("modal-meta");
  const modalBio = document.getElementById("modal-bio");
  const modalPRList = document.querySelector("#modal-prs ul");
  const modalFactsList = document.querySelector("#modal-facts ul");

  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");

  let currentIndex = 0;
  let lastFocusedEl = null;

  function populateModalFromCard(card) {
    const name = card.dataset.name || "";
    const meta = card.dataset.meta || "";
    const bio = card.dataset.bio || "";
    const img = card.dataset.img || "";
    const prs = card.dataset.prs || "";
    const facts = card.dataset.facts || "";

    modalName.textContent = name;
    modalMeta.textContent = meta;
    modalBio.textContent = bio;

    if (img) {
      modalImg.src = img;
      modalImg.alt = `${name} headshot`;
    } else {
      modalImg.removeAttribute("src");
      modalImg.alt = "";
    }

    // Personal Bests
    if (modalPRList) {
      modalPRList.innerHTML = "";
      if (prs.trim()) {
        prs.split("|").forEach((pr) => {
          const li = document.createElement("li");
          li.textContent = pr.trim();
          modalPRList.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "—";
        modalPRList.appendChild(li);
      }
    }

    // Quick Facts
    if (modalFactsList) {
      modalFactsList.innerHTML = "";
      if (facts.trim()) {
        facts.split("|").forEach((fact) => {
          const li = document.createElement("li");
          li.textContent = fact.trim();
          modalFactsList.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "—";
        modalFactsList.appendChild(li);
      }
    }
  }

  function openModal(index) {
    if (!cards.length) return;

    currentIndex = index;
    lastFocusedEl = document.activeElement;

    populateModalFromCard(cards[currentIndex]);

    // show
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // focus close button for accessibility
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    // restore focus
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  function goPrev() {
    if (!cards.length) return;
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    populateModalFromCard(cards[currentIndex]);
  }

  function goNext() {
    if (!cards.length) return;
    currentIndex = (currentIndex + 1) % cards.length;
    populateModalFromCard(cards[currentIndex]);
  }

  // Make cards keyboard accessible + open modal on click/Enter/Space
  cards.forEach((card, index) => {
    if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");

    card.addEventListener("click", () => openModal(index));

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(index);
      }
    });
  });

  // Close interactions
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  // Prev/Next inside modal
  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (nextBtn) nextBtn.addEventListener("click", goNext);

  // Keyboard controls while modal open
  document.addEventListener("keydown", (e) => {
    const isOpen = modal.classList.contains("open");
    if (!isOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }

    // Optional: arrow navigation
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }

    // Basic focus trap
    if (e.key === "Tab") {
      const focusables = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
});
