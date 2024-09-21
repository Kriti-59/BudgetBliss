const jwt = require("jsonwebtoken");
const Expense = require("../models/Expense");

// Function to get user expenses
const getExpenses = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token missing or improperly formatted" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.userId;

    const expenses = await Expense.getUserExpenses(userId);

    return res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getExpenses,
};
