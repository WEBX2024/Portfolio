import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Show navbar at top and when scrolling up
      setIsScrolled(currentScrollPos > 0 && currentScrollPos > prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'hide' : ''}`}>
      <div className="nav-brand">
        <Link to="/">Portfolio.</Link>
      </div>
      <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
        <span className="hamburger"></span>
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>About</Link></li>
        <li><Link to="/projects" onClick={toggleMenu}>Projects</Link></li>
        <li><Link to="/skills" onClick={toggleMenu}>Skills</Link></li>
        <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
