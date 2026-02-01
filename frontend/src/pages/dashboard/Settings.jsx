import { useSettings } from "../../context/SettingsContext";

export default function Settings() {
  const { settings, setSettings } = useSettings();

  return (
    <div style={styles.page}>
      <h2>System Settings</h2>
      <p style={styles.subtitle}>
        Configure AI behavior, alert sensitivity, and log handling.
      </p>

      {/* AI SENSITIVITY */}
      <div style={styles.panel}>
        <h3>AI Sensitivity</h3>
        <select
          value={settings.aiSensitivity}
          onChange={(e) =>
            setSettings((s) => ({
              ...s,
              aiSensitivity: e.target.value,
            }))
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <p style={styles.help}>
          Controls how aggressively the AI reacts to anomalies.
        </p>
      </div>

      {/* ALERT THRESHOLD */}
      <div style={styles.panel}>
        <h3>Alert Threshold</h3>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={settings.alertThreshold}
          onChange={(e) =>
            setSettings((s) => ({
              ...s,
              alertThreshold: Number(e.target.value),
            }))
          }
        />
        <p>
          Current threshold:{" "}
          <strong>{settings.alertThreshold.toFixed(2)}</strong>
        </p>
        <p style={styles.help}>
          Higher values reduce alert noise but may miss threats.
        </p>
      </div>

      {/* LOG LEVEL */}
      <div style={styles.panel}>
        <h3>Log Verbosity</h3>
        <select
          value={settings.logLevel}
          onChange={(e) =>
            setSettings((s) => ({
              ...s,
              logLevel: e.target.value,
            }))
          }
        >
          <option>INFO</option>
          <option>WARN</option>
          <option>ERROR</option>
        </select>
        <p style={styles.help}>
          Controls which logs are processed by the system.
        </p>
      </div>

      {/* UPDATE INTERVAL */}
      <div style={styles.panel}>
        <h3>Update Interval</h3>
        <input
          type="number"
          min="1000"
          step="500"
          value={settings.updateInterval}
          onChange={(e) =>
            setSettings((s) => ({
              ...s,
              updateInterval: Number(e.target.value),
            }))
          }
        />
        <p style={styles.help}>
          Time (ms) between AI threat updates.
        </p>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "800px",
  },
  subtitle: {
    opacity: 0.7,
  },
  panel: {
    padding: "16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  help: {
    fontSize: "0.85rem",
    opacity: 0.7,
  },
};
