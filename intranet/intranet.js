// Orbit Intranet Portal Logic (Early 2000s inspired)
// Global Portal object
var Portal = (function () {
  var announcements = [
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

  var documents = [
    {
      name: "Q2_2025_Portfolio_Update.pdf",
      dept: "Investments",
      size: "1.2 MB",
      modified: "2025-08-08",
    },
    {
      name: "HR_Policy_Handbook_v3.doc",
      dept: "HR",
      size: "824 KB",
      modified: "2025-07-30",
    },
    {
      name: "Cyber_Threat_Report_July.xls",
      dept: "Cybersecurity",
      size: "642 KB",
      modified: "2025-07-29",
    },
    {
      name: "AI_Sector_Analysis.ppt",
      dept: "AI",
      size: "2.4 MB",
      modified: "2025-07-20",
    },
  ];

  var directory = Object.keys(OrbitAuth._credentials).map(function (username) {
    var u = OrbitAuth._credentials[username];
    return {
      username: username,
      name: u.displayName,
      role: u.role,
      dept: u.dept,
      email: u.email,
    };
  });

  var metrics = [
    { kpi: "AUM", value: "$12B", change: "▲ 3%" },
    { kpi: "Total Invested", value: "$350M+", change: "▲ 2%" },
    { kpi: "Active Portfolio", value: "12", change: "=" },
    { kpi: "Pipeline Deals", value: "31", change: "▲ 5" },
  ];

  var systems = [
    {
      name: "Auth Gateway",
      status: "Operational",
      badge: "ok",
      latency: "54ms",
    },
    {
      name: "Portfolio DB",
      status: "Degraded",
      badge: "warn",
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
      status: "Offline (Maintenance)",
      badge: "err",
      latency: "--",
    },
    {
      name: "Analytics Engine",
      status: "Operational",
      badge: "ok",
      latency: "77ms",
    },
  ];

  var hrLinks = [
    { title: "Benefits Overview", url: "#" },
    { title: "Time Off Request Form", url: "#" },
    { title: "Expense Reimbursement", url: "#" },
    { title: "Payroll Schedule", url: "#" },
    { title: "Career Development", url: "#" },
  ];

  var tickerItems = [
    "AI sector report published",
    "System maintenance window Sunday 01:00-03:00 UTC",
    "New compliance training assigned",
    "Portfolio expansion initiative phase 2 approved",
    "Cyber drill scheduled next Wednesday",
    "London office renovation update posted",
  ];

  function init() {
    if (!OrbitAuth.requireAuth()) return;
    buildWelcome();
    renderAnnouncements();
    renderDocuments();
    renderDirectory();
    renderMetrics();
    renderSystems();
    renderHR();
    buildTicker();
  }

  function buildWelcome() {
    var user = OrbitAuth.getCurrentUser();
    if (user) {
      document.getElementById("userWelcome").innerHTML =
        "Signed in as <strong>" +
        escapeHtml(user.displayName) +
        "</strong> (" +
        escapeHtml(user.role) +
        ")";
    }
  }

  function buildTicker() {
    var span = document.getElementById("tickerSpan");
    span.textContent =
      tickerItems.join("   •   ") +
      "   •   " +
      tickerItems.slice(0, 3).join("   •   ");
  }

  function refreshTicker() {
    buildTicker();
  }

  function renderAnnouncements() {
    var el = document.getElementById("annBody");
    el.innerHTML = announcements
      .map(function (a) {
        return (
          '<div style="margin-bottom:10px"><div style="font:700 11px Verdana;color:#1a3d57">' +
          escapeHtml(a.title) +
          ' <span style="font-weight:400;color:#5b6d78">(' +
          a.date +
          ')</span></div><div style="font:11px Verdana;color:#2c4863">' +
          escapeHtml(a.body) +
          "</div></div>"
        );
      })
      .join("");
  }

  function refreshAnnouncements(btn) {
    renderAnnouncements();
    flashBox(btn);
  }

  function renderDocuments() {
    var el = document.getElementById("docBody");
    if (!documents.length) {
      el.innerHTML = "<em>No documents available.</em>";
      return;
    }
    var rows = documents
      .map(function (d, idx) {
        return (
          '<tr data-doc-index="' +
          idx +
          '"><td class="doc-link" style="color:#0b3c7a;cursor:pointer;text-decoration:underline">' +
          escapeHtml(d.name) +
          "</td><td>" +
          escapeHtml(d.dept) +
          "</td><td>" +
          d.size +
          "</td><td>" +
          d.modified +
          "</td></tr>"
        );
      })
      .join("");
    el.innerHTML =
      '<table class="data-table"><thead><tr><th>File Name</th><th>Dept</th><th>Size</th><th>Modified</th></tr></thead><tbody>' +
      rows +
      "</tbody></table>" +
      '<div style="font:10px Verdana;margin-top:6px;color:#5b6d78">Click a filename to simulate opening.</div>';

    // Attach click handlers (simulate open)
    el.querySelectorAll("tr[data-doc-index]").forEach(function (tr) {
      tr.addEventListener("click", function () {
        var idx = this.getAttribute("data-doc-index");
        var d = documents[idx];
        alert(
          "Opening document: " +
            d.name +
            "\nDepartment: " +
            d.dept +
            "\nSize: " +
            d.size
        );
      });
    });
  }

  function loadDocuments(btn) {
    renderDocuments();
    flashBox(btn);
  }

  function renderDirectory() {
    var el = document.getElementById("dirBody");
    el.innerHTML =
      '<div class="directory">' +
      directory
        .map(function (u) {
          return (
            '<div class="dir-card"><h5>' +
            escapeHtml(u.name) +
            '</h5><div class="role">' +
            escapeHtml(u.role) +
            '</div><div class="contact">' +
            escapeHtml(u.email) +
            '<br><span style="color:#5b6d78">' +
            escapeHtml(u.dept) +
            "</span></div></div>"
          );
        })
        .join("") +
      "</div>";
  }

  function loadDirectory(btn) {
    renderDirectory();
    flashBox(btn);
  }

  function renderMetrics() {
    var el = document.getElementById("repBody");
    var html =
      '<table class="data-table"><thead><tr><th>KPI</th><th>Value</th><th>Change</th></tr></thead><tbody>' +
      metrics
        .map(function (m) {
          return (
            "<tr><td>" +
            escapeHtml(m.kpi) +
            "</td><td>" +
            m.value +
            "</td><td>" +
            escapeHtml(m.change) +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table>";
    el.innerHTML = html;
  }

  function loadReports(btn) {
    renderMetrics();
    flashBox(btn);
  }

  function renderSystems() {
    var el = document.getElementById("sysBody");
    var html =
      '<table class="data-table"><thead><tr><th>Service</th><th>Status</th><th>Latency</th></tr></thead><tbody>' +
      systems
        .map(function (s) {
          return (
            "<tr><td>" +
            escapeHtml(s.name) +
            '</td><td><span class="status-badge ' +
            s.badge +
            '">' +
            escapeHtml(s.status) +
            "</span></td><td>" +
            escapeHtml(s.latency) +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table>";
    el.innerHTML = html;
  }

  function loadSystems(btn) {
    renderSystems();
    flashBox(btn);
  }

  function renderHR() {
    var el = document.getElementById("hrBody");
    el.innerHTML =
      '<ul style="margin:0;padding-left:16px">' +
      hrLinks
        .map(function (l) {
          return (
            '<li style="margin-bottom:4px"><a href="' +
            l.url +
            '">' +
            escapeHtml(l.title) +
            "</a></li>"
          );
        })
        .join("") +
      "</ul>";
  }

  function loadHR(btn) {
    renderHR();
    flashBox(btn);
  }

  function showView(view) {
    var sections = document.querySelectorAll(".view-section");
    sections.forEach(function (sec) {
      sec.classList.add("hidden");
    });
    var target = document.getElementById("view-" + view);
    if (target) {
      target.classList.remove("hidden");
      target.innerHTML = buildStandalone(view);
    }
    // highlight nav link
    var links = document.querySelectorAll(".portal-nav a");
    links.forEach(function (l) {
      l.classList.remove("active");
    });
    links.forEach(function (l) {
      if (l.textContent.toLowerCase().indexOf(view) !== -1) {
        l.classList.add("active");
      }
    });
  }

  function buildStandalone(view) {
    switch (view) {
      case "announcements":
        return document.getElementById("annBody").innerHTML;
      case "documents":
        return document.getElementById("docBody").innerHTML;
      case "directory":
        return document.getElementById("dirBody").innerHTML;
      case "reports":
        return document.getElementById("repBody").innerHTML;
      case "systems":
        return document.getElementById("sysBody").innerHTML;
      case "hr":
        return document.getElementById("hrBody").innerHTML;
      default:
        return "<em>Unknown view.</em>";
    }
  }

  function toggleAllModules() {
    var bodies = document.querySelectorAll(".mod-body");
    var anyVisible = Array.prototype.some.call(bodies, function (b) {
      return !b.classList.contains("hidden");
    });
    bodies.forEach(function (b) {
      b.classList.toggle("hidden", anyVisible);
    });
  }

  function minimize(btn) {
    var box = btn.closest(".mod-box");
    var body = box.querySelector(".mod-body");
    body.classList.toggle("hidden");
  }

  function flashBox(btn) {
    var head = btn.closest(".mod-head");
    head.style.boxShadow = "0 0 0 2px #f9f29d inset";
    setTimeout(function () {
      head.style.boxShadow = "";
    }, 450);
  }

  function showCredentials() {
    var creds = OrbitAuth._credentials;
    var rows = Object.keys(creds).map(function (k) {
      var c = creds[k];
      return k + " / " + c.password + " / " + c.role;
    });
    alert("Credentials (user / pass / role):\n\n" + rows.join("\n"));
  }

  function reAuth() {
    if (!OrbitAuth.getCurrentUser()) alert("Session missing.");
    else alert("Session OK for " + OrbitAuth.getCurrentUser().displayName);
  }

  function logout() {
    OrbitAuth.logout();
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }

  return {
    init: init,
    refreshAnnouncements: refreshAnnouncements,
    loadDocuments: loadDocuments,
    loadDirectory: loadDirectory,
    loadReports: loadReports,
    loadSystems: loadSystems,
    loadHR: loadHR,
    toggleAllModules: toggleAllModules,
    minimize: minimize,
    showView: showView,
    refreshTicker: refreshTicker,
    showCredentials: showCredentials,
    reAuth: reAuth,
    logout: logout,
  };
})();
