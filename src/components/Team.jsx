import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Mail,
  Linkedin,
  Users,
  BookOpen,
  UserCheck,
  Handshake,
} from "lucide-react";
import "../styles/main.css";
import "../styles/team.css";

const Team = () => {
  return (
    <div className="container">
      <Header />

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <h1>OUR TEAM</h1>
          <p>Experienced Leaders Driving Technology Innovation</p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="leadership-team">
        <div className="team-content">
          <h2 className="section-title">LEADERSHIP TEAM</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">JM</div>
              </div>
              <div className="member-info">
                <h3>James Mitchell</h3>
                <p className="member-title">Managing Partner & CEO</p>
                <p className="member-description">
                  Former Goldman Sachs Managing Director with 15+ years in
                  technology investment banking. Led over $5B in technology M&A
                  transactions. MBA from Wharton, BS from MIT.
                </p>
                <div className="member-contact">
                  <a href="mailto:j.mitchell@orbitcapital.com">
                    <Mail size={16} />
                    j.mitchell@orbitcapital.com
                  </a>
                  <a href="#" className="linkedin-link">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">SC</div>
              </div>
              <div className="member-info">
                <h3>Sarah Chen</h3>
                <p className="member-title">Senior Partner</p>
                <p className="member-description">
                  Technology investment veteran with focus on enterprise
                  software and AI. Previously VP at Sequoia Capital. 12+ years
                  experience with 20+ successful investments. Stanford MBA, CS
                  degree from Berkeley.
                </p>
                <div className="member-contact">
                  <a href="mailto:s.chen@orbitcapital.com">
                    <Mail size={16} />
                    s.chen@orbitcapital.com
                  </a>
                  <a href="#" className="linkedin-link">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">MR</div>
              </div>
              <div className="member-info">
                <h3>Michael Rodriguez</h3>
                <p className="member-title">Partner</p>
                <p className="member-description">
                  Former McKinsey Principal specializing in technology strategy.
                  Expert in fintech and cybersecurity investments. Led digital
                  transformation initiatives for Fortune 500 companies. Harvard
                  MBA, Engineering from Georgia Tech.
                </p>
                <div className="member-contact">
                  <a href="mailto:m.rodriguez@orbitcapital.com">
                    <Mail size={16} />
                    m.rodriguez@orbitcapital.com
                  </a>
                  <a href="#" className="linkedin-link">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">DP</div>
              </div>
              <div className="member-info">
                <h3>Dr. Priya Patel</h3>
                <p className="member-title">Partner</p>
                <p className="member-description">
                  Healthcare technology specialist and former startup founder.
                  Previously Chief Medical Officer at TechHealth Solutions. MD
                  from Johns Hopkins, PhD in Biomedical Engineering from
                  Stanford.
                </p>
                <div className="member-contact">
                  <a href="mailto:p.patel@orbitcapital.com">
                    <Mail size={16} />
                    p.patel@orbitcapital.com
                  </a>
                  <a href="#" className="linkedin-link">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Team */}
      <section className="investment-team">
        <div className="team-content">
          <h2 className="section-title">INVESTMENT TEAM</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">AK</div>
              </div>
              <div className="member-info">
                <h3>Alex Kim</h3>
                <p className="member-title">Principal</p>
                <p className="member-description">
                  Focuses on AI and machine learning investments. Former Google
                  product manager and startup founder. 8+ years in venture
                  capital. MBA from Kellogg, Computer Science from CMU.
                </p>
                <div className="member-contact">
                  <a href="mailto:a.kim@orbitcapital.com">
                    <Mail size={16} />
                    a.kim@orbitcapital.com
                  </a>
                  <a href="#" className="linkedin-link">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">LT</div>
              </div>
              <div className="member-info">
                <h3>Lisa Thompson</h3>
                <p className="member-title">Vice President</p>
                <p className="member-description">
                  Enterprise software and SaaS specialist. Former Bain & Company
                  consultant with deep expertise in B2B technology markets. MBA
                  from Tuck, Economics from Princeton.
                </p>
                <div className="member-contact">
                  <a href="mailto:l.thompson@orbitcapital.com">
                    <Mail size={16} />
                    l.thompson@orbitcapital.com
                  </a>
                  <a href="#" className="linkedin-link">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">DW</div>
              </div>
              <div className="member-info">
                <h3>David Wang</h3>
                <p className="member-title">Associate</p>
                <p className="member-description">
                  Cybersecurity and infrastructure technology focus. Former
                  software engineer at Microsoft Azure team. Strong technical
                  background in cloud and security technologies. MBA from Booth,
                  CS from Stanford.
                </p>
                <div className="member-contact">
                  <a href="mailto:d.wang@orbitcapital.com">
                    <Mail size={16} />
                    d.wang@orbitcapital.com
                  </a>
                  <a href="#" className="linkedin-link">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <div className="photo-placeholder">RJ</div>
              </div>
              <div className="member-info">
                <h3>Rachel Johnson</h3>
                <p className="member-title">Senior Associate</p>
                <p className="member-description">
                  Fintech and blockchain specialist. Former investment banker at
                  J.P. Morgan covering financial technology sector. CFA
                  charterholder. MBA from Columbia, Finance from NYU Stern.
                </p>
                <div className="member-contact">
                  <a href="mailto:r.johnson@orbitcapital.com">
                    <Mail size={16} />
                    r.johnson@orbitcapital.com
                  </a>
                  <a href="#" className="linkedin-link">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="advisory-board">
        <div className="advisory-content">
          <h2 className="section-title">ADVISORY BOARD</h2>
          <div className="advisory-grid">
            <div className="advisor">
              <div className="advisor-photo">
                <div className="photo-placeholder">RS</div>
              </div>
              <div className="advisor-info">
                <h3>Robert Stone</h3>
                <p className="advisor-title">Former CEO, TechCorp Inc.</p>
                <p className="advisor-description">
                  Technology industry veteran with 25+ years of leadership
                  experience.
                </p>
              </div>
            </div>

            <div className="advisor">
              <div className="advisor-photo">
                <div className="photo-placeholder">MG</div>
              </div>
              <div className="advisor-info">
                <h3>Dr. Maria Garcia</h3>
                <p className="advisor-title">Former CTO, Global Systems</p>
                <p className="advisor-description">
                  Leading expert in artificial intelligence and machine learning
                  systems.
                </p>
              </div>
            </div>

            <div className="advisor">
              <div className="advisor-photo">
                <div className="photo-placeholder">TB</div>
              </div>
              <div className="advisor-info">
                <h3>Thomas Brown</h3>
                <p className="advisor-title">
                  Managing Director, Strategic Ventures
                </p>
                <p className="advisor-description">
                  Investment professional with expertise in growth-stage
                  technology companies.
                </p>
              </div>
            </div>

            <div className="advisor">
              <div className="advisor-photo">
                <div className="photo-placeholder">EL</div>
              </div>
              <div className="advisor-info">
                <h3>Dr. Emily Liu</h3>
                <p className="advisor-title">
                  Former VP Engineering, CloudTech
                </p>
                <p className="advisor-description">
                  Cloud infrastructure and enterprise software architecture
                  specialist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="team-values">
        <div className="values-content">
          <h2 className="section-title">OUR TEAM VALUES</h2>
          <div className="values-list">
            <div className="value-item">
              <Users size={24} className="value-icon" />
              <h3>Collaborative Excellence</h3>
              <p>
                We believe the best investment decisions come from diverse
                perspectives and rigorous debate within our team.
              </p>
            </div>
            <div className="value-item">
              <BookOpen size={24} className="value-icon" />
              <h3>Continuous Learning</h3>
              <p>
                The technology landscape evolves rapidly, and we commit to
                staying at the forefront of industry knowledge and trends.
              </p>
            </div>
            <div className="value-item">
              <UserCheck size={24} className="value-icon" />
              <h3>Entrepreneur-First</h3>
              <p>
                We understand the challenges of building technology companies
                because many of us have been entrepreneurs ourselves.
              </p>
            </div>
            <div className="value-item">
              <Handshake size={24} className="value-icon" />
              <h3>Long-term Partnership</h3>
              <p>
                Our relationships with portfolio companies extend far beyond the
                initial investment, providing ongoing support and guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
