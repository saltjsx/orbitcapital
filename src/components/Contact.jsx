import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MapPin, Phone, Mail, Clock, ChevronDown } from "lucide-react";
import "../styles/main.css";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    title: "",
    stage: "",
    sector: "",
    amount: "",
    message: "",
    privacy: false,
  });

  const [faqOpen, setFaqOpen] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your proposal has been submitted successfully.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      title: "",
      stage: "",
      sector: "",
      amount: "",
      message: "",
      privacy: false,
    });
  };

  const toggleFaq = (index) => {
    setFaqOpen({
      ...faqOpen,
      [index]: !faqOpen[index],
    });
  };

  return (
    <div className="container">
      <Header />

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-content">
          <h1>CONTACT US</h1>
          <p>Connect with Our Investment Team</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-content">
          <div className="contact-info-side">
            <h2>GET IN TOUCH</h2>
            <p className="contact-intro">
              We welcome discussions with innovative technology companies
              seeking strategic capital and partnership. Our experienced team is
              ready to explore how we can support your growth journey.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">
                  <MapPin size={24} />
                </div>
                <div className="method-info">
                  <h3>Office Location</h3>
                  <p>
                    123 Financial District
                    <br />
                    New York, NY 10004
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <Phone size={24} />
                </div>
                <div className="method-info">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <Mail size={24} />
                </div>
                <div className="method-info">
                  <h3>Email</h3>
                  <p>info@orbitcapital.com</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <Clock size={24} />
                </div>
                <div className="method-info">
                  <h3>Business Hours</h3>
                  <p>
                    Monday - Friday
                    <br />
                    9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-side">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>SUBMIT YOUR PROPOSAL</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Your Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="stage">Funding Stage *</label>
                  <select
                    id="stage"
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Stage</option>
                    <option value="seed">Seed</option>
                    <option value="series-a">Series A</option>
                    <option value="series-b">Series B</option>
                    <option value="series-c">Series C</option>
                    <option value="growth">Growth/Later Stage</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="sector">Technology Sector *</label>
                  <select
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Sector</option>
                    <option value="ai">Artificial Intelligence</option>
                    <option value="fintech">Fintech</option>
                    <option value="enterprise">Enterprise Software</option>
                    <option value="healthcare">Healthcare Tech</option>
                    <option value="security">Cybersecurity</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="amount">Funding Amount Sought</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="e.g., $10M"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Business Description *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Please provide a brief description of your company, technology, market opportunity, and current traction."
                ></textarea>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="privacy" className="checkbox-label">
                  I agree to the
                  <a href="#" className="privacy-link">
                    Privacy Policy
                  </a>{" "}
                  and consent to the processing of my personal data.
                </label>
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                SUBMIT PROPOSAL
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="office-locations">
        <div className="locations-content">
          <h2 className="section-title">OFFICE LOCATIONS</h2>
          <div className="locations-grid">
            <div className="location-card">
              <h3>New York (Headquarters)</h3>
              <div className="location-details">
                <p>
                  ADDRESS: 123 Financial District
                  <br />
                  New York, NY 10004
                </p>
                <p>PHONE: +1 (555) 123-4567</p>
                <p>EMAIL: ny@orbitcapital.com</p>
              </div>
              <div className="location-team">
                <h4>Key Personnel:</h4>
                <p>James Mitchell, Sarah Chen, Michael Rodriguez</p>
              </div>
            </div>

            <div className="location-card">
              <h3>San Francisco</h3>
              <div className="location-details">
                <p>
                  ADDRESS: 456 Sand Hill Road
                  <br />
                  Palo Alto, CA 94301
                </p>
                <p>PHONE: +1 (555) 987-6543</p>
                <p>EMAIL: sf@orbitcapital.com</p>
              </div>
              <div className="location-team">
                <h4>Key Personnel:</h4>
                <p>Alex Kim, Lisa Thompson</p>
              </div>
            </div>

            <div className="location-card">
              <h3>London</h3>
              <div className="location-details">
                <p>
                  ADDRESS: 789 Canary Wharf
                  <br />
                  London E14 5AB, UK
                </p>
                <p>PHONE: +44 20 7123 4567</p>
                <p>EMAIL: london@orbitcapital.com</p>
              </div>
              <div className="location-team">
                <h4>Key Personnel:</h4>
                <p>David Wang, Rachel Johnson</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-content">
          <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="faq-list">
            <div className={`faq-item ${faqOpen[0] ? "active" : ""}`}>
              <div className="faq-question" onClick={() => toggleFaq(0)}>
                <h3>What types of companies does Orbit Capital invest in?</h3>
                <ChevronDown
                  size={20}
                  className={`faq-toggle ${faqOpen[0] ? "rotated" : ""}`}
                />
              </div>
              <div
                className="faq-answer"
                style={{ maxHeight: faqOpen[0] ? "200px" : "0" }}
              >
                <p>
                  We focus exclusively on technology companies across various
                  stages, from seed to growth. Our primary sectors include
                  artificial intelligence, fintech, enterprise software,
                  cybersecurity, and healthcare technology.
                </p>
              </div>
            </div>

            <div className={`faq-item ${faqOpen[1] ? "active" : ""}`}>
              <div className="faq-question" onClick={() => toggleFaq(1)}>
                <h3>What is your typical investment range?</h3>
                <ChevronDown
                  size={20}
                  className={`faq-toggle ${faqOpen[1] ? "rotated" : ""}`}
                />
              </div>
              <div
                className="faq-answer"
                style={{ maxHeight: faqOpen[1] ? "200px" : "0" }}
              >
                <p>
                  Our investment amounts range from $5M for seed stage companies
                  to $50M+ for growth stage opportunities, depending on the
                  company's needs and growth stage.
                </p>
              </div>
            </div>

            <div className={`faq-item ${faqOpen[2] ? "active" : ""}`}>
              <div className="faq-question" onClick={() => toggleFaq(2)}>
                <h3>How long does the investment process take?</h3>
                <ChevronDown
                  size={20}
                  className={`faq-toggle ${faqOpen[2] ? "rotated" : ""}`}
                />
              </div>
              <div
                className="faq-answer"
                style={{ maxHeight: faqOpen[2] ? "200px" : "0" }}
              >
                <p>
                  Our due diligence process typically takes 8-12 weeks from
                  initial proposal to final investment decision, depending on
                  the complexity of the opportunity.
                </p>
              </div>
            </div>

            <div className={`faq-item ${faqOpen[3] ? "active" : ""}`}>
              <div className="faq-question" onClick={() => toggleFaq(3)}>
                <h3>Do you provide follow-on funding?</h3>
                <ChevronDown
                  size={20}
                  className={`faq-toggle ${faqOpen[3] ? "rotated" : ""}`}
                />
              </div>
              <div
                className="faq-answer"
                style={{ maxHeight: faqOpen[3] ? "200px" : "0" }}
              >
                <p>
                  Yes, we actively support our portfolio companies with
                  follow-on funding in subsequent rounds and can introduce them
                  to additional investors when needed.
                </p>
              </div>
            </div>

            <div className={`faq-item ${faqOpen[4] ? "active" : ""}`}>
              <div className="faq-question" onClick={() => toggleFaq(4)}>
                <h3>What geographic regions do you invest in?</h3>
                <ChevronDown
                  size={20}
                  className={`faq-toggle ${faqOpen[4] ? "rotated" : ""}`}
                />
              </div>
              <div
                className="faq-answer"
                style={{ maxHeight: faqOpen[4] ? "200px" : "0" }}
              >
                <p>
                  We invest primarily in North America and Europe, with
                  selective investments in other regions with strong technology
                  ecosystems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
