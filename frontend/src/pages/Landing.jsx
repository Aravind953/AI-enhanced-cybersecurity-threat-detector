import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        AI-Enhanced Cybersecurity Threat Detection
      </h1>

      <p style={styles.subtitle}>
        Detect anomalies, predict cyber attacks, and visualize
        intelligence using AI-driven behavioral analysis.
      </p>

      <Link to="/login" style={styles.button}>
        Get Started
      </Link>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0a1a2f, #000)",
    color: "#e6f1ff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "40px",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  subtitle: {
    maxWidth: "650px",
    fontSize: "1.2rem",
    opacity: 0.85,
    marginBottom: "40px",
  },
  button: {
    padding: "14px 30px",
    background: "#00ffff",
    color: "#000",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold",
  },
};
