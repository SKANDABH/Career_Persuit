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
        
       
        const userId = req.query.userId;
        console.log('userid',userId );
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
        AND U.id=?`
    
, [userId]);

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


// router.put('/Approve/:application_id', async (req, res) => {
//     const { application_id } = req.params;
//     try {
//         await db.execute('UPDATE Application SET status = 1 WHERE application_id = ?', [application_id]);
//         res.status(200).json({ message: 'Application approved successfully' });
//     } catch (error) {
//         console.error('Error approving application:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


module.exports = router;
