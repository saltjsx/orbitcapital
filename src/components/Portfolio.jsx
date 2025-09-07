import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Cpu,
  CreditCard,
  Building2,
  Heart,
  Shield,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
} from "lucide-react";
import "../styles/main.css";
import "../styles/portfolio.css";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const companies = [
    {
      id: 1,
      name: "T7 Chat",
      logo: "T7",
      status: "Active",
      description: "Usage based AI chat, built for anyone.",
      year: 2025,
      amount: "$45M Series B",
      category: "ai",
    },
    {
      id: 2,
      name: "MetaQuantum",
      logo: "MQ",
      status: "Active",
      description:
        "Hardware built for Large Language models, enabling faster inference and training.",
      year: 2024,
      amount: "$30M Series A",
      category: "ai",
    },
    {
      id: 3,
      name: "BananaPay",
      logo: "BP",
      status: "Active",
      description: "Contactless payments for everyone.",
      year: 2022,
      amount: "$25M Series A",
      category: "fintech",
    },
    {
      id: 4,
      name: "DigitalTrade",
      logo: "DT",
      status: "Exited",
      description:
        "Blockchain-based trade finance platform for international commerce.",
      year: 2021,
      amount: "$40M Series B",
      category: "fintech",
    },
    {
      id: 5,
      name: "Workstream",
      logo: "WS",
      status: "Active",
      description:
        "Enterprise workflow optimization and analytics platform for large organizations.",
      year: 2023,
      amount: "$35M Series B",
      category: "enterprise",
    },
    {
      id: 6,
      name: "Cloudy",
      logo: "CD",
      status: "Active",
      description:
        "Multi-cloud orchestration and management platform for enterprise IT infrastructure.",
      year: 2024,
      amount: "$20M Series A",
      category: "enterprise",
    },
    {
      id: 7,
      name: "careAI",
      logo: "CA",
      status: "Active",
      description:
        "AI-powered healthcare data analytics platform for clinical decision support.",
      year: 2023,
      amount: "$28M Series A",
      category: "healthcare",
    },
    {
      id: 8,
      name: "Rehab.co",
      logo: "RE",
      status: "Active",
      description:
        "Virtual rehabilitation and physical therapy platform with IoT integration.",
      year: 2024,
      amount: "$15M Seed",
      category: "healthcare",
    },
    {
      id: 9,
      name: "Onyx",
      logo: "OX",
      status: "Active",
      description:
        "Advanced threat detection and response platform for enterprise cybersecurity.",
      year: 2022,
      amount: "$50M Series C",
      category: "security",
    },
    {
      id: 10,
      name: "Zeitsec",
      logo: "ZT",
      status: "Active",
      description:
        "Zero-trust network security architecture for distributed enterprise environments.",
      year: 2024,
      amount: "$32M Series B",
      category: "security",
    },
    {
      id: 11,
      name: "Muuv",
      logo: "MU",
      status: "Exited",
      description:
        "Machine learning platform for supply chain optimization and logistics management.",
      year: 2020,
      amount: "$22M Series A",
      category: "ai",
    },
    {
      id: 12,
      name: "Datapipe",
      logo: "DP",
      status: "Active",
      description:
        "Real-time data streaming and processing platform for enterprise applications.",
      year: 2025,
      amount: "$18M Seed",
      category: "enterprise",
    },
  ];

  const filteredCompanies =
    activeFilter === "all"
      ? companies
      : companies.filter((company) => company.category === activeFilter);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="container">
      <Header />

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <h1>OUR PORTFOLIO</h1>
          <p>12 Exceptional Technology Companies Driving Innovation</p>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="portfolio-stats">
        <div className="stats-content">
          <div className="stat-card">
            <Target size={32} className="stat-icon" />
            <span className="stat-number">12</span>
            <span className="stat-label">Portfolio Companies</span>
          </div>
          <div className="stat-card">
            <DollarSign size={32} className="stat-icon" />
            <span className="stat-number">$350M+</span>
            <span className="stat-label">Total Invested</span>
          </div>
          <div className="stat-card">
            <TrendingUp size={32} className="stat-icon" />
            <span className="stat-number">2</span>
            <span className="stat-label">Successful Exits</span>
          </div>
          <div className="stat-card">
            <BarChart3 size={32} className="stat-icon" />
            <span className="stat-number">47%</span>
            <span className="stat-label">YoY Revenue Growth</span>
          </div>
        </div>
      </section>

      {/* Portfolio Filter */}
      <section className="portfolio-filter">
        <div className="filter-content">
          <h2>FILTER BY SECTOR</h2>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => handleFilter("all")}
            >
              <Target size={16} />
              ALL
            </button>
            <button
              className={`filter-btn ${activeFilter === "ai" ? "active" : ""}`}
              onClick={() => handleFilter("ai")}
            >
              <Cpu size={16} />
              ARTIFICIAL INTELLIGENCE
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "fintech" ? "active" : ""
              }`}
              onClick={() => handleFilter("fintech")}
            >
              <CreditCard size={16} />
              FINTECH
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "enterprise" ? "active" : ""
              }`}
              onClick={() => handleFilter("enterprise")}
            >
              <Building2 size={16} />
              ENTERPRISE SOFTWARE
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "healthcare" ? "active" : ""
              }`}
              onClick={() => handleFilter("healthcare")}
            >
              <Heart size={16} />
              HEALTHCARE TECH
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "security" ? "active" : ""
              }`}
              onClick={() => handleFilter("security")}
            >
              <Shield size={16} />
              CYBERSECURITY
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Companies */}
      <section className="portfolio-companies">
        <div className="companies-grid">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="company-card"
              data-category={company.category}
            >
              <div className="company-header">
                <div className="company-logo">{company.logo}</div>
                <div
                  className={`company-status ${company.status.toLowerCase()}`}
                >
                  {company.status === "Active" ? (
                    <CheckCircle size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                  {company.status}
                </div>
              </div>
              <h3>{company.name}</h3>
              <p className="company-description">{company.description}</p>
              <div className="company-meta">
                <span className="investment-year">{company.year}</span>
                <span className="investment-amount">{company.amount}</span>
              </div>
              <div className="company-tags">
                <span className="tag">
                  {company.category === "ai"
                    ? "Artificial Intelligence"
                    : company.category === "fintech"
                    ? "Fintech"
                    : company.category === "enterprise"
                    ? "Enterprise Software"
                    : company.category === "healthcare"
                    ? "Healthcare Tech"
                    : "Cybersecurity"}
                </span>
                <span className="tag">
                  {company.name.split(" ")[1] || "Tech"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
