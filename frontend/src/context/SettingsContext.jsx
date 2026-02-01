import { createContext, useContext, useEffect, useState } from "react";


const SettingsContext = createContext();

const DEFAULT_SETTINGS = {
  aiSensitivity: "Medium",
  alertThreshold: 0.6,
  logLevel: "INFO",
  updateInterval: 3000,
};

export function SettingsProvider({ children }) {
  // 🔹 Load from localStorage (or fallback)
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem("app_settings");
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // 🔹 Persist settings on every change
  useEffect(() => {
    localStorage.setItem(
      "app_settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }
  return ctx;
}
