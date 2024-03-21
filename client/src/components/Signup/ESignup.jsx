// ESignup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './ESignup.css'; // Import your CSS file

const ESignup = () => {
  const [formData, setFormData] = useState({
    companyname: '',
    empid: '',
    password: '',
    description: '',
    industry: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await axios.post('http://localhost:3000/api/ESignup', formData);

      console.log(response.data);
      if (response.status === 200) {
        alert('Signup sucess fully');
        window.location.href = '/Elogin';
      }
    } catch (error) {
      console.error('Error during signup:', error.response.data);
      if (error.response.status === 400) {
        alert('Company already exists');
        window.location.href = '/Elogin';
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="companyname" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              className="form-input rounded-0"
              id="companyname"
              name="companyname"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="empid" className="form-label">
              Employee ID
            </label>
            <input
              type="text"
              className="form-input rounded-0"
              id="empid"
              name="empid"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-input rounded-0"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-input rounded-0"
              id="description"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="industry" className="form-label">
              Industry
            </label>
            <input
              type="text"
              className="form-input rounded-0"
              id="industry"
              name="industry"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ESignup;
