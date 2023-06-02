const express = require("express");
const QuoteController = require("../controllers/quoteController");
const router = express.Router();

router.get("/quotes", QuoteController.getQuotes);
router.post("/quote", QuoteController.createQuote);
router.get("/quote-random", QuoteController.getRandomQuote);

module.exports = router;
