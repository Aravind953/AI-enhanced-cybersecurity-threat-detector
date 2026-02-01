const { broadcast } = require("../ws/server");
const express = require("express");
const router = express.Router();
const path = require("path");
const fileStore = require("../utils/fileStore");
const alertEngine = require("../engine/alertEngine");

const LOG_FILE = path.join(__dirname, "../../data/logs.json");

// Load logs on server start
let logs = fileStore.load(LOG_FILE);

router.get("/", (req, res) => {
  res.json({
    count: logs.length,
    logs,
  });
});

router.post("/", (req, res) => {
  const log = {
    ...req.body,
    id: Date.now(),
    time: new Date().toISOString(),
  };

  logs.push(log);
  if (logs.length > 200) logs.shift();

  fileStore.save(LOG_FILE, logs);

  // Send log to alert engine
  alertEngine.processLog(log);
  broadcast({ type: "log", data: log });

  res.status(201).json(log);
});

module.exports = router;
