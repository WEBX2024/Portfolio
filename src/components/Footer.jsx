import "../styles/Footer.css";
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <p>
            © {new Date().getFullYear()} Atindra Ghosh. All rights reserved.
          </p>
        </div>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/atindra-ghosh-8099b9229/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="social-icon" />
          </a>
          <a
            href="https://github.com/WEBX2024"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <FaGithub className="social-icon" />
          </a>
          <a
            href="https://www.facebook.com/atindra.ghosh.967"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Profile"
          >
            <FaFacebook className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com/atindra_ghosh_official/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
          >
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
