// Central backend settings store

let settings = {
  alertThreshold: 0.6,
  aiSensitivity: "Medium",
};

function getSettings() {
  return settings;
}

function updateSettings(newSettings) {
  settings = { ...settings, ...newSettings };
  return settings;
}

module.exports = {
  getSettings,
  updateSettings,
};
