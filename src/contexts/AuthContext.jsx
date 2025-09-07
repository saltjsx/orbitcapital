import { createContext, useContext, useState, useEffect } from "react";

// Authentication Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(true);

  // Load credentials from JSON file
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const response = await fetch("/intranet/credentials.json");
        if (!response.ok) throw new Error("Failed to load credentials");
        const data = await response.json();
        setCredentials(data);
      } catch (error) {
        console.error("Failed to load credentials:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCredentials();
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const session =
      localStorage.getItem("orbit_session") ||
      sessionStorage.getItem("orbit_session");
    if (session) {
      try {
        const { user: sessionUser } = JSON.parse(session);
        setUser(sessionUser);
      } catch (error) {
        console.error("Failed to parse session:", error);
        localStorage.removeItem("orbit_session");
        sessionStorage.removeItem("orbit_session");
      }
    }
  }, []);

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

    // Save session
    const sessionData = { user: userData, ts: Date.now() };
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("orbit_session", JSON.stringify(sessionData));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("orbit_session");
    sessionStorage.removeItem("orbit_session");
  };

  const requireAuth = () => {
    return !!user;
  };

  const value = {
    user,
    login,
    logout,
    requireAuth,
    loading,
    credentials,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
