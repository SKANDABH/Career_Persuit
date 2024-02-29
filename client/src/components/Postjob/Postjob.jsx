import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState } from 'react';
const Postjob = () => {
    const [formData,setFormData]=useState({
        title:'',
        companyname:'',
        description:'',
        skills:'',
        expirience:'',
        location:'',
        ctc:'',
        postDate:''

    })
    
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response = await axios.post('http://localhost:3000/api/Postjob', formData);
          if(response.ok){
            alert("Job posted sucessfully")
          }
    }
    catch{}
    
  };

  return (
    <div className="container mt-5">
      <h1>POST JOB HERE</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" name="title" onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="companyname" className="form-label">
            Company Name
          </label>
          <input type="text" className="form-control" id="companyname" name="companyname" onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea className="form-control" id="description" name="description"onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="skills" className="form-label">
            Skills Required
          </label>
          <input type="text" className="form-control" id="skills" name="skills" onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="experience" className="form-label">
            Experience Required
          </label>
          <input type="text" className="form-control" id="experience" name="experience"onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input type="text" className="form-control" id="location" name="location" onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="ctc" className="form-label">
            CTC Salary
          </label>
          <input type="text" className="form-control" id="ctc" name="ctc" onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="postDate" className="form-label">
            Post Date
          </label>
          <input type="date" className="form-control" id="postDate" name="postDate"onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Postjob;
