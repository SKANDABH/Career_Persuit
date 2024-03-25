const express = require('express');
const router = express.Router();
const { db } = require('../config/db');
const cors = require('cors');

router.use(cors());

router.get('/:empid', async (req, res) => {
    try {
        const empid = req.params.empid;
        console.log(empid)
        const [result] = await db.execute(`Select u.username,j.title,j.companyname,f.rating,f.comments from users u,company c,feedback f,job j where  f.id=u.id and f.empid=c.empid and j.jobid=f.jobid and f.empid=?;`, [empid]);
        console.log(result)
        res.json({ feedback: result });
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
