import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

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
        Cookies.set('companyname',response.data.companyname);
        console.log(response.data.companyname);
        
        Cookies.set('empid',response.data.empid);
        console.log(response.data.empid);
        alert('Login successful');
        window.location.href = './EHome';
      }
    } catch (error) {
      console.error('Error during login:', error.response.data);
      if (!error.response.ok) {
        alert('Login failed');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary ">
      <div className="bg-white p-3 w-25">
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label>Company Name</label>
            <input type="text" placeholder='Enter the company name' className="form-control rounded-0" name="companyname" onChange={handleChange} />
          </div>
          <div className='mb-3'>
            <label>Employee ID</label>
            <input type="text" placeholder='Enter the employee ID' className="form-control rounded-0" name="empid" onChange={handleChange} />
          </div>
          <div className='mb-3'>
            <label>Password</label>
            <input type="password" placeholder='Enter the password' className="form-control rounded-0" name="password" onChange={handleChange} />
          </div>
          <button className="btn btn-success w-100 " type="submit">Login</button>
          <p>Don't have an account?</p>
          <button className="btn btn-success border w-100">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Elogin;
