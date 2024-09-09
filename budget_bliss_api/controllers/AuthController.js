const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); 

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [result] = await db.promise().query(sql, [email]);

    // Check if the user exists
    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result[0];

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token if login is successful
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });

  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).send('Server error');
  }
};


module.exports = { loginUser };
