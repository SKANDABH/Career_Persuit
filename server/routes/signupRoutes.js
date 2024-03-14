const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

router.post('/', async (req, res) => {
  const { username, email, password, phone, skills, education, experience, address } = req.body;

  try {
    const [existingUsers] = await db.execute(`
      SELECT * FROM users WHERE email = ?
    `, [ email]);

    if (existingUsers.length > 0) {

        return res.status(400).json({ message: 'Email already in use' });
    }
else{
    const [results] = await db.execute(`
      INSERT INTO users (username, email, password, phone, skills, education, experience, address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [username, email, password, phone, skills, education, experience, address]);

    res.status(200).json({ message: 'User signed up successfully', userId: results.insertId });

  } }catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
