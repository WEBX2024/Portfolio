/**
 * Reusable section wrapper with consistent layout and header.
 */

export default function Section({
  id,
  label,
  title,
  subtitle,
  alt = false,
  children,
}) {
  return (
    <section id={id} className={`section${alt ? ' section--alt' : ''}`}>
      <div className="container">
        {(label || title || subtitle) && (
          <header className="section__header">
            {label && <span className="section__label">{label}</span>}
            {title && <h2 className="section__title">{title}</h2>}
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
