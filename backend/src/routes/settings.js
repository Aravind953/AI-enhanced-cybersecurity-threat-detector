const express = require("express");
const router = express.Router();
const settingsStore = require("../store/settingsStore");

router.get("/", (req, res) => {
  res.json(settingsStore.getSettings());
});

router.post("/", (req, res) => {
  const updated = settingsStore.updateSettings(req.body);
  res.json(updated);
});

module.exports = router;
