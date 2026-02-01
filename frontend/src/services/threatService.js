// Simulates AI-generated threat intelligence
export function fetchThreatData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const threatLevel = Math.random(); // 0 → 1

      resolve({
        threatLevel,
        status:
          threatLevel < 0.33
            ? "Stable"
            : threatLevel < 0.66
            ? "Elevated"
            : "Critical",
        timestamp: new Date().toLocaleTimeString(),
      });
    }, 800); // simulate network delay
  });
}
