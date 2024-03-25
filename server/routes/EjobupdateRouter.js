const express = require('express');
const { db } = require('../config/db');
const router = express.Router();

// GET route to fetch jobs by empid
router.get('/:empid', async (req, res) => {
    try {
        const empid = req.params.empid;
        const [result] = await db.execute(`SELECT * FROM job WHERE empid = ?`, [empid]);
        res.json(result);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE route to delete a job by jobid
router.delete('/delete/:jobid', async (req, res) => {
    try {
        const jobid = req.params.jobid;
        const result = await db.execute(`DELETE FROM job WHERE jobid = ?`, [jobid]);
        if (result.affectedRows === 1) {
            res.json({ message: 'Job deleted successfully' });
        } else {
            res.status(404).json({ error: 'Job not found' });
        }
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT route to update a job by jobid
router.put('/update/:jobid', async (req, res) => {
    try {
        const jobid = req.params.jobid;
        const { title, description, skills, experience, location, ctc } = req.body;
        const result = await db.execute(
            `UPDATE job SET title = ?, description = ?, skills = ?, experience = ?, location = ?, ctc = ? WHERE jobid = ?`,
            [title, description, skills, experience, location, ctc, jobid]
        );
        if (result.affectedRows === 1) {
            res.json({ message: 'Job updated successfully' });
        } else {
            res.status(404).json({ error: 'Job not found' });
        }
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
