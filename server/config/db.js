const mysql=require("mysql2");
const pool=mysql.createPool
({

    host:"localhost",
    user:"root",
    password:"8088795774aA#",
    database:"JOBPORT",
    waitForConnection:true,
    connectionLimit:30,
    queueLimit:0
});
const db=pool.promise();
db.execute('CREATE DATABASE IF NOT EXISTS JOBPORT')
  .then(() => {
    console.log('Connected to MySQL');
return db.query('USE JOBPORT')})
.then(() => {
    // Create the 'users' table
    return db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        skills TEXT,
        education TEXT,
        experience TEXT,
        address TEXT
      );
    `);
  })
  .then(() => {
    console.log('Users table created');
  })

    .then(()=>
    {
      return db.execute(`
      CREATE TABLE IF NOT EXISTS company(
        companyname varchar(20) NOT NULL,
        empid varchar(10) NOT NULL,
        password varchar(15) NOT NULL,
        description TEXT,
        industry TEXT,
        primary key(empid)
      ); `);

    })
    .then(() => {
      console.log('company table created');
    })
    .then(() => {
      return db.execute(`
      CREATE TABLE IF NOT EXISTS job(
        jobid INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(20) NOT NULL,
        companyname VARCHAR(20) NOT NULL,
        description TEXT,
        skills VARCHAR(20),
        experience VARCHAR(20),
        location VARCHAR(10),
        ctc INT,
        postDate DATE
    );
    `)
    })
    .then(() => {
      console.log('job table created');
    })
    .then(()=>{
      return db.execute(`
      CREATE TABLE IF NOT EXISTS application (
        application_id INT AUTO_INCREMENT PRIMARY KEY,
        userid INT,
        jobid INT,
        status BOOLEAN,
        application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resume MEDIUMBLOB, -- Use MEDIUMBLOB for storing files
        FOREIGN KEY (userid) REFERENCES users(id),
        FOREIGN KEY (jobid) REFERENCES job(jobid)
      );`)  
      
    })
    .then(() => {
      console.log('application table created');
    })
    
  .catch((error) => {
    console.error('Error creating table:', error);
  });
module.exports={db,};