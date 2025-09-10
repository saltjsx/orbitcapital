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

  // Documents explorer state
  var documents = []; // legacy flat list (kept for backward compat)
  var docRoot = null; // normalized tree root { type:'folder', name:'', children:[] }
  var docPath = []; // array of folder names representing current location
  var documentsLoaded = false;
  var docLoadError = null;

  // Directory now built on demand after credentials load

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

  // ---------- Spinner utilities ----------
  function spinnerMarkup() {
    return (
      '<div class="spinner-wrap">' +
      '<div class="spinner-gear"></div>' +
      '<div class="spinner-text">Loading…</div>' +
      "</div>"
    );
  }

  // Shows a spinner in el, waits ~2s (randomized), and completes after work(cb) signals done.
  function spinThen(el, work, finalize) {
    if (!el) return finalize && finalize();
    el.innerHTML = spinnerMarkup();
    var minDelay = 1700 + Math.floor(Math.random() * 600);
    var delayDone = false;
    var workDone = false;
    function maybeFinish() {
      if (delayDone && workDone) {
        finalize && finalize();
      }
    }
    setTimeout(function () {
      delayDone = true;
      maybeFinish();
    }, minDelay);
    try {
      work(function () {
        workDone = true;
        maybeFinish();
      });
    } catch (e) {
      // if work throws synchronously, still finish after delay
      workDone = true;
      maybeFinish();
    }
  }

  function init() {
    if (!OrbitAuth.requireAuth()) return;
    // Wait for credentials before rendering directory
    OrbitAuth.whenReady(function () {
      buildWelcome();
      renderAnnouncements();
      fetchDocuments(function () {
        renderDocuments();
      });
      renderDirectory();
      renderMetrics();
      renderSystems();
      renderHR();
      buildTicker();
    });
  }

  function fetchDocuments(cb) {
    fetch("documents.json", { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (json) {
        // Backward compatible: accept flat array or nested folders
        documents = Array.isArray(json) ? json : [];
        docRoot = normalizeDocs(json);
        docPath = [];
        documentsLoaded = true;
        cb && cb();
      })
      .catch(function (err) {
        docLoadError = err;
        documentsLoaded = true;
        cb && cb();
        console.error("Failed to load documents.json:", err);
      });
  }

  // ---------- Documents: normalization & helpers ----------
  function normalizeDocs(json) {
    function normalizeItem(item) {
      if (!item || typeof item !== "object") return null;
      var isFolder =
        item.type === "folder" ||
        Array.isArray(item.children) ||
        Array.isArray(item.items);
      if (isFolder) {
        var kids = (item.children || item.items || [])
          .map(normalizeItem)
          .filter(Boolean);
        return {
          type: "folder",
          name: String(item.name || "Folder"),
          children: kids,
        };
      }
      return {
        type: "file",
        name: String(item.name || "Untitled"),
        dept: item.dept || "",
        size: item.size || "",
        modified: item.modified || "",
        url: item.url || "",
      };
    }
    if (Array.isArray(json)) {
      return {
        type: "folder",
        name: "",
        children: json.map(normalizeItem).filter(Boolean),
      };
    }
    if (json && typeof json === "object") {
      if (
        json.type === "folder" ||
        Array.isArray(json.children) ||
        Array.isArray(json.items)
      ) {
        return normalizeItem(json);
      }
      // single file object
      var f = normalizeItem(json);
      return { type: "folder", name: "", children: f ? [f] : [] };
    }
    return { type: "folder", name: "", children: [] };
  }

  function getNodeAtPath(root, pathArr) {
    var node = root;
    for (var i = 0; i < pathArr.length; i++) {
      if (!node || !node.children) break;
      var seg = pathArr[i];
      var next = null;
      for (var j = 0; j < node.children.length; j++) {
        var ch = node.children[j];
        if (ch.type === "folder" && ch.name === seg) {
          next = ch;
          break;
        }
      }
      if (!next) break;
      node = next;
    }
    return node || root;
  }

  function toPathString(arr) {
    return arr.join("/");
  }
  function fromPathString(s) {
    return s ? s.split("/") : [];
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
    var bar = document.querySelector(".ticker");
    spinThen(
      bar,
      function (cb) {
        cb();
      },
      function () {
        buildTicker();
      }
    );
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
    var el = document.getElementById("annBody");
    spinThen(
      el,
      function (cb) {
        cb();
      },
      function () {
        renderAnnouncements();
        flashBox(btn);
      }
    );
  }

  // Choose the right container (module body or standalone view)
  function getDocContainer() {
    var view = document.getElementById("view-documents");
    if (view && !view.classList.contains("hidden")) return view;
    return document.getElementById("docBody");
  }

  function renderDocuments() {
    var el = getDocContainer();
    if (!documentsLoaded) {
      el.innerHTML = "<em>Loading documents...</em>";
      return;
    }
    if (docLoadError) {
      el.innerHTML = '<em style="color:#a00">Error loading documents.json</em>';
      return;
    }
    if (!docRoot) {
      el.innerHTML = "<em>No documents available.</em>";
      return;
    }

    var node = getNodeAtPath(docRoot, docPath);
    var children = (node.children || []).slice();
    // Sort folders first, then files, alpha by name
    children.sort(function (a, b) {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
      return String(a.name)
        .toLowerCase()
        .localeCompare(String(b.name).toLowerCase());
    });

    // Breadcrumb
    var crumb =
      '<div class="explorer-bar">' +
      '<div class="explorer-breadcrumb">' +
      '<a href="#" onclick="Portal.navDoc(' +
      "''" +
      ');return false;">Documents</a>';
    var acc = [];
    for (var i = 0; i < docPath.length; i++) {
      acc.push(docPath[i]);
      crumb +=
        '<span class="sep">›</span><a href="#" onclick="Portal.navDoc(\'' +
        encodeURIComponent(toPathString(acc)) +
        "');return false;\">" +
        escapeHtml(docPath[i]) +
        "</a>";
    }
    crumb +=
      "</div>" +
      '<div class="explorer-actions">' +
      (docPath.length
        ? '<button class="btn-lite" onclick="Portal.navDocUp();return false;">Up</button>'
        : "") +
      '<a class="btn-lite" style="margin-left:8px" href="documents.json" target="_blank">Open JSON</a>' +
      "</div></div>";

    // Rows
    var rows = children
      .map(function (item) {
        if (item.type === "folder") {
          var encoded = encodeURIComponent(
            toPathString(docPath.concat([item.name]))
          );
          return (
            '<tr class="is-folder">' +
            '<td><a href="#" onclick="Portal.navDoc(\'' +
            encoded +
            '\');return false;"><span class="ico folder"></span>' +
            escapeHtml(item.name) +
            "</a></td>" +
            "<td></td><td>&lt;DIR&gt;</td><td></td></tr>"
          );
        } else {
          var nameCell = item.url
            ? '<a href="' +
              escapeHtml(item.url) +
              '" target="_blank"><span class="ico file"></span>' +
              escapeHtml(item.name) +
              "</a>"
            : '<span><span class="ico file"></span>' +
              escapeHtml(item.name) +
              "</span>";
          return (
            "<tr>" +
            "<td>" +
            nameCell +
            "</td>" +
            "<td>" +
            escapeHtml(item.dept || "") +
            "</td>" +
            "<td>" +
            (item.size || "") +
            "</td>" +
            "<td>" +
            (item.modified || "") +
            "</td>" +
            "</tr>"
          );
        }
      })
      .join("");

    el.innerHTML =
      crumb +
      '<table class="data-table explorer-table"><thead><tr><th>Name</th><th>Dept</th><th>Size</th><th>Modified</th></tr></thead><tbody>' +
      rows +
      "</tbody></table>";
  }

  function loadDocuments(btn) {
    var el = getDocContainer();
    spinThen(
      el,
      function (cb) {
        if (!documentsLoaded)
          fetchDocuments(function () {
            cb();
          });
        else cb();
      },
      function () {
        renderDocuments();
        flashBox(btn);
      }
    );
  }

  function navDoc(pathStr) {
    var el = getDocContainer();
    spinThen(
      el,
      function (cb) {
        var p = fromPathString(decodeURIComponent(pathStr || ""));
        var tmp = [];
        for (var i = 0; i < p.length; i++) {
          tmp.push(p[i]);
          var n = getNodeAtPath(docRoot, tmp);
          if (!n || n.type !== "folder") {
            tmp.pop();
            break;
          }
        }
        docPath = tmp;
        cb();
      },
      function () {
        renderDocuments();
      }
    );
  }

  function navDocUp() {
    var el = getDocContainer();
    spinThen(
      el,
      function (cb) {
        if (docPath.length) docPath.pop();
        cb();
      },
      function () {
        renderDocuments();
      }
    );
  }

  function renderDirectory() {
    var el = document.getElementById("dirBody");
    var creds = OrbitAuth._credentials || {};
    var users = Object.keys(creds).map(function (username) {
      var u = creds[username];
      return {
        username: username,
        name: u.displayName,
        role: u.role,
        dept: u.dept,
        email: u.email,
      };
    });
    if (!users.length) {
      el.innerHTML = "<em>Directory unavailable (loading credentials)...</em>";
      return;
    }
    el.innerHTML =
      '<div class="directory">' +
      users
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
    var el = document.getElementById("dirBody");
    spinThen(
      el,
      function (cb) {
        cb();
      },
      function () {
        renderDirectory();
        flashBox(btn);
      }
    );
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
    var el = document.getElementById("repBody");
    spinThen(
      el,
      function (cb) {
        cb();
      },
      function () {
        renderMetrics();
        flashBox(btn);
      }
    );
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
    var el = document.getElementById("sysBody");
    spinThen(
      el,
      function (cb) {
        cb();
      },
      function () {
        renderSystems();
        flashBox(btn);
      }
    );
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
    var el = document.getElementById("hrBody");
    spinThen(
      el,
      function (cb) {
        cb();
      },
      function () {
        renderHR();
        flashBox(btn);
      }
    );
  }

  function showView(view) {
    var sections = document.querySelectorAll(".view-section");
    sections.forEach(function (sec) {
      sec.classList.add("hidden");
    });
    var target = document.getElementById("view-" + view);
    if (target) {
      target.classList.remove("hidden");
      spinThen(
        target,
        function (cb) {
          if (view === "documents" && !documentsLoaded)
            fetchDocuments(function () {
              cb();
            });
          else cb();
        },
        function () {
          if (view === "documents") renderDocuments();
          else target.innerHTML = buildStandalone(view);
        }
      );
    }
    // hide dashboard grid when viewing a section
    var grid = document.getElementById("dashboard-grid");
    if (grid) grid.classList.add("hidden");

    // highlight nav link (support old sidebar and new top subnav)
    var links = document.querySelectorAll(".portal-nav a, .subnav-links a");
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
    navDoc: navDoc,
    navDocUp: navDocUp,
    loadDirectory: loadDirectory,
    loadReports: loadReports,
    loadSystems: loadSystems,
    loadHR: loadHR,
    toggleAllModules: toggleAllModules,
    minimize: minimize,
    showView: showView,
    refreshTicker: refreshTicker,
    reAuth: reAuth,
    logout: logout,
  };
})();
