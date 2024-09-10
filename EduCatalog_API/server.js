const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middlewares/logger");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Route files
const bootcamps = require("./routes/bootcamps");

app.get("/", (req, res) => {
  res.send("Hello from express");
});

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
// for bootcamps it will autmatically use this route /api/v1/bootcamps
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
