const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mysql = require("mysql2");
const path = require('path');

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '8088795774aA#',
  database: 'JOBPORT',  // Replace with your actual database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

db.execute('CREATE DATABASE IF NOT EXISTS JOBPORT')
  .then(() => {
    console.log('Connected to MySQL');
    // Further actions or start your Express server here if needed
    app.listen(port, () => {
      console.log(`The server has started on port ${port}`);
    });
  })
  .catch(err => console.error('MySQL connection failed:', err));
