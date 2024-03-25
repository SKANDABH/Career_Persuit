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

router.get('/CompanyEmpData/:jobid', async (req, res) => {
    try { 
      const jobid = req.params.jobid;
      const [result] = await db.execute('SELECT empid FROM job WHERE jobid = ?', [jobid]);
      if (result.length > 0) {
        const { empid } = result[0];
        res.json({ empid });
      } else {
        res.status(404).json({ error: 'Job not found' });
      }
    } catch (error) {
      console.error('Error fetching company employee data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/feedback', async (req, res) => {
    try {
      const { jobid, id, empid, rating, comments } = req.body;
      console.log(jobid,id,empid)
      const [result] = await db.execute(
        'INSERT INTO feedback (jobid, id, empid, rating, comments) VALUES (?, ?, ?, ?, ?)',
        [jobid, id, empid, rating, comments]
      );


      if (result.affectedRows === 1) {
        res.status(201).json({ message: 'Feedback submitted successfully' });
      } else {
        res.status(500).json({ error: 'Failed to submit feedback' });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/check-feedback', async (req, res) => {
  try {
    const { jobid, id, empid } = req.query;
    // Assuming you have a feedback table in your database
    const query = `SELECT * FROM feedback WHERE jobid = ? AND id = ? AND empid = ?`;
    const [rows, fields] = await db.query(query, [jobid, id, empid]);
    if (rows.length > 0) {
      // Feedback already exists, return response indicating so
      res.json({ exists: true });
    } else {
      // Feedback does not exist
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
