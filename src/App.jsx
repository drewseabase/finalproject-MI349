import { Routes, Route, Navigate } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Roster from "./pages/Roster";
import Schedule from "./pages/Schedule";
import News from "./pages/News";

// Temporary placeholders (make these files later)
const Placeholder = ({ title }) => (
  <main style={{ padding: "14rem 2rem 4rem" }}>
    <h1>{title}</h1>
    <p>Page coming soon.</p>
  </main>
);

export default function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* safety for old static entry */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />

        {/* REAL roster page */}
        <Route path="/roster" element={<Roster />} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/news" element={<News/>} /> 
        {/* still placeholders */}
        <Route path="/history" element={<Placeholder title="History" />} />

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}


