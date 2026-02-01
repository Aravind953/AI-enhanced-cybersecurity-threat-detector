const path = require("path");
const fileStore = require("../utils/fileStore");
const settingsStore = require("../store/settingsStore");
const { broadcast } = require("../ws/server");

const ALERT_FILE = path.join(__dirname, "../../data/alerts.json");

// Load alerts on startup
let alertStore = fileStore.load(ALERT_FILE);

// ---- ML SERVICE CONFIG ----
const ML_ENDPOINT = "http://localhost:8000/score";
const ML_TIMEOUT_MS = 2000;

/* ---------------- MAIN ENTRY ---------------- */
async function processLog(log) {
  const settings = settingsStore.getSettings();

  const ruleAlert = correlate(log);
  const mlScore = await getMlScoreSafe(log);

  if (!ruleAlert && mlScore === null) return null;

  const ruleScore = ruleAlert?.score ?? 0;
  const finalScore = Math.max(ruleScore, mlScore ?? 0);

  if (finalScore < settings.alertThreshold) return null;

  const alert = {
    id: Date.now() + Math.random(),
    type: "Security Event",
    severity: ruleAlert?.severity || "ML Detected",
    score: finalScore,
    mlScore,
    source: log.source || "System",
    description: log.message,
    time: new Date().toISOString(),
    status: "New",
  };

  alertStore.unshift(alert);
  alertStore = alertStore.slice(0, 50);
  fileStore.save(ALERT_FILE, alertStore);
  broadcast({ type: "alert", data: alert });
  return alert;
}

function getAlerts() {
  return alertStore;
}

/* ---------------- RULES ---------------- */
function correlate(log) {
  if (log.level === "ERROR") {
    return createRuleAlert(log, "Critical", 0.9);
  }
  if (log.level === "WARN") {
    return createRuleAlert(log, "Medium", 0.5);
  }
  return null;
}

function createRuleAlert(log, severity, score) {
  return { severity, score };
}

/* ---------------- ML INTEGRATION ---------------- */
async function getMlScoreSafe(log) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      ML_TIMEOUT_MS
    );

    const res = await fetch(ML_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level: log.level,
        message: log.message,
        source: log.source,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();
    return typeof data.anomaly_score === "number"
      ? data.anomaly_score
      : null;
  } catch {
    return null; // ML optional, never blocks alerts
  }
}

module.exports = { processLog, getAlerts };
