export function initAnimations() {
  // Intersection Observer for fade-up animations
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Observe elements with animation classes
  document.querySelectorAll('.animate-fade-up').forEach(element => {
    fadeObserver.observe(element);
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero-image');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  }
}