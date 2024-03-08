// Application.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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
        console.log(response.data.job);
        console.log('jobid', JOBID);
        console.log('id', UserId);
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
      if(response.status===200){
        alert("CONGRATUALATION !!  YOU APPLIED SUCESSFULLY");
        window.location.href= './Home';
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', padding: '20px' ,backgroundColor:'ButtonShadow'}}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Application Form</h1>
      {Object.keys(job).length > 0 ? (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ color: 'blue' }}>{job.title}</h2>
            <p style={{ color: '#555' }}>Company: {job.companyname}</p>
          </div>
          <div>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.address}</p>
            <hr />
            <label>
              <h5>Education:</h5>
            </label>
            <p>{user.education}</p>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ marginTop: '20px' }}>
        <label htmlFor="resume" style={{ display: 'block', marginBottom: '10px', color: '#777' }}>
          Upload Resume:
        </label>
        <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" style={{ marginBottom: '10px' }} onChange={handleFileChange} />
        <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Submit Application
        </button>
      </form>
        </>
      ) : (
        <p style={{ color: '#777', textAlign: 'center' }}>Loading job details...</p>
      )}
    </div>
  );
};

export default Application;
