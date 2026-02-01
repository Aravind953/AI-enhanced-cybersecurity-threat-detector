import DashboardLayout from "../components/layout/DashboardLayout";
import AICore from "../components/ai/AICore";

export default function Dashboard({ children }) {
  return (
    <DashboardLayout>
      {children ? (
        children
      ) : (
        <>
          <h1>Security Overview</h1>
          <p>
            Real-time AI-driven visualization of system behavior and
            threat intelligence.
          </p>

          <div style={{ height: "360px" }}>
            <AICore />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
