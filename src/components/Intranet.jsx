import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/intranet.css";

const Intranet = () => {
  const { user, logout, requireAuth } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");
  const [minimizedModules, setMinimizedModules] = useState({});
  const [documents, setDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [tickerItems] = useState([
    "AI sector report published",
    "System maintenance window Sunday 01:00-03:00 UTC",
    "New compliance training assigned",
    "Portfolio expansion initiative phase 2 approved",
    "Cyber drill scheduled next Wednesday",
    "London office renovation update posted",
  ]);

  // Check authentication
  useEffect(() => {
    if (!requireAuth()) {
      navigate("/sso");
      return;
    }
  }, [requireAuth, navigate]);

  // Load documents
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await fetch("/intranet/documents.json");
        if (!response.ok) throw new Error("Failed to load documents");
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Failed to load documents:", error);
      } finally {
        setDocumentsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const announcements = [
    {
      id: 1,
      date: "2025-08-20",
      title: "Q3 Strategy All-Hands",
      body: "Company-wide meeting scheduled for Sept 5th, 10:00 AM EST.",
    },
    {
      id: 2,
      date: "2025-08-18",
      title: "New Portfolio Company Onboarding",
      body: "Welcome Datapipe engineering team to our ecosystem collaboration channels.",
    },
    {
      id: 3,
      date: "2025-08-15",
      title: "Security Reminder",
      body: "Mandatory password rotation will occur next week.",
    },
  ];

  const metrics = [
    { kpi: "AUM", value: "$12B", change: "▲ 3%" },
    { kpi: "Total Invested", value: "$350M+", change: "▲ 2%" },
    { kpi: "Active Portfolio", value: "12", change: "=" },
    { kpi: "Pipeline Deals", value: "31", change: "▲ 5" },
  ];

  const systems = [
    {
      name: "Auth Gateway",
      status: "Operational",
      badge: "ok",
      latency: "54ms",
    },
    {
      name: "Portfolio DB",
      status: "Operational",
      badge: "ok",
      latency: "189ms",
    },
    {
      name: "Document Store",
      status: "Operational",
      badge: "ok",
      latency: "62ms",
    },
    {
      name: "HR Module",
      status: "Operational",
      badge: "ok",
      latency: "--",
    },
    {
      name: "Analytics Engine",
      status: "Operational",
      badge: "ok",
      latency: "77ms",
    },
  ];

  const hrLinks = [
    { title: "Benefits Overview", url: "#" },
    { title: "Time Off Request Form", url: "#" },
    { title: "Expense Reimbursement", url: "#" },
    { title: "Payroll Schedule", url: "#" },
    { title: "Career Development", url: "#" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/sso");
  };

  const showView = (view) => {
    setActiveView(view);
  };

  const toggleMinimize = (moduleId) => {
    setMinimizedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const toggleAllModules = () => {
    const anyMinimized = Object.values(minimizedModules).some(
      (minimized) => minimized
    );
    const newState = anyMinimized
      ? {}
      : {
          announcements: true,
          documents: true,
          directory: true,
          reports: true,
          systems: true,
          hr: true,
        };
    setMinimizedModules(newState);
  };

  const refreshTicker = () => {
    // Ticker refresh is handled by CSS animation
  };

  const flashBox = (element) => {
    if (element && element.parentElement) {
      const head = element.parentElement;
      head.style.boxShadow = "0 0 0 2px #f9f29d inset";
      setTimeout(() => {
        head.style.boxShadow = "";
      }, 450);
    }
  };

  const renderAnnouncements = () => (
    <div>
      {announcements.map((a) => (
        <div key={a.id} style={{ marginBottom: "10px" }}>
          <div style={{ font: "700 11px Verdana", color: "#1a3d57" }}>
            {a.title}{" "}
            <span style={{ fontWeight: "400", color: "#5b6d78" }}>
              ({a.date})
            </span>
          </div>
          <div style={{ font: "11px Verdana", color: "#2c4863" }}>{a.body}</div>
        </div>
      ))}
    </div>
  );

  const renderDocuments = () => {
    if (documentsLoading) {
      return <em>Loading documents...</em>;
    }

    if (!documents.length) {
      return <em>No documents available.</em>;
    }

    return (
      <>
        <table className="data-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Dept</th>
              <th>Size</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d, idx) => (
              <tr key={idx}>
                <td>
                  {d.url ? (
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#0b3c7a", textDecoration: "underline" }}
                    >
                      {d.name}
                    </a>
                  ) : (
                    <span style={{ color: "#0b3c7a" }}>{d.name}</span>
                  )}
                </td>
                <td>{d.dept}</td>
                <td>{d.size}</td>
                <td>{d.modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{ font: "10px Verdana", marginTop: "6px", color: "#5b6d78" }}
        >
          Click a filename to simulate opening. |{" "}
          <a
            href="/intranet/documents.json"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open documents.json
          </a>
        </div>
      </>
    );
  };

  const renderDirectory = () => {
    if (!user) return <em>Loading directory...</em>;

    // Mock directory data - in real app this would come from API
    const users = [
      {
        name: "James Mitchell",
        role: "CEO",
        dept: "Executive",
        email: "j.mitchell@orbitcapital.com",
      },
      {
        name: "Sarah Chen",
        role: "Senior Partner",
        dept: "Investments",
        email: "s.chen@orbitcapital.com",
      },
      {
        name: "Michael Rodriguez",
        role: "Partner",
        dept: "Fintech",
        email: "m.rodriguez@orbitcapital.com",
      },
      {
        name: "Alex Kim",
        role: "Principal",
        dept: "AI",
        email: "a.kim@orbitcapital.com",
      },
      {
        name: "Lisa Thompson",
        role: "Vice President",
        dept: "Enterprise Software",
        email: "l.thompson@orbitcapital.com",
      },
      {
        name: "David Wang",
        role: "Associate",
        dept: "Cybersecurity",
        email: "d.wang@orbitcapital.com",
      },
    ];

    return (
      <div className="directory">
        {users.map((u, idx) => (
          <div key={idx} className="dir-card">
            <h5>{u.name}</h5>
            <div className="role">{u.role}</div>
            <div className="contact">
              {u.email}
              <br />
              <span style={{ color: "#5b6d78" }}>{u.dept}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMetrics = () => (
    <table className="data-table">
      <thead>
        <tr>
          <th>KPI</th>
          <th>Value</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((m, idx) => (
          <tr key={idx}>
            <td>{m.kpi}</td>
            <td>{m.value}</td>
            <td>{m.change}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderSystems = () => (
    <table className="data-table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Status</th>
          <th>Latency</th>
        </tr>
      </thead>
      <tbody>
        {systems.map((s, idx) => (
          <tr key={idx}>
            <td>{s.name}</td>
            <td>
              <span className={`status-badge ${s.badge}`}>{s.status}</span>
            </td>
            <td>{s.latency}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderHR = () => (
    <ul style={{ margin: "0", paddingLeft: "16px" }}>
      {hrLinks.map((l, idx) => (
        <li key={idx} style={{ marginBottom: "4px" }}>
          <a href={l.url}>{l.title}</a>
        </li>
      ))}
    </ul>
  );

  const renderViewContent = () => {
    switch (activeView) {
      case "announcements":
        return renderAnnouncements();
      case "documents":
        return renderDocuments();
      case "directory":
        return renderDirectory();
      case "reports":
        return renderMetrics();
      case "systems":
        return renderSystems();
      case "hr":
        return renderHR();
      default:
        return null;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="portal">
      <div className="portal-shell">
        <div className="portal-topbar">
          <div className="topbar-logo">Orbit Intranet</div>
          <div className="ticker">
            <span>
              {tickerItems.join("   •   ")} •{" "}
              {tickerItems.slice(0, 3).join("   •   ")}
            </span>
          </div>
          <div className="topbar-user">
            <span>
              Welcome, <strong>{user.displayName}</strong> ({user.role})
            </span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Sign Out
            </a>
          </div>
        </div>

        <div className="portal-main">
          <div className="portal-nav">
            <div className="nav-section">
              <h4>Navigation</h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className={activeView === "dashboard" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveView("dashboard");
                    }}
                  >
                    Home Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      showView("announcements");
                    }}
                  >
                    Announcements
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      showView("documents");
                    }}
                  >
                    Documents
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      showView("directory");
                    }}
                  >
                    Team Directory
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      showView("reports");
                    }}
                  >
                    Reports
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      showView("systems");
                    }}
                  >
                    System Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      showView("hr");
                    }}
                  >
                    HR Resources
                  </a>
                </li>
              </ul>
            </div>

            <div className="nav-section">
              <h4>Shortcuts</h4>
              <ul>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleAllModules();
                    }}
                  >
                    Collapse All
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      refreshTicker();
                    }}
                  >
                    Refresh Ticker
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="portal-content">
            {/* View-specific content */}
            {activeView !== "dashboard" && (
              <div className="view-section">{renderViewContent()}</div>
            )}

            {/* Dashboard Modules */}
            {activeView === "dashboard" && (
              <div className="module-grid">
                {/* Announcements Module */}
                <div className="mod-box">
                  <div className="mod-head">
                    Announcements
                    <div className="mod-tools">
                      <button onClick={() => toggleMinimize("announcements")}>
                        _
                      </button>
                      <button onClick={(e) => flashBox(e.target)}>↻</button>
                    </div>
                  </div>
                  <div
                    className={`mod-body ${
                      minimizedModules.announcements ? "hidden" : ""
                    }`}
                  >
                    {renderAnnouncements()}
                  </div>
                </div>

                {/* Documents Module */}
                <div className="mod-box">
                  <div className="mod-head">
                    Recent Documents
                    <div className="mod-tools">
                      <button onClick={() => toggleMinimize("documents")}>
                        _
                      </button>
                      <button onClick={(e) => flashBox(e.target)}>↻</button>
                    </div>
                  </div>
                  <div
                    className={`mod-body ${
                      minimizedModules.documents ? "hidden" : ""
                    }`}
                  >
                    {renderDocuments()}
                  </div>
                </div>

                {/* Directory Module */}
                <div className="mod-box">
                  <div className="mod-head">
                    Team Directory
                    <div className="mod-tools">
                      <button onClick={() => toggleMinimize("directory")}>
                        _
                      </button>
                      <button onClick={(e) => flashBox(e.target)}>↻</button>
                    </div>
                  </div>
                  <div
                    className={`mod-body ${
                      minimizedModules.directory ? "hidden" : ""
                    }`}
                  >
                    {renderDirectory()}
                  </div>
                </div>

                {/* Reports Module */}
                <div className="mod-box">
                  <div className="mod-head">
                    Key Metrics
                    <div className="mod-tools">
                      <button onClick={() => toggleMinimize("reports")}>
                        _
                      </button>
                      <button onClick={(e) => flashBox(e.target)}>↻</button>
                    </div>
                  </div>
                  <div
                    className={`mod-body ${
                      minimizedModules.reports ? "hidden" : ""
                    }`}
                  >
                    {renderMetrics()}
                  </div>
                </div>

                {/* System Status Module */}
                <div className="mod-box">
                  <div className="mod-head">
                    System Status
                    <div className="mod-tools">
                      <button onClick={() => toggleMinimize("systems")}>
                        _
                      </button>
                      <button onClick={(e) => flashBox(e.target)}>↻</button>
                    </div>
                  </div>
                  <div
                    className={`mod-body ${
                      minimizedModules.systems ? "hidden" : ""
                    }`}
                  >
                    {renderSystems()}
                  </div>
                </div>

                {/* HR Resources Module */}
                <div className="mod-box">
                  <div className="mod-head">
                    HR Resources
                    <div className="mod-tools">
                      <button onClick={() => toggleMinimize("hr")}>_</button>
                      <button onClick={(e) => flashBox(e.target)}>↻</button>
                    </div>
                  </div>
                  <div
                    className={`mod-body ${
                      minimizedModules.hr ? "hidden" : ""
                    }`}
                  >
                    {renderHR()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="portal-footer">
          &copy; 2005–2025 Orbit Capital Internal Portal |
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toggleAllModules();
            }}
          >
            Toggle Modules
          </a>{" "}
          |
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Intranet;
