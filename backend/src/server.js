const http = require("http");
const app = require("./app");
const { initWebSocket } = require("./ws/server");

const PORT = 5000;

const server = http.createServer(app);

initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
