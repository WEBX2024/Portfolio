import { useState } from 'react';
import Button from './Button';

/**
 * Renders a single project as a card.
 * Only renders links when valid URLs are provided.
 */

export default function ProjectCard({ project }) {
  const { name, type, date, description, impact, tech, image, github, live, featured } = project;
  const [isExpanded, setIsExpanded] = useState(false);

  const maxDescLength = 80;
  const shouldTruncate = description.length > maxDescLength;
  const displayDescription = isExpanded || !shouldTruncate 
    ? description 
    : description.slice(0, maxDescLength) + '...';

  return (
    <article className="project-card glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="project-card__image">
        {image ? (
          <img src={image} alt={`${name} screenshot`} loading="lazy" />
        ) : (
          <div className="project-card__image-placeholder" aria-hidden="true">
            📁
          </div>
        )}
        {featured && <span className="project-card__featured">Featured</span>}
      </div>

      <div className="project-card__body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="project-card__name">{name}</h3>
        {(type || date) && (
          <p className="project-card__meta">
            {type && <span>{type}</span>}
            {type && date && <span className="separator"> • </span>}
            {date && <span>{date}</span>}
          </p>
        )}
        
        <p className="project-card__description">
          <span style={!isExpanded && shouldTruncate ? { maskImage: 'linear-gradient(to right, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent)' } : {}}>
            {displayDescription}
          </span>
          {shouldTruncate && !isExpanded && (
            <span 
              onClick={() => setIsExpanded(true)}
              style={{ cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px', color: 'var(--color-accent)' }}
            >
              See more
            </span>
          )}
        </p>

        {isExpanded && (
          <div style={{ marginTop: 'var(--space-4)', animation: 'fadeIn 0.3s ease-out' }}>
            {impact && (
              <p className="project-card__impact">
                <strong>Impact:</strong> {impact}
              </p>
            )}

            <div className="project-card__tech">
              {tech.map((t) => (
                <span key={t} className="project-card__tech-tag">
                  {t}
                </span>
              ))}
            </div>

            <div className="project-card__links">
              {github && (
                <Button variant="ghost" size="sm" href={github}>
                  GitHub
                </Button>
              )}
              {live && (
                <Button variant="ghost" size="sm" href={live}>
                  Live Demo
                </Button>
              )}
              {!github && !live && (
                <span
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  Internal / Confidential
                </span>
              )}
            </div>

            <span 
              onClick={() => setIsExpanded(false)}
              style={{ cursor: 'pointer', textDecoration: 'underline', color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)', display: 'inline-block', marginTop: 'var(--space-4)' }}
            >
              See less
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
