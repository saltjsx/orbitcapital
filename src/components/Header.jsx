import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUp } from "lucide-react";
import "../styles/main.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img
              src="/orbit white.png"
              alt="Orbit Capital"
              className="logo-img"
            />
            <span className="company-name">ORBIT CAPITAL</span>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} color="#ffffff" />
            ) : (
              <Menu size={24} color="#ffffff" />
            )}
          </button>

          <nav className="navigation">
            <ul className={`nav-menu ${isMobileMenuOpen ? "mobile-open" : ""}`}>
              <li>
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                  onClick={closeMobileMenu}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={location.pathname === "/about" ? "active" : ""}
                  onClick={closeMobileMenu}
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className={location.pathname === "/portfolio" ? "active" : ""}
                  onClick={closeMobileMenu}
                >
                  PORTFOLIO
                </Link>
              </li>
              <li>
                <Link
                  to="/investments"
                  className={
                    location.pathname === "/investments" ? "active" : ""
                  }
                  onClick={closeMobileMenu}
                >
                  INVESTMENTS
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className={location.pathname === "/team" ? "active" : ""}
                  onClick={closeMobileMenu}
                >
                  TEAM
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={location.pathname === "/contact" ? "active" : ""}
                  onClick={closeMobileMenu}
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default Header;
