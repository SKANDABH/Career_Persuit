import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie'; 
const Signup = () => {

    const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    skills: '',
    education: '',
    experience: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleApply = (userId) => {
    // Set the 'id' cookie here
    Cookies.set('id', userId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("entered");
    console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://localhost:3000/api/Signup', formData);

      console.log(response.data);
      handleApply(response.data.userId);
      console.log(response.data.userId);
    } catch (error) {
      console.error('Error during signup:', error.response.data);
      if (error.response.status === 400) {
        alert("Email already exists");
        window.location.href = '/login';
      }

    }
  };
 
  

   
      return (
        <div className="container mt-5">
          <h2 className="mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" name="username" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="tel" className="form-control" id="phone" name="phone" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="skills" className="form-label">Skills</label>
              <input type="text" className="form-control" id="skills" name="skills" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="education" className="form-label">Education</label>
              <input type="text" className="form-control" id="education" name="education" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="experience" className="form-label">Experience</label>
              <input type="text" className="form-control" id="experience" name="experience" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea className="form-control" id="address" name="address" onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary"  >Submit</button>
          </form>
        </div>
      );
  

}

export default Signup