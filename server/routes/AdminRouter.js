const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

// GET all users
router.get('/', async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a user by ID
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        // Perform deletion of the user with the specified ID from the database
        // Example SQL query: DELETE FROM users WHERE id = ?
        await db.execute('DELETE FROM users WHERE id = ?', [userId]);
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Modify your backend route to fetch user applications
router.get('/:userId/applications', async (req, res) => {
    try {
        const userId = req.params.userId;
        // const applications = await db.execute('select * from application where userid=?',[userId])
        const applications = await db.execute('SELECT j.title, j.companyname FROM application a, users u, job j WHERE u.id = ? AND u.id = a.userid AND a.jobid = j.jobid GROUP BY j.title, j.companyname', [userId]);
        res.json(applications);
    } catch (error) {
        console.error('Error fetching user applications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
