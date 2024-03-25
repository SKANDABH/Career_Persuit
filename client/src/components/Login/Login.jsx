// Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css'; 
import { Link } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/Login', formData);

      if (response.status === 200) {
        Cookies.set('id', response.data.userId);
        alert('Login successful');
        window.location.href = './Userhome';
      }
    } catch (error) {
      console.error('Error during login:', error.response.data);
      if (!error.response.ok) {
        alert('Login failed');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter the email"
              className="form-control rounded-0"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter the password"
              className="form-control rounded-0"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success w-100" type="submit">
            Login
          </button>
          <p>Don't have an account?</p>
        <Link to='/signup'> <button className="btn btn-success border w-100">Create Account</button></Link> 
        </form>
      </div>
    </div>
  );
};

export default Login;
