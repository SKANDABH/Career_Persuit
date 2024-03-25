import './App.css';
import Home from "./components/Home/Home"
import EHome from "./components/Home/EHome"
import Admin from "./components/Admin/Admin"
import Login from "./components/Login/Login"
import ELogin from "./components/Login/Elogin"
import Signup from "./components/Signup/Signup"
import ESignup from "./components/Signup/ESignup"
import Postjob from "./components/Postjob/Postjob"
import Application from './components/Application/Application';
import EApplication from './components/EApplication/EApplication';
import MHome from "./components/MHome/MHome.jsx";
import Adminuser from "./components/Admin/Adminusers"
import Admincmp from "./components/Admin/Admincmp"
import Userhome from "./components/Home/Userhome"
import Applicationstatus from './components/Application/Applicationstatus';
import Efeedback from "./components/EApplication/Efeedback"
import Ejobupdate from "./components/Postjob/Ejobupdate"








import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MHome />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/EHome" element={<EHome />} />
        <Route path="/Userhome" element={<Userhome />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Adminusers" element={<Adminuser />} />
        <Route path="/Admincmp" element={<Admincmp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ESignup" element={<ESignup />} />
        <Route path="/Elogin" element={<ELogin />} />
        <Route path="/Postjob" element={<Postjob />} />
        <Route path="/Ejobupdate" element={<Ejobupdate />} />
        <Route path="/Application" element={<Application />} />
        <Route path="/Applicationstatus" element={<Applicationstatus />} />
        <Route path="/EApplication" element={<EApplication />} />
        <Route path="/Efeedback" element={<Efeedback />} />

        





        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
