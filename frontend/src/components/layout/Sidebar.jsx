import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>AI SOC</h2>

      <nav style={styles.nav}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/dashboard/threats" style={styles.link}>Threats</Link>
        <Link to="/dashboard/alerts" style={styles.link}>Alerts</Link>
        <Link to="/dashboard/logs" style={styles.link}>Logs</Link>
        <Link to="/dashboard/settings" style={styles.link}>Settings</Link>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    background: "#050b16",
    color: "#00ffff",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
    fontSize: "1.5rem",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  link: {
    color: "#00ffff",
    textDecoration: "none",
    opacity: 0.85,
  },
};
