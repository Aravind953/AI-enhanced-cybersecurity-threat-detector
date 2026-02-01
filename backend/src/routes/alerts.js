const express = require("express");
const router = express.Router();
const alertEngine = require("../engine/alertEngine");

router.get("/", (req, res) => {
  res.json({
    count: alertEngine.getAlerts().length,
    alerts: alertEngine.getAlerts(),
  });
});

module.exports = router;
