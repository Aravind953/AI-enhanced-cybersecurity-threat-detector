import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function DashboardLayout({ children }) {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.main}>
        <Topbar />
        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#000",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    padding: "20px",
    overflow: "auto",
    color: "#e6f1ff",
  },
};
