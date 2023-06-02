const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/database");
const router = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(router);
app.use(cors());

const startServer = () => {
  let connectionString;
  if (process.env.NODE_ENV === "dev") {
    connectionString = process.env.MONGODB_COMPASS_URI;
  } else {
    connectionString = process.env.MONGODB_URI;
  }
  connectDB(connectionString);
  app.listen(PORT);
};

startServer();
