const express=require('express');
const router=express.Router();
const { db }=require("../config/db");

router.post('/',async(req,res)=>{
    const {companyname,empid,password}=req.body;
    try {
        const [existingUsers] = await db.execute(`
          SELECT * FROM company WHERE companyname = ? and password= ? and empid= ?
        `, [ companyname,password,empid]);
        if (existingUsers.length > 0) {

            return res.status(200).json({ message: 'sucess in login' });
        }}
        catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }


}) 
module.exports = router;
