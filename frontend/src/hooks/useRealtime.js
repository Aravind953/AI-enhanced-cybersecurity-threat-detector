import { useEffect, useRef } from "react";

export function useRealtime(onMessage) {
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        onMessage(payload);
      } catch {}
    };

    return () => ws.close();
  }, [onMessage]);
}
