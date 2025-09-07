import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Portfolio from "./components/Portfolio";
import Investments from "./components/Investments";
import Team from "./components/Team";
import SSO from "./components/SSO";
import Intranet from "./components/Intranet";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/team" element={<Team />} />
      <Route path="/sso" element={<SSO />} />
      <Route
        path="/intranet"
        element={
          <ProtectedRoute>
            <Intranet />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
