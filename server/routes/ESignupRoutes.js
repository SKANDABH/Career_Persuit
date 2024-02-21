const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

router.post('/', async (req, res) => {
  const {companyname,empid,
  password,
  description,
  industry} = req.body;

  try {
    const [existingUsers] = await db.execute(`
      SELECT * FROM company WHERE  companyname= ? and empid=?
    `, [ companyname,empid]);

    if (existingUsers.length > 0) {

        return res.status(400).json({ message: 'Email already in use' });
    }
else{
    const [results] = await db.execute(`
      INSERT INTO company (companyname,empid,
        password,
        description,
        industry)
      VALUES (?, ?, ?, ?, ?)
    `, [companyname,empid,
        password,
        description,
        industry]);

    res.json({ message: 'User signed up successfully', userId: results.insertId });
  } }catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
