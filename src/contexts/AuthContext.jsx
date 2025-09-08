import { createContext, useState, useEffect, useCallback } from "react";

// Authentication Context
const AuthContext = createContext();
export default AuthContext; // separate default export for external hook

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState({});
  // authLoading: we're determining if a prior session exists
  const [authLoading, setAuthLoading] = useState(true);
  // credentialsLoading: fetching credential file (doesn't block route guard)
  const [credentialsLoading, setCredentialsLoading] = useState(true);

  const SESSION_KEY = "orbit_session";
  const DEFAULT_TTL = 1000 * 60 * 60 * 12; // 12 hours
  const REMEMBER_TTL = 1000 * 60 * 60 * 24 * 30; // 30 days

  const clearSessionStores = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* noop */
    }
  };

  const loadStoredSession = useCallback(() => {
    const raw =
      localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.user) return null;
      if (parsed.expires && Date.now() > parsed.expires) {
        clearSessionStores();
        return null;
      }
      return parsed;
    } catch {
      clearSessionStores();
      return null;
    }
  }, []);

  // Load credentials from JSON file (non-blocking for auth route decision)
  useEffect(() => {
    let cancelled = false;
    const loadCredentials = async () => {
      try {
        const response = await fetch("/intranet/credentials.json", {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to load credentials");
        const data = await response.json();
        if (!cancelled) setCredentials(data);
      } catch (error) {
        console.error("Failed to load credentials:", error);
      } finally {
        if (!cancelled) setCredentialsLoading(false);
      }
    };
    loadCredentials();
    return () => {
      cancelled = true;
    };
  }, []);

  // Restore prior session first
  useEffect(() => {
    const stored = loadStoredSession();
    if (stored) {
      setUser(stored.user);
      // Refresh expiry if within last 25% of TTL (sliding window)
      if (
        stored.expires &&
        stored.expires - Date.now() <
          (stored.remember ? REMEMBER_TTL : DEFAULT_TTL) * 0.25
      ) {
        try {
          const refreshed = {
            ...stored,
            expires:
              Date.now() + (stored.remember ? REMEMBER_TTL : DEFAULT_TTL),
          };
          localStorage.setItem(SESSION_KEY, JSON.stringify(refreshed));
          if (!stored.remember)
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(refreshed));
        } catch {
          /* ignore */
        }
      }
    }
    setAuthLoading(false);
  }, [loadStoredSession, DEFAULT_TTL, REMEMBER_TTL]);

  const login = (username, password, remember = false) => {
    if (!username || !password) {
      return {
        success: false,
        message: "Please enter both username and password.",
      };
    }

    const userRecord = credentials[username.toLowerCase()];
    if (!userRecord) {
      return { success: false, message: "Invalid credentials." };
    }

    if (userRecord.password !== password) {
      return { success: false, message: "Invalid credentials." };
    }

    const userData = {
      username: username.toLowerCase(),
      displayName: userRecord.displayName,
      role: userRecord.role,
      dept: userRecord.dept,
      email: userRecord.email,
    };

    setUser(userData);

    // Save session (always persist in localStorage for deep-link refresh; mirror in sessionStorage if not remember)
    const sessionData = {
      user: userData,
      ts: Date.now(),
      remember,
      expires: Date.now() + (remember ? REMEMBER_TTL : DEFAULT_TTL),
    };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      if (!remember)
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    } catch {
      console.warn("Failed to persist session");
    }

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    clearSessionStores();
  };

  const requireAuth = () => !!user;

  const value = {
    user,
    login,
    logout,
    requireAuth,
    authLoading,
    credentialsLoading,
    credentials,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// (Hook moved to useAuth.js to satisfy fast refresh guidelines)
