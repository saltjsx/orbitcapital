// Orbit Intranet Authentication (Client-side only)
// Early 2000s style: global object, now loading credentials from external JSON for easier maintenance.
(function (global) {
  var credentialStore = {}; // populated asynchronously
  var credentialsLoaded = false;
  var loadError = null;
  var readyQueue = [];

  function notifyReady() {
    credentialsLoaded = true;
    while (readyQueue.length) {
      try {
        readyQueue.shift()();
      } catch (e) {}
    }
  }

  function loadCredentials() {
    fetch("credentials.json", { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (json) {
        credentialStore = json || {};
        notifyReady();
      })
      .catch(function (err) {
        loadError = err;
        console.error("Failed to load credentials.json:", err);
        notifyReady();
      });
  }

  loadCredentials();

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
    if (!credentialsLoaded) {
      return {
        success: false,
        message: loadError
          ? "Credential load error."
          : "Loading credentials, try again.",
      };
    }
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
    whenReady: function (cb) {
      if (credentialsLoaded) cb();
      else readyQueue.push(cb);
    },
    reload: function () {
      credentialsLoaded = false;
      loadError = null;
      loadCredentials();
    },
  };
})(window);
