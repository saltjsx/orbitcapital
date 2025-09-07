import { Link } from "react-router-dom";
import "../styles/main.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img
              src="/orbit white.png"
              alt="Orbit Capital"
              className="footer-logo-img"
            />
            <span>ORBIT CAPITAL</span>
          </div>
          <p className="footer-description">
            Premier technology investment firm committed to accelerating
            innovation through strategic capital and expertise.
          </p>
        </div>
        <div className="footer-section">
          <h4>QUICK LINKS</h4>
          <ul className="footer-links">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/investments">Investments</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/sso">Intranet</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>CONTACT INFO</h4>
          <div className="contact-info">
            <p>
              ADDRESS: 123 Financial District
              <br />
              New York, NY 10004
            </p>
            <p>PHONE: +1 (555) 123-4567</p>
            <p>EMAIL: info@orbitcapital.com</p>
          </div>
        </div>
        <div className="footer-section">
          <h4>CONNECT</h4>
          <div className="social-links">
            <a href="#" className="social-link">
              LinkedIn
            </a>
            <a href="#" className="social-link">
              Twitter
            </a>
            <a href="#" className="social-link">
              Bloomberg
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2025 Orbit Capital. All rights reserved. | Privacy Policy |
          Terms of Service
        </p>
      </div>
    </footer>
  );
};

export default Footer;
