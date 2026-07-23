/**
 * Reusable Button component with variant support.
 * Renders as <a> when href is provided, <button> otherwise.
 */

export default function Button({
  children,
  variant = 'primary',
  size = '',
  href,
  download,
  disabled,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size && `btn--${size}`,
    disabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
