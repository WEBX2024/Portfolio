/**
 * Renders a single education entry in a timeline format.
 * Reusing experience-card CSS classes for visual consistency.
 */

import IconMapper from './IconMapper';

export default function EducationCard({ entry }) {
  const { degree, institution, duration, scoreLabel, score } = entry;

  return (
    <article className="experience-card">
      <div className="experience-card__dot" />

      <div className="experience-card__header">
        <h3 className="experience-card__role">{degree}</h3>
        <p className="experience-card__company">{institution}</p>
        <div className="experience-card__meta">
          <span className="experience-card__meta-item"><IconMapper icon="📅" /> {duration}</span>
        </div>
      </div>

      <div className="experience-card__body" style={{ padding: 'var(--space-4) var(--space-6)' }}>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          <strong>{scoreLabel}:</strong> {score}
        </p>
      </div>
    </article>
  );
}
