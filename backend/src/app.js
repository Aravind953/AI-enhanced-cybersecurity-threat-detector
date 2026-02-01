const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", require("./routes/health"));
app.use("/logs", require("./routes/logs"));
app.use("/alerts", require("./routes/alerts"));
app.use("/settings", require("./routes/settings"));


module.exports = app;
