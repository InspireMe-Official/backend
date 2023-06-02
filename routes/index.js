const express = require("express");
const router = express.Router();

const quoteRoutes = require("./quote");
const userRoutes = require("./user");

router.use("/api", quoteRoutes);
router.use("/api", userRoutes);

module.exports = router;
