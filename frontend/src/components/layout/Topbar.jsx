export default function Topbar() {
  return (
    <div style={styles.topbar}>
      <span>Dashboard</span>
      <span style={styles.user}>Admin</span>
    </div>
  );
}

const styles = {
  topbar: {
    height: "56px",
    background: "#020814",
    color: "#e6f1ff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  user: {
    opacity: 0.7,
  },
};
