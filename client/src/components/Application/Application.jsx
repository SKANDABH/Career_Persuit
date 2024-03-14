// Application.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Application.css'; // Import your CSS file

const Application = () => {
  const [job, setJob] = useState({});
  const [user, setUser] = useState({});
  const JOBID = Cookies.get('jobid');
  const UserId = Cookies.get('id');
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Application', { withCredentials: true });
        setJob(response.data.job);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJob();
  }, []);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const response = await axios.post('http://localhost:3000/api/Application', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        alert('CONGRATULATIONS!! YOU APPLIED SUCCESSFULLY');
        window.location.href = './Home';
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="application-container">
      <h1 className="application-header">Application Form</h1>
      {Object.keys(job).length > 0 ? (
        <>
          <div className="job-details">
            <h2 className="job-title">{job.title}</h2>
            <p>Company: {job.companyname}</p>
          </div>
          <div className="user-details">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.address}</p>
            <hr />
            <label className="education-label">
              <h5>Education:</h5>
            </label>
            <p>{user.education}</p>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="resume" className="file-input">
              Upload Resume:
            </label>
            <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            <button type="submit" className="submit-button">
              Submit Application
            </button>
          </form>
        </>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
};

export default Application;
