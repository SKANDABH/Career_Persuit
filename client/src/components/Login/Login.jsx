import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 

const Login = () => {
  const [formData,setFormData]=useState({email:'',password:''});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await axios.post('http://localhost:3000/api/Login', formData);

     console.log(response.data);
    

      if(response.status===200){
        Cookies.set('id', response.data.userId);
        console.log(response.data.userId);
        alert("login sucessfull");
        window.location.href="./Home"
        
      }
    } catch (error) {
      console.error('Error during signup:', error.response.data);
     if(!error.response.ok){
      alert("login failed");
     }

    }
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary ">
        <div className="bg-white p-3 w-25">
            <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label >Email</label>
                <input type="email"placeholder='Enter the email' className="form-control rounded-0" name="email"onChange={handleChange}/>
            </div>
            <div className='mb-3'>
            <label >Password</label>
                <input type="password"placeholder='Enter the password' className="form-control rounded-0" name="password"onChange={handleChange}/>
            </div>
            <button className="btn btn-success w-100 " type="submit">Login</button>
            <p>Don't have an account ?
            </p>
            <button className="btn btn-success border  w-100">Create Account</button>
            
            </form>
        </div>
    </div>
  )
}

export default Login