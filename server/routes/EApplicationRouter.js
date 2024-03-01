const express = require('express');
const router = express.Router();
const { db } = require("../config/db");

router.get("/", async (req, res) => {
    try {
        const [result] = await db.execute(`SELECT
        A.application_id,
        A.userid,
        A.jobid,
        A.status,
        A.application_date,
        A.resume,
        A.resume_text,
        U.username,
        U.email,
        U.phone,
        U.address,
        U.education,
        U.skills,
        J.title,
        J.companyname
    FROM
        application A
    JOIN users U ON A.userid = U.id
    JOIN job J ON A.jobid = J.jobid;
    `);
        res.json({ result });
        console.log(result);
    } catch (error) {
        console.error('Error fetching application data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
