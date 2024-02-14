import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary ">
        <div className="bg-white p-3 w-25">
            <form action="">
            <div className='mb-3'>
                <label >Email</label>
                <input type="email"placeholder='Enter the email' className="form-control rounded-0"/>
            </div>
            <div className='mb-3'>
            <label >Password</label>
                <input type="password"placeholder='Enter the password' className="form-control rounded-0"/>
            </div>
            <button className="btn btn-success w-100 ">Login</button>
            <p>Don't have an account ?
            {/* <Link to="/Signup">Create Account</Link> */}
            </p>
            <button className="btn btn-success border  w-100">Create Account</button>
            
            </form>
        </div>
    </div>
  )
}

export default Login