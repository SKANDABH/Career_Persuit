import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Ejobupdate.css'; // Import your CSS file

const Ejobupdate = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updatedJobDetails, setUpdatedJobDetails] = useState({
    title: '',
    description: '',
    skills:'',
    experience:'',
    location:'',
    ctc:'',
  });

  const fetchJobs = async () => {
    try {
      const empid = Cookies.get('empid');
      const response = await axios.get(`http://localhost:3000/api/Ejobupdate/${empid}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleDelete = async (jobid) => {
    try {
      const reply = window.confirm("Are you sure you want to delete this job?");
      if (reply) {
        await axios.delete(`http://localhost:3000/api/Ejobupdate/delete/${jobid}`);
        console.log('Deleted job with ID:', jobid);
        fetchJobs();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleUpdate = async (jobid) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/Ejobupdate/update/${jobid}` , {
        title: updatedJobDetails.title,
        description: updatedJobDetails.description,
        skills: updatedJobDetails.skills,
        experience: updatedJobDetails.experience,
        location: updatedJobDetails.location,
        ctc: updatedJobDetails.ctc,
      });
      
      if (response.status === 200) {
        console.log('Updated job with ID:', jobid);
        fetchJobs();
        setShowModal(false); // Close the modal after successful update
      } else {
        console.error('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="eju-page">
      <h1 className="eju-heading">Job Update</h1>
      <ul className="eju-job-list">
      {jobs.map((job) => (
  <li key={job.jobid} className="eju-job-item">
    <h3>{job.title}</h3>
    <p>Description: {job.description}</p>
    <p>Skills: {job.skills}</p>
    <p>Experience: {job.experience}</p>
    <p>Location: {job.location}</p>
    <p>CTC: {job.ctc}</p>
   
    <button onClick={() => handleDelete(job.jobid)} className="eju-delete-btn">Delete</button>
            {/* Pass the jobid to handleUpdate */}
            <button onClick={() => { 
  setShowModal(true); 
  setUpdatedJobDetails({ 
    ...updatedJobDetails, 
    jobid: job.jobid, 
    title: job.title, 
    description: job.description, 
    skills: job.skills, 
    experience: job.experience, 
    location: job.location, 
    ctc: job.ctc 
  }); 
}} className="eju-update-btn">Update</button>

  </li>
))}

      </ul>
      {showModal && (
  <div className="eju-modal-container">
    <div className="eju-modal-content">
      <span className="eju-close-btn" onClick={() => setShowModal(false)}>&times;</span>
      <h2 className="eju-title">Update Job</h2>
      <form onSubmit={() => handleUpdate(updatedJobDetails.jobid)}>
        <label className="eju-label">Title:</label>
        <input type="text" value={updatedJobDetails.title} onChange={(e) => setUpdatedJobDetails({ ...updatedJobDetails, title: e.target.value })} className="eju-input-text" />

        <label className="eju-label">Description:</label>
        <input type="text" value={updatedJobDetails.description} onChange={(e) => setUpdatedJobDetails({ ...updatedJobDetails, description: e.target.value })} className="eju-input-text" />

        <label className="eju-label">Skills:</label>
        <input type="text" value={updatedJobDetails.skills} onChange={(e) => setUpdatedJobDetails({ ...updatedJobDetails, skills: e.target.value })} className="eju-input-text" />

        <label className="eju-label">Experience:</label>
        <input type="text" value={updatedJobDetails.experience} onChange={(e) => setUpdatedJobDetails({ ...updatedJobDetails, experience: e.target.value })} className="eju-input-text" />

        <label className="eju-label">Location:</label>
        <input type="text" value={updatedJobDetails.location} onChange={(e) => setUpdatedJobDetails({ ...updatedJobDetails, location: e.target.value })} className="eju-input-text" />

        <label className="eju-label">CTC:</label>
        <input type="text" value={updatedJobDetails.ctc} onChange={(e) => setUpdatedJobDetails({ ...updatedJobDetails, ctc: e.target.value })} className="eju-input-text" />

        <button type="submit" className="eju-button">Update</button>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Ejobupdate;
