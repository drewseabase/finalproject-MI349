document.addEventListener('DOMContentLoaded', () => {
  
  const items = document.querySelectorAll('.meets-list .item');

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
        threshold: 0.25, 
      }
    );

    items.forEach((item) => observer.observe(item));
  } else {
    
    items.forEach((item) => item.classList.add('is-visible'));
  }


  const modal = document.querySelector('.course-modal');
  const modalBody = modal ? modal.querySelector('.course-modal-body') : null;
  const closeBtn = modal ? modal.querySelector('.course-modal-close') : null;
  const backdrop = modal ? modal.querySelector('.course-modal-backdrop') : null;

  function openModal(html) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = html;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

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
