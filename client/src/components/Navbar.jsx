import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navLinks } from '../data/navigation';
import { personal } from '../data/personal';
import { useScrollSpy } from '../hooks/useScrollSpy';
import Button from './Button';

import { FiUser, FiCpu, FiGrid, FiBriefcase, FiBook, FiMail } from 'react-icons/fi';

const getNavIcon = (label) => {
  switch (label.toLowerCase()) {
    case 'about': return <FiUser />;
    case 'skills': return <FiCpu />;
    case 'projects': return <FiGrid />;
    case 'experience': return <FiBriefcase />;
    case 'education': return <FiBook />;
    case 'contact': return <FiMail />;
    default: return <FiUser />;
  }
};

const sectionIds = navLinks.map((link) => link.href.replace('#', ''));

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    // Set explicit dark theme once as the universal theme
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  return (
    <motion.nav 
      className="navbar" 
      role="navigation" 
      aria-label="Main navigation" 
      onKeyDown={handleKeyDown}
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container navbar__inner">
        <a href="#" className="navbar__logo" onClick={closeMenu}>
          {personal.firstName}
          <span>.</span>
        </a>

        <button
          className={`navbar__toggle${isOpen ? ' navbar__toggle--open' : ''}`}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar__links${isOpen ? ' navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link${activeId === link.href.replace('#', '') ? ' navbar__link--active' : ''}`}
              onClick={closeMenu}
              aria-label={link.label}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <span className="navbar__link-icon" style={{ fontSize: 'var(--font-size-lg)', display: 'flex' }}>
                {getNavIcon(link.label)}
              </span>
              <span className="navbar__link-text">{link.label}</span>
            </a>
          ))}
          <Button
            variant="outline"
            size="sm"
            href={personal.resumePath}
            download
            className="navbar__resume-btn"
            onClick={closeMenu}
          >
            Resume
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
