const express = require("express");
const app = express();
const conditionRoutes = require("./routes/conditionRoutes");
app.use(express.json());
app.use("/api/v1", conditionRoutes);
module.exports = app;
