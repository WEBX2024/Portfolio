import { personal } from '../data/personal';
import { navLinks, socialLinks } from '../data/navigation';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {year} {personal.name}. All rights reserved.
        </p>

        <nav className="footer__links" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="footer__link">
              {link.label}
            </a>
          ))}
        </nav>

        <SocialLinks links={socialLinks} />
      </div>
    </footer>
  );
}
