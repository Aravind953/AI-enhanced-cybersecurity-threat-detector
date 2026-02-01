const WebSocket = require("ws");

let wss;

function initWebSocket(httpServer) {
  wss = new WebSocket.Server({ server: httpServer });

  wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ type: "connected" }));
  });

  console.log("WebSocket server initialized");
}

function broadcast(data) {
  if (!wss) return;
  const payload = JSON.stringify(data);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

module.exports = { initWebSocket, broadcast };
