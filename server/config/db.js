const mysql = require("mysql2");
let alterationDone = false; // Boolean flag to track if alteration has been done

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "8088795774aA#",
    database: "JOBPORT",
    waitForConnection: true,
    connectionLimit: 30,
    queueLimit: 0
});

const db = pool.promise();

// Function to check if the 'verification' column exists in the 'company' table
const checkVerificationColumn = async () => {
  const [columns] = await db.query(`SHOW COLUMNS FROM company LIKE 'verification'`);
  return columns.length > 0; // Return true if column exists, false otherwise
};
const checkempidColumn = async () => {
  const [columns] = await db.query(`SHOW COLUMNS FROM job LIKE 'empid'`);
  return columns.length > 0; // Return true if column exists, false otherwise
};


db.execute('CREATE DATABASE IF NOT EXISTS JOBPORT')
  .then(() => {
    console.log('Connected to MySQL');
    return db.query('USE JOBPORT');
  })
  .then(() => {
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
  .then(() => {
    return db.execute(`
      CREATE TABLE IF NOT EXISTS company(
        companyname varchar(20) NOT NULL,
        empid varchar(10) NOT NULL,
        password varchar(15) NOT NULL,
        description TEXT,
        industry TEXT,
        primary key(empid)
      ); 
    `);
  })
  .then(() => {
    console.log('Company table created');
  })
  .then(async () => {
    if (!alterationDone) {
      const verificationColumnExists = await checkVerificationColumn();
      if (!verificationColumnExists) {
        // Alter the table to add the verification column if it doesn't exist
        await db.execute('ALTER TABLE company ADD COLUMN verification BOOLEAN');
        alterationDone = true; // Set the flag to true to indicate that the alteration has been done
        console.log('Table altered');
      } else {
        console.log('Verification column already exists');
      }
    }
  })
  .then(() => {
    return db.execute(`
      CREATE TABLE IF NOT EXISTS job (
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
    `);
  })
  .then(() => {
    console.log('Job table created');
  })
  .then(async () => {
    if (!alterationDone) {
      const empidColumnExists = await checkempidColumn();
      if (!empidColumnExists) {
        await db.execute('ALTER TABLE job ADD COLUMN empid VARCHAR(10), ADD CONSTRAINT fk_job_empid FOREIGN KEY (empid) REFERENCES company(empid);');
        alterationDone = true; // Set the flag to true to indicate that the alteration has been done
        console.log('Table altered');
      } else {
        console.log('empid column already exists');
      }
    }
  })
  .then(() => {
    return db.execute(`
      CREATE TABLE IF NOT EXISTS application (
        application_id INT AUTO_INCREMENT PRIMARY KEY,
        userid INT,
        jobid INT,
        status BOOLEAN,
        application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resume MEDIUMBLOB,
        FOREIGN KEY (userid) REFERENCES users(id),
        FOREIGN KEY (jobid) REFERENCES job(jobid)
      );
    `);
  })
  .then(() => {
    console.log('Application table created');
  })
  .then(() => {
    return db.execute(`
    CREATE TABLE IF NOT EXISTS feedback (
      feedbackid INT AUTO_INCREMENT,
      jobid INT,
      id INT,
      empid VARCHAR(10),
      rating INT,
      comments TEXT,
      Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (feedbackid),  -- Making feedbackid the primary key
      UNIQUE KEY (jobid, id),    -- Creating a unique constraint on jobid and id
      FOREIGN KEY (jobid) REFERENCES job(jobid),
      FOREIGN KEY (id) REFERENCES users(id),
      FOREIGN KEY (empid) REFERENCES company(empid)
  );
  `);
  })
  .then(() => {
    console.log('Feedback table created');
  })
  .catch((error) => {
    console.error('Error:', error);
  });

module.exports = { db };
