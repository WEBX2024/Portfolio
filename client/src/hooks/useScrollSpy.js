import { useState, useEffect } from 'react';

/**
 * Tracks which section is currently in view for navbar highlighting.
 * @param {string[]} sectionIds - Array of section element IDs to observe.
 * @param {number} offset - Pixel offset from top (defaults to navbar height + buffer).
 * @returns {string} - The ID of the currently active section.
 */
export function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [sectionIds, offset]);

  return activeId;
}
