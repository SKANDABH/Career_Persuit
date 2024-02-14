import './App.css';
import Home from "./components/Home/Home"
import Admin from "./components/Admin/Admin"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
function App() {
  return (
//     <Router>
//     <Routes>
//         <Route path="/" exact component={Home}></Route>
//         <Route path="/Admin" exact component={Admin}></Route>
//         <Route path="/Login" exact component={Login}></Route>
//         <Route path="/Signup" exact component={Signup}></Route>
//         {/* <Route component={NotFound} /> */}
// </Routes>
      
//     </Router>
<Login/>
  );
}

export default App;
