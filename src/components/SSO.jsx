import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import "../styles/intranet.css";

const SSO = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { login, user, authLoading, credentialsLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/intranet");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    const result = login(
      formData.username,
      formData.password,
      formData.remember
    );

    if (result.success) {
      setMessage("Login successful. Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        navigate("/intranet");
      }, 600);
    } else {
      setMessage(result.message);
      setMessageType("error");
    }
  };

  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      remember: false,
    });
    setMessage("");
    setMessageType("");
  };

  if (authLoading || credentialsLoading) {
    return (
      <div className="login-body">
        <div className="login-wrapper">
          <div style={{ textAlign: "center", padding: "50px" }}>
            Loading secure sign-in...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-body">
      <div className="login-wrapper">
        <table className="login-panel" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td className="lp-left">
                <div className="product-brand">
                  ORBIT
                  <br />
                  <span>INTRANET</span>
                </div>
                <p className="tagline">
                  Internal Resource & Collaboration Portal
                  <br />
                  <small>Circa 2003 Edition</small>
                </p>
                <ul className="login-bullets">
                  <li>Company Announcements</li>
                  <li>Document Repository</li>
                  <li>HR & IT Resources</li>
                  <li>Team Directory</li>
                  <li>Reports & Metrics</li>
                </ul>
              </td>
              <td className="lp-right">
                <form
                  id="loginForm"
                  className="login-form"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <h1>Secure Sign In</h1>
                  <div className="form-row">
                    <label htmlFor="username">User ID:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      autoFocus
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-row remember-row">
                    <label>
                      <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                      />
                      Remember me
                    </label>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-oldschool">
                      Sign In
                    </button>
                    <button
                      type="reset"
                      className="btn-oldschool secondary"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  </div>
                  <div
                    id="loginMessage"
                    className={`login-message ${messageType}`}
                    aria-live="polite"
                  >
                    {message}
                  </div>
                  <div className="disclaimer">
                    Unauthorized access prohibited. Credentials are processed on
                    this system.
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="login-footer">
          &copy; 2005–2025 Orbit Capital Internal Systems. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default SSO;
