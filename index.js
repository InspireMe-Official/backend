const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/database");
const router = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(router);

const startServer = () => {
  let database = "local";
  let connectionString;
  if (process.env.NODE_ENV === "dev") {
    connectionString = process.env.MONGODB_COMPASS_URI;
  } else {
    database = "production";
    connectionString = process.env.MONGODB_URI;
  }
  connectDB(connectionString);
  app.listen(PORT, () => {
    console.log(`Server is in ${database} mode and open at port : ${PORT}`);
  });
};

startServer();
