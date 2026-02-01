const API_BASE = "http://localhost:5000";

export async function fetchLogs() {
  const res = await fetch(`${API_BASE}/logs`);
  if (!res.ok) throw new Error("Failed to fetch logs");
  return res.json();
}

export async function sendLog(log) {
  const res = await fetch(`${API_BASE}/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log),
  });

  if (!res.ok) throw new Error("Failed to send log");
  return res.json();
}
