const db = require('../config/database'); 

const Expense = {
  // Fetch expenses for a specific user
  getUserExpenses: async (userId) => {
    try {
      const [rows] = await db.promise().query(
        `SELECT e.id, e.amount, e.date, e.description, c.name AS category
         FROM expenses e
         JOIN categories c ON e.category_id = c.id
         WHERE e.user_id = ?`,
        [userId]
      );
      return rows;
    } catch (error) {
      throw new Error('Database query failed');
    }
  },

  // Add expenses to database
  create: async (expenseData) => {
    const { user_id, category_id, amount, date, description } = expenseData;
    try {
      const [result] = await db
        .promise()
        .query(
          `INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
          [user_id, category_id, amount, date, description]
        );
      return result;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to create expense");
    }
  },
};

module.exports = Expense;
