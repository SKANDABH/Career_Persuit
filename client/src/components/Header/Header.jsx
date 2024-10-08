// Header.jsx

import React from 'react';
import imglogo from "../Assets/logo.png";
import './Header.css'; 
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header-container">
      <img className="logo" src={imglogo} alt="Logo" />
    </div>
  );
}

export default Header;
