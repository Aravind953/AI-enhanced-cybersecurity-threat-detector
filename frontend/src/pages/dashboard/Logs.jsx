import { useEffect, useRef, useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import { fetchLogs, sendLog } from "../../services/logsApi";
import { useRealtime } from "../../hooks/useRealtime";

export default function Logs() {
  const { settings } = useSettings();
  const [logs, setLogs] = useState([]);
  const containerRef = useRef(null);

  /* ---------------- REAL-TIME LOG STREAM ---------------- */
  useRealtime((payload) => {
    if (payload.type === "log") {
      setLogs((prev) => [...prev.slice(-199), payload.data]);
    }
  });

  /* ---------------- INITIAL LOAD + FALLBACK POLLING ---------------- */
  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogs(data.logs || []);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      }
    };

    loadLogs();
    const interval = setInterval(loadLogs, settings.updateInterval);

    return () => clearInterval(interval);
  }, [settings.updateInterval]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [logs]);

  return (
    <div style={styles.page}>
      <h2>System Logs</h2>
      <p style={styles.subtitle}>
        Real-time logs streamed from backend services.
      </p>

      <button
        onClick={async () => {
          await sendLog({
            level: "ERROR",
            message: "Manual test log from frontend",
            source: "Frontend",
          });
        }}
      >
        Send Test Log
      </button>

      <div style={styles.console} ref={containerRef}>
        {logs.map((log) => (
          <div key={log.id} style={styles.logRow}>
            <span style={styles.time}>
              [{new Date(log.time).toLocaleTimeString()}]
            </span>
            <span style={{ ...styles.level, color: levelColor(log.level) }}>
              {log.level}
            </span>
            <span>{log.message}</span>
          </div>
        ))}

        {logs.length === 0 && (
          <div style={{ opacity: 0.6 }}>No logs available</div>
        )}
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */
function levelColor(level) {
  if (level === "ERROR") return "#ff4d4d";
  if (level === "WARN") return "#ffd24d";
  return "#00ffff";
}

/* ---------------- STYLES ---------------- */
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  subtitle: {
    opacity: 0.7,
  },
  console: {
    height: "420px",
    background: "#000",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "8px",
    padding: "12px",
    fontFamily: "monospace",
    overflowY: "auto",
  },
  logRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "4px",
    whiteSpace: "nowrap",
  },
  time: {
    opacity: 0.6,
  },
  level: {
    width: "60px",
    fontWeight: "bold",
  },
};
