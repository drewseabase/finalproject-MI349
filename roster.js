document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".roster-card"));

  // --- Roster slider controls (mobile) ---
  const rosterPrev = document.getElementById("prev-roster");
  const rosterNext = document.getElementById("next-roster");
  let sliderIndex = 0;

  function setActiveCard(index) {
    if (!cards.length) return;
    sliderIndex = (index + cards.length) % cards.length;
    cards.forEach((card, i) => card.classList.toggle("active", i === sliderIndex));
  }

  function sliderPrev() {
    setActiveCard(sliderIndex - 1);
  }

  function sliderNext() {
    setActiveCard(sliderIndex + 1);
  }

  // Make sure at least one card is active (fixes "everything disappears" on small screens)
  if (cards.length) setActiveCard(0);

  if (rosterPrev) rosterPrev.addEventListener("click", sliderPrev);
  if (rosterNext) rosterNext.addEventListener("click", sliderNext);

  // ---- Modal elements ----
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

  let modalIndex = 0;
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

    modalIndex = (index + cards.length) % cards.length;
    lastFocusedEl = document.activeElement;

    populateModalFromCard(cards[modalIndex]);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  function goPrevModal() {
    if (!cards.length) return;
    modalIndex = (modalIndex - 1 + cards.length) % cards.length;
    populateModalFromCard(cards[modalIndex]);
    setActiveCard(modalIndex); // keep roster slider in sync too
  }

  function goNextModal() {
    if (!cards.length) return;
    modalIndex = (modalIndex + 1) % cards.length;
    populateModalFromCard(cards[modalIndex]);
    setActiveCard(modalIndex); // keep roster slider in sync too
  }

  // Cards: click / keyboard open modal + sync slider index
  cards.forEach((card, index) => {
    if (!card.hasAttribute("tabindex")) card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");

    card.addEventListener("click", () => {
      setActiveCard(index);
      openModal(index);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActiveCard(index);
        openModal(index);
      }
    });
  });

  // Close interactions
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  // Prev/Next inside modal
  if (prevBtn) prevBtn.addEventListener("click", goPrevModal);
  if (nextBtn) nextBtn.addEventListener("click", goNextModal);

  // Keyboard controls while modal open
  document.addEventListener("keydown", (e) => {
    const isOpen = modal.classList.contains("open");
    if (!isOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrevModal();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNextModal();
    }

    // Focus trap
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
// ----- Race Gallery Lightbox -----
const galleryImgs = Array.from(document.querySelectorAll(".race-gallery img"));
const lb = document.getElementById("gallery-lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbCaption = document.getElementById("lightbox-caption");
const lbOverlay = lb?.querySelector(".lightbox-overlay");
const lbClose = lb?.querySelector(".lightbox-close");
const lbPrev = lb?.querySelector(".lightbox-prev");
const lbNext = lb?.querySelector(".lightbox-next");

let galleryIndex = 0;

function openLightbox(index){
  if(!lb || !lbImg) return;
  galleryIndex = index;

  const img = galleryImgs[galleryIndex];
  lbImg.src = img.src;
  lbImg.alt = img.alt || "Race photo";
  if(lbCaption) lbCaption.textContent = img.alt || "";

  lb.classList.add("open");
  lb.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open"); // reuse your existing body lock
}

function closeLightbox(){
  if(!lb) return;
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
  if(lbImg){ lbImg.src = ""; lbImg.alt = ""; }
  if(lbCaption) lbCaption.textContent = "";
}

function showGalleryPrev(){
  if(!galleryImgs.length) return;
  galleryIndex = (galleryIndex - 1 + galleryImgs.length) % galleryImgs.length;
  openLightbox(galleryIndex);
}

function showGalleryNext(){
  if(!galleryImgs.length) return;
  galleryIndex = (galleryIndex + 1) % galleryImgs.length;
  openLightbox(galleryIndex);
}

galleryImgs.forEach((img, i) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => openLightbox(i));
});

lbOverlay?.addEventListener("click", closeLightbox);
lbClose?.addEventListener("click", closeLightbox);
lbPrev?.addEventListener("click", (e)=>{ e.stopPropagation(); showGalleryPrev(); });
lbNext?.addEventListener("click", (e)=>{ e.stopPropagation(); showGalleryNext(); });

document.addEventListener("keydown", (e) => {
  if(!lb || !lb.classList.contains("open")) return;
  if(e.key === "Escape") closeLightbox();
  if(e.key === "ArrowLeft") showGalleryPrev();
  if(e.key === "ArrowRight") showGalleryNext();
});
});
