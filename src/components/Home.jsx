import {
  Users,
  TrendingUp,
  Globe,
  DollarSign,
  Calendar,
  ArrowRight,
  Building2,
  Target,
  BarChart3,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/main.css";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="container">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">PREMIER TECHNOLOGY INVESTMENT FIRM</h1>
            <p className="hero-subtitle">
              Accelerating Innovation Through Strategic Capital
            </p>
            <div className="hero-stats">
              <div className="stat">
                <Building2 size={24} className="stat-icon" />
                <span className="stat-number">$12B</span>
                <span className="stat-label">Assets Under Management</span>
              </div>
              <div className="stat">
                <DollarSign size={24} className="stat-icon" />
                <span className="stat-number">$350M+</span>
                <span className="stat-label">Total Invested</span>
              </div>
              <div className="stat">
                <Target size={24} className="stat-icon" />
                <span className="stat-number">12</span>
                <span className="stat-label">Portfolio Companies</span>
              </div>
            </div>
            <div className="hero-buttons">
              <a href="/portfolio" className="btn btn-primary">
                <Target size={16} />
                VIEW PORTFOLIO
              </a>
              <a href="/contact" className="btn btn-secondary">
                <ArrowRight size={16} />
                CONTACT US
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/orbit.png" alt="Orbit Capital" className="orbit-logo" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-content">
          <h2 className="section-title">WHY CHOOSE ORBIT CAPITAL</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-circle">
                  <Users size={32} />
                </div>
              </div>
              <h3>Strategic Expertise</h3>
              <p>
                Over two decades of experience in technology investments with
                proven track record of success.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-circle">
                  <TrendingUp size={32} />
                </div>
              </div>
              <h3>Growth Acceleration</h3>
              <p>
                We provide not just capital, but strategic guidance to
                accelerate your company's growth trajectory.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-circle">
                  <Globe size={32} />
                </div>
              </div>
              <h3>Global Network</h3>
              <p>
                Access to our extensive network of industry leaders, partners,
                and potential customers worldwide.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-circle">
                  <DollarSign size={32} />
                </div>
              </div>
              <h3>Value Creation</h3>
              <p>
                Focus on long-term value creation through operational excellence
                and strategic positioning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news">
        <div className="news-content">
          <h2 className="section-title">LATEST NEWS & UPDATES</h2>
          <div className="news-grid">
            <article className="news-item">
              <div className="news-date">
                <Calendar size={16} style={{ marginRight: "8px" }} />
                August 15, 2025
              </div>
              <h3>Orbit Capital Leads $50M Series B in AI Startup</h3>
              <p>
                We are pleased to announce our investment in cutting-edge
                artificial intelligence technology that will revolutionize
                enterprise automation.
              </p>
              <a href="#" className="read-more">
                Read More <ArrowRight size={16} />
              </a>
            </article>
            <article className="news-item">
              <div className="news-date">
                <Calendar size={16} style={{ marginRight: "8px" }} />
                August 8, 2025
              </div>
              <h3>Q2 2025 Portfolio Update</h3>
              <p>
                Our portfolio companies continue to show exceptional growth with
                combined revenue increase of 47% year-over-year.
              </p>
              <a href="#" className="read-more">
                Read More <ArrowRight size={16} />
              </a>
            </article>
            <article className="news-item">
              <div className="news-date">
                <Calendar size={16} style={{ marginRight: "8px" }} />
                July 28, 2025
              </div>
              <h3>New Partner Joins Orbit Capital Team</h3>
              <p>
                We welcome Sarah Chen, former VP at Goldman Sachs, to lead our
                enterprise software investment division.
              </p>
              <a href="#" className="read-more">
                Read More <ArrowRight size={16} />
              </a>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
