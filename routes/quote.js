const express = require("express");
const QuoteController = require("../controllers/quoteController");
const router = express.Router();

router.get("/quotes", QuoteController.getQuotes);
router.get("/quotes-category", QuoteController.getQuotesByCategory);
router.post("/quote", QuoteController.createQuote);
router.post("/quotes", QuoteController.createQuotes);
router.get("/quote-random", QuoteController.getRandomQuote);

module.exports = router;
