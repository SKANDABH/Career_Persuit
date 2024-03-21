import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Elogin.css'; 
import { Link } from 'react-router-dom' 

const Elogin = () => {
  const [formData, setFormData] = useState({ companyname: '', empid: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await axios.post('http://localhost:3000/api/Elogin', formData);

      console.log(response.data);
      if (response.status === 200) {
        if (response.data.verification === 1) {
          Cookies.set('companyname', response.data.companyname);
          console.log(response.data.companyname);

          Cookies.set('empid', response.data.empid);
          console.log(response.data.empid);
          alert('Login successful');
          window.location.href = './EHome';
        } else {
          alert('Your credentials are not yet verified. Verification may take up to 24 working hours. If additional details are required, we will contact you.');

        }
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
          <div className='mb-3'>
            <label className="form-label">Company Name</label>
            <input type="text" placeholder='Enter the company name' className="form-input rounded-0" name="companyname" onChange={handleChange} />
          </div>
          <div className='mb-3'>
            <label className="form-label">Employee ID</label>
            <input type="text" placeholder='Enter the employee ID' className="form-input rounded-0" name="empid" onChange={handleChange} />
          </div>
          <div className='mb-3'>
            <label className="form-label">Password</label>
            <input type="password" placeholder='Enter the password' className="form-input rounded-0" name="password" onChange={handleChange} />
          </div>
          <button className="login-button" type="submit">Login</button>
          <p>Don't have an account?</p>
         <Link to='/ESignup'> <button className="create-account-button border" type="button">Create Account</button></Link>
        </form>
      </div>
    </div>
  );
};

export default Elogin;
