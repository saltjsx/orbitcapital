import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Shield,
  Lightbulb,
  Award,
  Handshake,
  Cpu,
  TrendingUp,
  Target,
  Globe,
  BarChart3,
  Users,
  Clock,
  DollarSign,
} from "lucide-react";
import "../styles/main.css";
import "../styles/about.css";

const About = () => {
  return (
    <div className="container">
      <Header />

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <h1>ABOUT ORBIT CAPITAL</h1>
          <p>Pioneering the Future of Technology Investment</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="company-overview">
        <div className="overview-content">
          <div className="overview-text">
            <h2>OUR MISSION</h2>
            <p className="lead">
              Orbit Capital stands at the forefront of technology investment,
              dedicated to identifying and nurturing the next generation of
              transformative companies that will shape our digital future.
            </p>
            <p>
              Since our founding, we have built a reputation as a premier
              investment firm specializing in technology companies across all
              stages of growth. With $12 billion in assets under management and
              over $350 million invested across 12 carefully selected portfolio
              companies, we combine deep industry expertise with strategic
              capital to accelerate innovation.
            </p>
            <p>
              Our approach goes beyond traditional venture capital. We work
              closely with entrepreneurs and management teams to provide not
              only financial resources but also strategic guidance, operational
              expertise, and access to our extensive network of industry leaders
              and partners.
            </p>
          </div>
          <div className="overview-image">
            <img src="/orbit.png" alt="Orbit Capital" className="about-logo" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values">
        <div className="values-content">
          <h2 className="section-title">OUR CORE VALUES</h2>
          <div className="values-grid">
            <div className="value-card">
              <Shield size={32} className="value-icon" />
              <h3>INTEGRITY</h3>
              <p>
                We conduct our business with the highest ethical standards,
                building trust through transparency and accountability in every
                interaction.
              </p>
            </div>
            <div className="value-card">
              <Lightbulb size={32} className="value-icon" />
              <h3>INNOVATION</h3>
              <p>
                We seek out and support groundbreaking technologies and business
                models that have the potential to disrupt industries and create
                new markets.
              </p>
            </div>
            <div className="value-card">
              <Award size={32} className="value-icon" />
              <h3>EXCELLENCE</h3>
              <p>
                We maintain rigorous standards in our investment process and
                portfolio management, striving for exceptional outcomes for all
                stakeholders.
              </p>
            </div>
            <div className="value-card">
              <Handshake size={32} className="value-icon" />
              <h3>PARTNERSHIP</h3>
              <p>
                We believe in building long-term relationships with our
                portfolio companies, providing ongoing support throughout their
                growth journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="philosophy">
        <div className="philosophy-content">
          <h2 className="section-title">INVESTMENT PHILOSOPHY</h2>
          <div className="philosophy-intro">
            <p>
              At Orbit Capital, our investment philosophy is rooted in the
              belief that transformative technology companies require more than
              just capital—they need visionary partners who understand the
              complexities of innovation and market disruption.
            </p>
          </div>
          <div className="philosophy-grid">
            <div className="philosophy-item">
              <div className="philosophy-icon">
                <Cpu size={32} />
              </div>
              <div className="philosophy-number">01</div>
              <h3>Deep Tech Focus</h3>
              <p>
                We prioritize companies developing foundational technologies in
                AI, quantum computing, biotechnology, and advanced materials
                that solve real-world problems at scale.
              </p>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-icon">
                <TrendingUp size={32} />
              </div>
              <div className="philosophy-number">02</div>
              <h3>Founder-Centric Approach</h3>
              <p>
                We invest in exceptional teams with domain expertise and
                entrepreneurial vision, providing flexible capital solutions
                from pre-seed through Series C and beyond.
              </p>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-icon">
                <Target size={32} />
              </div>
              <div className="philosophy-number">03</div>
              <h3>Active Value Creation</h3>
              <p>
                Beyond capital, we offer strategic guidance, industry
                connections, and operational expertise to accelerate growth and
                build defensible market positions.
              </p>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-icon">
                <Globe size={32} />
              </div>
              <div className="philosophy-number">04</div>
              <h3>Global Ecosystem</h3>
              <p>
                We leverage our international network and cross-border expertise
                to help portfolio companies scale globally and navigate complex
                regulatory landscapes.
              </p>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-icon">
                <Users size={32} />
              </div>
              <div className="philosophy-number">05</div>
              <h3>Sustainable Impact</h3>
              <p>
                We seek investments that generate strong financial returns while
                addressing critical global challenges in healthcare, climate,
                and economic inclusion.
              </p>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-icon">
                <Shield size={32} />
              </div>
              <div className="philosophy-number">06</div>
              <h3>Long-Term Vision</h3>
              <p>
                We maintain a patient capital approach, supporting companies
                through market cycles and focusing on building enduring
                businesses that create generational value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="track-record">
        <div className="track-record-content">
          <h2 className="section-title">PROVEN TRACK RECORD</h2>
          <div className="stats-container">
            <div className="stat-item">
              <BarChart3 size={32} className="stat-icon" />
              <div className="stat-visual">
                <div className="stat-bar" data-percentage="85"></div>
              </div>
              <div className="stat-info">
                <span className="stat-number">85%</span>
                <span className="stat-label">
                  Portfolio Companies with Positive Returns
                </span>
              </div>
            </div>
            <div className="stat-item">
              <DollarSign size={32} className="stat-icon" />
              <div className="stat-visual">
                <div className="stat-bar" data-percentage="67"></div>
              </div>
              <div className="stat-info">
                <span className="stat-number">3.2x</span>
                <span className="stat-label">Average Return Multiple</span>
              </div>
            </div>
            <div className="stat-item">
              <Clock size={32} className="stat-icon" />
              <div className="stat-visual">
                <div className="stat-bar" data-percentage="92"></div>
              </div>
              <div className="stat-info">
                <span className="stat-number">20+</span>
                <span className="stat-label">Years of Combined Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
