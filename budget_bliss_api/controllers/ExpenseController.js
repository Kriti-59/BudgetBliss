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

// Function to add expenses
const addExpense = async (req, res) => {
  try {
    const { userId, categoryId, amount, date, description } = req.body;

    if (!userId || !categoryId || !amount || !date || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the new expense
    const newExpense = await Expense.create({
      user_id: userId,
      category_id: categoryId,
      amount: amount,
      date: date,
      description: description,
    });

    return res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getExpenses,
  addExpense,
};
