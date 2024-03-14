// Home.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Home.css'; // Import your CSS file

const Home = () => {
  const [jobs, setJobs] = useState([]);
  
  const handleApply = (jobid) => {
    Cookies.set('jobid', jobid);
  };

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
    <div className="home-container">
      <h1>Job Listings</h1>
      <div className="job-listings">
        <ul>
          {jobs.map((job) => (
            <li key={job.jobid} className="job-item">
              <h3>{job.title}</h3>
              <p>Company: {job.companyname}</p>
              <p>Description: {job.description}</p>
              <p>Location: {job.location}</p>
              <p>Experience Required: {job.experience}</p>
              <p>Skills Required: {job.skills}</p>
              <p>Salary-CTC: {job.ctc}</p>
              <p>Post Date: {job.postDate}</p>
              <Link to={{ pathname: "/Application" }}>
                <button className="apply-button" onClick={() => handleApply(job.jobid)}>
                  Apply
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
