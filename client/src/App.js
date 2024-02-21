import './App.css';
import Home from "./components/Home/Home"
import Admin from "./components/Admin/Admin"
import Login from "./components/Login/Login"
import ELogin from "./components/Login/Elogin"
import Signup from "./components/Signup/Signup"
import ESignup from "./components/Signup/ESignup"

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/ESignup" element={<ESignup />} />
        <Route path="/Elogin" element={<ELogin />} />


        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
