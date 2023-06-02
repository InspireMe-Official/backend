const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  try {
    // Extract the token from the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Missing authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, "your-secret-key");

    if (!decodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Fetch the user from the database based on the decoded token information
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Assign the user object to the request
    req.user = user;

    // Move to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { authenticateUser };
