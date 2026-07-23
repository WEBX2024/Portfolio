/**
 * Renders a single experience entry in a timeline format.
 */

import IconMapper from './IconMapper';

export default function ExperienceCard({ entry }) {
  const { role, company, duration, location, responsibilities, tech } = entry;

  return (
    <article className="experience-card">
      <div className="experience-card__dot" />

      <div className="experience-card__header">
        <h3 className="experience-card__role">{role}</h3>
        <p className="experience-card__company">{company}</p>
        <div className="experience-card__meta">
          <span className="experience-card__meta-item"><IconMapper icon="📅" /> {duration}</span>
          {location && (
            <span className="experience-card__meta-item"><IconMapper icon="📍" /> {location}</span>
          )}
        </div>
      </div>

      <div className="experience-card__body">
        {responsibilities && responsibilities.length > 0 && (
          <ul className="experience-card__description">
            {responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}

        {tech && tech.length > 0 && (
          <div className="experience-card__tech">
            {tech.map((t) => (
              <span key={t} className="experience-card__tech-tag">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
