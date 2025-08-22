// Orbit Intranet Authentication (Client-side only)
// Early 2000s style: global object, minimal encapsulation
(function (global) {
  var credentialStore = {
    // username: { password, displayName, role, dept, email }
    jmitchell: {
      password: "orbitCEO!",
      displayName: "James Mitchell",
      role: "CEO",
      dept: "Executive",
      email: "j.mitchell@orbitcapital.com",
    },
    schen: {
      password: "partnerAI#",
      displayName: "Sarah Chen",
      role: "Senior Partner",
      dept: "Investments",
      email: "s.chen@orbitcapital.com",
    },
    mrodriguez: {
      password: "finStrat$",
      displayName: "Michael Rodriguez",
      role: "Partner",
      dept: "Fintech",
      email: "m.rodriguez@orbitcapital.com",
    },
    ppatel: {
      password: "healthTech@1",
      displayName: "Dr. Priya Patel",
      role: "Partner",
      dept: "Healthcare",
      email: "p.patel@orbitcapital.com",
    },
    akim: {
      password: "aiVentures",
      displayName: "Alex Kim",
      role: "Principal",
      dept: "AI",
      email: "a.kim@orbitcapital.com",
    },
    lthompson: {
      password: "enterprise$",
      displayName: "Lisa Thompson",
      role: "Vice President",
      dept: "Enterprise Software",
      email: "l.thompson@orbitcapital.com",
    },
    dwang: {
      password: "secCloud*",
      displayName: "David Wang",
      role: "Associate",
      dept: "Cybersecurity",
      email: "d.wang@orbitcapital.com",
    },
    rjohnson: {
      password: "finBlock#7",
      displayName: "Rachel Johnson",
      role: "Senior Associate",
      dept: "Fintech",
      email: "r.johnson@orbitcapital.com",
    },
    itadmin: {
      password: "Admin!234",
      displayName: "Intranet Administrator",
      role: "IT Admin",
      dept: "IT",
      email: "admin@orbitcapital.com",
    },
    hrmanager: {
      password: "HRmanage99",
      displayName: "HR Manager",
      role: "HR Manager",
      dept: "Human Resources",
      email: "hr@orbitcapital.com",
    },
    brodielam: {
      password: "1234",
      displayName: "Brodie L.",
      role: "Intern",
      dept: "Useless Crap",
      email: "bugbrodie@gmail.com",
    },
  };

  var sessionKey = "orbit_session";

  function saveSession(user, remember) {
    var payload = { user: user, ts: Date.now() };
    if (remember) {
      localStorage.setItem(sessionKey, JSON.stringify(payload));
    } else {
      sessionStorage.setItem(sessionKey, JSON.stringify(payload));
    }
  }

  function readSession() {
    var raw =
      sessionStorage.getItem(sessionKey) || localStorage.getItem(sessionKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function clearSession() {
    sessionStorage.removeItem(sessionKey);
    localStorage.removeItem(sessionKey);
  }

  function login(username, password, remember) {
    if (!username) {
      return { success: false, message: "Enter User ID." };
    }
    if (!password) {
      return { success: false, message: "Enter Password." };
    }
    var record = credentialStore[username.toLowerCase()];
    if (!record) {
      return { success: false, message: "Invalid credentials." };
    }
    if (record.password !== password) {
      return { success: false, message: "Invalid credentials." };
    }
    saveSession(
      {
        username: username.toLowerCase(),
        displayName: record.displayName,
        role: record.role,
        dept: record.dept,
        email: record.email,
      },
      remember
    );
    return { success: true };
  }

  function getCurrentUser() {
    var s = readSession();
    return s ? s.user : null;
  }

  function requireAuth() {
    if (!getCurrentUser()) {
      window.location.replace("sso.html");
      return false;
    }
    return true;
  }

  function logout() {
    clearSession();
    window.location.href = "sso.html";
  }

  // Expose
  global.OrbitAuth = {
    login: login,
    logout: logout,
    getCurrentUser: getCurrentUser,
    requireAuth: requireAuth,
    _credentials: credentialStore,
  };
})(window);
