import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ESignup = () => {
  const [formData, setFormData] = useState({
    companyname: '',
    empid: '',
    password: '',
    description: '',
    industry: ''
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
    } catch (error) {
      console.error('Error during signup:', error.response.data);
      if (error.response.status === 400) {
        alert('Email already exists');
        window.location.href = '/Elogin';
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="companyname" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
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
            className="form-control"
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
            className="form-control"
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
            className="form-control"
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
            className="form-control"
            id="industry"
            name="industry"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ESignup;
