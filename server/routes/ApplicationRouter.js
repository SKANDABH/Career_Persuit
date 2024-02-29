// ApplicationRouter.js
const express = require('express');
const router = express.Router();
const Cookies = require('js-cookie');
const { db } = require("../config/db");
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const multer = require('multer');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB
});

router.use(fileUpload());   

router.get("/", async (req, res) => {
    // const { resume } = req.body;
    const JOBID = req.cookies.jobid;
    const UserId = req.cookies.id;

    try {
        const [jobResult] = await db.execute(`
            SELECT * FROM job WHERE jobid = ?;
        `, [JOBID]);

        const [userResult] = await db.execute(`
            SELECT * FROM users WHERE id = ?;
        `, [UserId]);
       
        
       

        console.log(jobResult);
        console.log(userResult);
        console.log('jobid', JOBID);

        if (jobResult.length > 0 && userResult.length > 0) {
            res.json({ job: jobResult[0], user: userResult[0]});
        } else {
            res.status(404).json({ message: 'Job or user not found' });
        }
    } catch (error) {
        console.error('Error fetching job or user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post("/", async (req, res) => {
    const JOBID = req.cookies.jobid;
    const UserId = req.cookies.id;  
    const resume = req.files.resume;

    // Use resume.data to get the Buffer of the file
    const fileBuffer = resume.data;

    const pdfData = await pdfParse(fileBuffer);

    // Your database insertion logic here using the extracted text
    const [applicationResult] = await db.execute(`
        INSERT INTO application (userid, jobid, resume_text, status) VALUES (?, ?, ?, ?);
    `, [UserId, JOBID, pdfData.text, 0]);
//     const [applicationResult] = await db.execute(`
//     INSERT INTO application (userid, jobid, resume, status) VALUES (?, ?, ?, ?);
// `, [UserId, JOBID, req.file.buffer || null, 0]);
// res.json({ job: jobResult[0], user: userResult[0], application: applicationResult });


})

module.exports = router;
