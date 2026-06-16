const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/cloudinary");

const healthRoutes = require("./routes/healthRoutes");
const testRoutes = require("./routes/testRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/test", testRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
