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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getLatestPosts, formatDate, getExcerpt } from "../utils/blogUtils";
import "../styles/main.css";
import "../styles/home.css";

const Home = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    const loadLatestPosts = async () => {
      try {
        const posts = await getLatestPosts(3);
        setLatestPosts(posts);
      } catch (error) {
        console.error("Error loading latest posts:", error);
      } finally {
        setPostsLoading(false);
      }
    };

    loadLatestPosts();
  }, []);

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
          <h2 className="section-title">LATEST INSIGHTS & ANALYSIS</h2>
          {postsLoading ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#666666",
              }}
            >
              <p>Loading latest posts...</p>
            </div>
          ) : latestPosts.length > 0 ? (
            <div className="news-grid">
              {latestPosts.map((post) => (
                <article key={post.slug} className="news-item">
                  <div className="news-date">
                    <Calendar size={16} style={{ marginRight: "8px" }} />
                    {formatDate(post.date)}
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.summary || getExcerpt(post.content, 120)}</p>
                  <Link to={`/blog/${post.slug}`} className="read-more">
                    Read More <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#666666",
              }}
            >
              <p>No blog posts available yet.</p>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Check back soon for insights and analysis.
              </p>
            </div>
          )}

          {latestPosts.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link to="/blog" className="btn btn-secondary">
                View All Posts <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
