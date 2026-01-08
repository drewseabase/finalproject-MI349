document.addEventListener('DOMContentLoaded', () => {
  
  //Finds all Elements with correlating class to avoid repeating DOM queries
  const items = document.querySelectorAll('.meets-list .item');
  //Checks if browser supports API
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.55, 
      }
    );
    //Tells window to watch each .item element
    items.forEach((item) => observer.observe(item));
  } else {
    //Fall back incase intersection observer isn't supported
    items.forEach((item) => item.classList.add('is-visible'));
  }

  //Code for Modal Responsiveness
  const modal = document.querySelector('.course-modal');
  //If modals exist find content, if not, null
  const modalBody = modal ? modal.querySelector('.course-modal-body') : null;
  const closeBtn = modal ? modal.querySelector('.course-modal-close') : null;
  const backdrop = modal ? modal.querySelector('.course-modal-backdrop') : null;

  //Opens Modal
  function openModal(html) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = html;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden'; //prevents page from scrolling
  }
  //Closes Modal
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.course-profile-btn').forEach((btn) => {
    btn.addEventListener('click', () => {

      if (window.innerWidth > 900) return;

      const item = btn.closest('.item');
      if (!item) return;
      const profile = item.querySelector('.meetprofile');
      if (!profile) return;

      openModal(profile.innerHTML);
    });
  });

  closeBtn && closeBtn.addEventListener('click', closeModal);
  backdrop && backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
