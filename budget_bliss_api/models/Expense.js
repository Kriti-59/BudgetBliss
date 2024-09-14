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
  }
};

module.exports = Expense;
