const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mysql = require("mysql2");
const path = require('path');
const db1 = require('./config/db');
app.use(express.json());
app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '8088795774aA#',
//   database: 'JOBPORT',  // Replace with your actual database name
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// const db = pool.promise();
// app.get("/signup",function({}))
const db = require('./config/db');

// Import and use signupRoutes
const signupRoutes = require('./routes/signupRoutes');
app.use('/api/signup', signupRoutes);
const loginRoute = require('./routes/loginRoute');
app.use('/api/login', loginRoute);
const ESignupRoutes=require('./routes/ESignupRoutes');
app.use('/api/ESignup',ESignupRoutes);
const EloginRoutes=require('./routes/EloginRoutes');
app.use('/api/Elogin',EloginRoutes);
const PostjobRoutes=require('./routes/PostjobRoutes');
app.use('/api/Postjob',PostjobRoutes);
const HomeRoute=require('./routes/HomeRoute');
app.use('/api/Home',HomeRoute);
const ApplicationRoute=require('./routes/ApplicationRouter');
app.use('/api/Application',ApplicationRoute);
const EApplicationRoute=require('./routes/EApplicationRouter');
app.use('/api/EApplication',EApplicationRoute);
const AdminRoute=require('./routes/AdminRouter');
app.use('/api/Adminusers',AdminRoute);
const AdmincmpRouter=require('./routes/AdmincmpRouter');
app.use('/api/Admincmp',AdmincmpRouter);


    app.listen(port, () => {
      console.log(`The server has started on port ${port}`);
    });
