import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden-up', 'hidden-down');
          } else {
            // Determine scroll direction by boundingClientRect position
            const rect = entry.boundingClientRect;
            if (rect.top > 0) {
              // Element is below viewport — scrolled back up past it
              entry.target.classList.remove('visible');
              entry.target.classList.add('hidden-down');
            } else {
              // Element is above viewport — scrolled past it going down
              entry.target.classList.remove('visible');
              entry.target.classList.add('hidden-up');
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}