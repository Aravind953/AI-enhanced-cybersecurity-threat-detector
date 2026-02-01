import { createContext, useContext, useState } from "react";

const ThreatContext = createContext(undefined);

export function ThreatProvider({ children }) {
  const [focusedThreat, setFocusedThreat] = useState(null);

  return (
    <ThreatContext.Provider
      value={{ focusedThreat, setFocusedThreat }}
    >
      {children}
    </ThreatContext.Provider>
  );
}

export function useThreat() {
  const context = useContext(ThreatContext);
  if (!context) {
    throw new Error(
      "useThreat must be used inside ThreatProvider"
    );
  }
  return context;
}
