import React from 'react';
import { Link } from 'react-router-dom';
import './MHome.css'; // Import your CSS file

const MHome = () => {
  return (
    <div className="main-home-container">
      <div className="welcome-section">
        <h1>Welcome to Our Job Portal</h1>
        <p>Your gateway to exciting career opportunities</p>
      </div>
      <div className="button-container">
        <Link to='/Login' className="button user-button">USER</Link>
        <Link to='/ELogin' className="button employee-button">EMPLOYEE</Link>
      </div>
    </div>
  );
};

export default MHome;
