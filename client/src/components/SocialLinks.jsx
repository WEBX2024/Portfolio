/**
 * Renders social/profile links.
 * Filters out entries with null URLs.
 */

import { FiGithub, FiLinkedin } from 'react-icons/fi';

export default function SocialLinks({ links, className = '' }) {
  const activeLinks = links.filter((link) => link.url);

  if (activeLinks.length === 0) return null;

  const getIcon = (iconStr) => {
    if (iconStr === 'GH' || iconStr === 'GitHub') return <FiGithub />;
    if (iconStr === 'IN' || iconStr === 'LinkedIn') return <FiLinkedin />;
    return iconStr;
  };

  return (
    <nav className={`social-links ${className}`} aria-label="Social links" style={{ display: 'flex', gap: 'var(--space-4)' }}>
      {activeLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          title={link.name}
          style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-text-secondary)', transition: 'color var(--transition-fast)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
        >
          {getIcon(link.icon || link.name)}
        </a>
      ))}
    </nav>
  );
}
