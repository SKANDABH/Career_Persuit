const express = require('express');
const router = express.Router();
const { db } = require('../config/db');
router.get('/', async (req, res) => {
    try {
      const [jobs] = await db.execute('SELECT * FROM job');
      res.json({ jobs });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;