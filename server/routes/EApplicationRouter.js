const express = require('express');
const router = express.Router();
const { db } = require("../config/db");
const Cookies = require('js-cookie');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const cors = require('cors');
router.use(cors());

router.get("/", async (req, res) => {
    try {
        
       
        const companyname = req.query.companyname;
        console.log('CMP', companyname);
        const [result] = await db.execute(`
        SELECT
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
        application A,
        job J,
        users U
    WHERE
        A.userid = U.id
        AND A.jobid = J.jobid
        AND J.companyname =?;
    
`, [companyname]);

// if ({{result}} === null) {
//     res.sendStatus(404);
if (result === null || result.length === 0) {
    res.sendStatus(404);
    return; // Adding return to avoid further execution
}

        res.json({ result });
        console.log(result);
    } catch (error) {
        console.error('Error fetching application data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
