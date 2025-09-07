import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Target,
  TrendingUp,
  Users,
  Globe,
  CheckCircle,
  Clock,
  UserCheck,
  DollarSign,
  ArrowRight,
  Users2,
  Compass,
  Network,
  UserPlus,
  RefreshCw,
  Settings,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";
import "../styles/main.css";
import "../styles/investments.css";

const Investments = () => {
  return (
    <div className="container">
      <Header />

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <h1>INVESTMENT APPROACH</h1>
          <p>Strategic Capital for Technology Innovation</p>
        </div>
      </section>

      {/* Investment Strategy */}
      <section className="investment-strategy">
        <div className="strategy-content">
          <h2 className="section-title">OUR INVESTMENT STRATEGY</h2>
          <div className="strategy-grid">
            <div className="strategy-item">
              <div className="strategy-icon">
                <div className="icon-circle">
                  <Target size={32} />
                </div>
              </div>
              <h3>Sector Focus</h3>
              <p>
                We concentrate on high-growth technology sectors including AI,
                fintech, enterprise software, cybersecurity, and healthcare
                technology.
              </p>
            </div>
            <div className="strategy-item">
              <div className="strategy-icon">
                <div className="icon-circle">
                  <TrendingUp size={32} />
                </div>
              </div>
              <h3>Stage Flexibility</h3>
              <p>
                From seed to growth stage, we provide capital and expertise
                across all phases of a company's development journey.
              </p>
            </div>
            <div className="strategy-item">
              <div className="strategy-icon">
                <div className="icon-circle">
                  <Users size={32} />
                </div>
              </div>
              <h3>Active Partnership</h3>
              <p>
                We work closely with management teams as strategic partners,
                providing operational expertise and industry connections.
              </p>
            </div>
            <div className="strategy-item">
              <div className="strategy-icon">
                <div className="icon-circle">
                  <Globe size={32} />
                </div>
              </div>
              <h3>Global Reach</h3>
              <p>
                Our investment scope spans North America, Europe, and select
                emerging markets with strong technology ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Criteria */}
      <section className="investment-criteria">
        <div className="criteria-content">
          <h2 className="section-title">INVESTMENT CRITERIA</h2>
          <div className="criteria-container">
            <div className="criteria-main">
              <div className="criteria-item">
                <h3>Market Opportunity</h3>
                <ul>
                  <li>Large and growing addressable market ($1B+ TAM)</li>
                  <li>Clear market need with validated demand</li>
                  <li>Sustainable competitive moat potential</li>
                  <li>Scalable business model</li>
                </ul>
              </div>
              <div className="criteria-item">
                <h3>Technology & Product</h3>
                <ul>
                  <li>Innovative technology with defensible IP</li>
                  <li>Product-market fit demonstrated</li>
                  <li>Strong technical team and architecture</li>
                  <li>Roadmap for continued innovation</li>
                </ul>
              </div>
              <div className="criteria-item">
                <h3>Management Team</h3>
                <ul>
                  <li>Experienced leadership with domain expertise</li>
                  <li>Proven track record of execution</li>
                  <li>Strong vision and strategic thinking</li>
                  <li>Commitment to company growth</li>
                </ul>
              </div>
              <div className="criteria-item">
                <h3>Financial Metrics</h3>
                <ul>
                  <li>Strong revenue growth trajectory</li>
                  <li>Path to profitability clearly defined</li>
                  <li>Efficient capital utilization</li>
                  <li>Attractive unit economics</li>
                </ul>
              </div>
            </div>
            <div className="criteria-sidebar">
              <div className="investment-ranges">
                <h3>Investment Ranges</h3>
                <div className="range-item">
                  <Target size={16} className="range-icon" />
                  <span className="stage">Seed Stage</span>
                  <span className="amount">$5M - $15M</span>
                </div>
                <div className="range-item">
                  <TrendingUp size={16} className="range-icon" />
                  <span className="stage">Series A</span>
                  <span className="amount">$15M - $35M</span>
                </div>
                <div className="range-item">
                  <TrendingUp size={16} className="range-icon" />
                  <span className="stage">Series B</span>
                  <span className="amount">$25M - $60M</span>
                </div>
                <div className="range-item">
                  <TrendingUp size={16} className="range-icon" />
                  <span className="stage">Growth</span>
                  <span className="amount">$50M+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Due Diligence Process */}
      <section className="due-diligence">
        <div className="dd-content">
          <h2 className="section-title">DUE DILIGENCE PROCESS</h2>
          <div className="process-timeline">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <CheckCircle size={24} className="timeline-icon" />
                <h3>Initial Screening</h3>
                <p>
                  Business plan review, market assessment, and preliminary team
                  evaluation.
                </p>
                <span className="timeline-duration">1-2 weeks</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <Target size={24} className="timeline-icon" />
                <h3>Deep Dive Analysis</h3>
                <p>
                  Technical review, financial analysis, and competitive
                  landscape assessment.
                </p>
                <span className="timeline-duration">3-4 weeks</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <Users2 size={24} className="timeline-icon" />
                <h3>Management Meetings</h3>
                <p>
                  Extensive discussions with leadership team and key
                  stakeholders.
                </p>
                <span className="timeline-duration">2-3 weeks</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <UserCheck size={24} className="timeline-icon" />
                <h3>Reference Checks</h3>
                <p>
                  Customer references, industry expert consultations, and
                  background verification.
                </p>
                <span className="timeline-duration">1-2 weeks</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">5</div>
              <div className="timeline-content">
                <DollarSign size={24} className="timeline-icon" />
                <h3>Investment Committee</h3>
                <p>
                  Final presentation to investment committee and funding
                  decision.
                </p>
                <span className="timeline-duration">1 week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Added Services */}
      <section className="value-added">
        <div className="value-content">
          <h2 className="section-title">VALUE-ADDED SERVICES</h2>
          <div className="value-grid">
            <div className="value-service">
              <Compass size={24} className="service-icon" />
              <h3>Strategic Guidance</h3>
              <p>
                Board participation and strategic planning support to help
                companies navigate critical growth decisions and market
                opportunities.
              </p>
            </div>
            <div className="value-service">
              <Network size={24} className="service-icon" />
              <h3>Business Development</h3>
              <p>
                Access to our extensive network of potential customers,
                partners, and distribution channels to accelerate market
                penetration.
              </p>
            </div>
            <div className="value-service">
              <UserPlus size={24} className="service-icon" />
              <h3>Talent Acquisition</h3>
              <p>
                Executive search assistance and connection to top-tier talent
                across all functional areas and leadership positions.
              </p>
            </div>
            <div className="value-service">
              <RefreshCw size={24} className="service-icon" />
              <h3>Follow-on Funding</h3>
              <p>
                Continued financial support and introduction to additional
                investors for subsequent funding rounds and growth initiatives.
              </p>
            </div>
            <div className="value-service">
              <Settings size={24} className="service-icon" />
              <h3>Operational Excellence</h3>
              <p>
                Best practices sharing, operational improvements, and process
                optimization based on our portfolio experience.
              </p>
            </div>
            <div className="value-service">
              <TrendingUpIcon size={24} className="service-icon" />
              <h3>Exit Strategy</h3>
              <p>
                Strategic planning for liquidity events, including IPO
                preparation and acquisition opportunities within our network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="investment-cta">
        <div className="cta-content">
          <h2>READY TO DISCUSS YOUR FUNDING NEEDS?</h2>
          <p>
            We welcome innovative technology companies seeking strategic capital
            and partnership.
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">
              <ArrowRight size={16} />
              SUBMIT PROPOSAL
            </a>
            <a href="/team" className="btn btn-secondary">
              <Users size={16} />
              MEET OUR TEAM
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investments;
