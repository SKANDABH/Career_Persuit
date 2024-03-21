const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

// GET all companies
router.get('/', async (req, res) => {
    try {
        const [companies] = await db.execute('SELECT * FROM company');
        res.json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT request to verify a company by ID
router.put('/:empid/verify', async (req, res) => {
    const empid = req.params.empid;
    try {
        // Perform verification of the company with the specified ID
        await db.execute('UPDATE company SET verification = true WHERE empid = ?', [empid]);
        res.status(200).json({ message: 'Company verified successfully' });
    } catch (error) {
        console.error('Error verifying company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE request to delete a company by ID
router.delete('/:empid', async (req, res) => {
    const empid = req.params.empid;
    try {
        // Perform deletion of the company with the specified ID
        await db.execute('DELETE FROM company WHERE empid = ?', [empid]);
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
