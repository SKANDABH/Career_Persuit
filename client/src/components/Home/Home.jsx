import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'


const Home = () => {


  const [jobs, setJobs] = useState([]);
  const handleApply= (jobid)  => {
    Cookies.set('jobid',jobid)
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Home');
        console.log('Fetched Jobs:', response.data.jobs);
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }; 
    fetchJobs();
  }, []); 
 

  return (
    <div>
      <h1>Job Listings  </h1>
      <div style={{ backgroundColor: 'lightblue', padding: '20px',paddingBottom: '20px', borderRadius: '10px', margin: '10px',marginBottom:'10px' }}>
        <ul>
          {jobs.map((job) => (
            <li key={job.jobid} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <h3>{job.title}</h3>
              <p>Company: {job.companyname}</p>
              <p>Description: {job.description}</p>
              <p>Location: {job.location}</p>
              <p>Experience Required: {job.experience}</p>
              <p>Skills Required: {job.skills}</p>
              <p>Salary-CTC: {job.ctc}</p>
              <p>Post Date: {job.postDate}</p>
              <Link to={{ pathname: "/Application" }}>
  <button onClick={() => handleApply(job.jobid)}>Apply</button>
</Link>


              
            </li>
            
          ))}
        </ul>
        
        <br/>
      </div>
    </div>
  );
};

export default Home;
