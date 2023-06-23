const Quote = require("../models/quote");

const QuoteController = {
  getQuotes: async (req, res) => {
    try {
      console.log("called");
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sort = { createdAt: -1 };
      const quotes = await Quote.find()
        .sort(sort)
        .skip(startIndex)
        .limit(limit);

      const totalQuotes = await Quote.countDocuments();

      const response = {
        quotes,
        currentPage: page,
        totalPages: Math.ceil(totalQuotes / limit),
      };

      if (endIndex < totalQuotes) {
        response.nextPage = page + 1;
      }

      if (startIndex > 0) {
        response.previousPage = page - 1;
      }

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getQuotesByCategory: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const category = req.query.category;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sort = { createdAt: -1 };

      const query = category ? { category } : {};

      const quotes = await Quote.find(query)
        .sort(sort)
        .skip(startIndex)
        .limit(limit);

      const totalQuotes = await Quote.countDocuments(query);

      const response = {
        quotes,
        currentPage: page,
        totalPages: Math.ceil(totalQuotes / limit),
      };

      if (endIndex < totalQuotes) {
        response.nextPage = page + 1;
      }

      if (startIndex > 0) {
        response.previousPage = page - 1;
      }

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createQuote: async (req, res) => {
    try {
      console.log("hello");
      console.log(req.body);
      const { quote, author, category } = req.body;
      const newQuote = new Quote({
        quote,
        author,
        category,
      });

      const savedQuote = await newQuote.save();

      res.status(201).json(savedQuote);
    } catch (error) {
      res.status(500).json({ error: "Failed to create quote" });
    }
  },
  createQuotes: async (req, res) => {
    try {
      const quotes = req.body;
      const savedQuotes = await Quote.create(quotes);
      res.status(201).json(savedQuotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to create quotes" });
    }
  },

  getRandomQuote: async (req, res) => {
    try {
      const count = await Quote.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);
      const randomQuote = await Quote.findOne().skip(randomIndex).exec();

      res.status(200).json(randomQuote);
    } catch (error) {
      res.status(500).json({ error: "Failed to get random quote" });
    }
  },
};

module.exports = QuoteController;
