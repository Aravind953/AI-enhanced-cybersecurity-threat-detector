import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div style={styles.page}>
      <h1>Secure Login</h1>

      <input placeholder="Email" style={styles.input} />
      <input
        type="password"
        placeholder="Password"
        style={styles.input}
      />

      <Link to="/dashboard" style={styles.button}>
        Login
      </Link>

      <Link to="/" style={styles.back}>
        ← Back to Home
      </Link>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "#00ffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    fontFamily: "system-ui, sans-serif",
  },
  input: {
    width: "260px",
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #00ffff",
    background: "transparent",
    color: "#00ffff",
  },
  button: {
    marginTop: "10px",
    padding: "12px 26px",
    background: "#00ffff",
    color: "#000",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  back: {
    marginTop: "20px",
    color: "#00ffff",
    textDecoration: "underline",
  },
};
