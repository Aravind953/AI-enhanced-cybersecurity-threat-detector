import { useEffect, useState } from "react";
import AICore from "../../components/ai/AICore";
import { useThreat } from "../../context/ThreatContext";
import { fetchThreatData } from "../../services/threatService";
import { useSettings } from "../../context/SettingsContext";


export default function Threats() {
  const { focusedThreat } = useThreat();
  const { settings } = useSettings();
  const [threatLevel, setThreatLevel] = useState(0.2);
  const [status, setStatus] = useState("Monitoring");

  useEffect(() => {
    if (focusedThreat) {
      const baseLevel =
  focusedThreat.severity === "Critical"
    ? 0.9
    : focusedThreat.severity === "High"
    ? 0.7
    : focusedThreat.severity === "Medium"
    ? 0.45
    : 0.2;

const sensitivityMultiplier =
  settings.aiSensitivity === "High"
    ? 1.3
    : settings.aiSensitivity === "Low"
    ? 0.8
    : 1.0;

setThreatLevel(
  Math.min(1, baseLevel * sensitivityMultiplier)
);
setThreatLevel(
      Math.min(1, baseLevel * sensitivityMultiplier)
    );
    setStatus(focusedThreat.severity);
    return;
    }

    const load = async () => {
      const data = await fetchThreatData();
      setThreatLevel(data.threatLevel);
      setStatus(data.status);
    };

    load();
  }, [focusedThreat]);

  return (
    <div>
      <h2>Threat Analysis</h2>

      {focusedThreat && (
        <div>
          <h3>Focused Threat</h3>
          <p>
            <strong>{focusedThreat.type}</strong>
          </p>
          <p>{focusedThreat.description}</p>
        </div>
      )}

      <p>Status: {status}</p>

      <AICore threatLevel={threatLevel} />
    </div>
  );
}
