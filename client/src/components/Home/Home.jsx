import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Home.css'; // Import your CSS file

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [feedbackData, setFeedbackData] = useState({ rating: 0, comments: '' });

  const handleApply = (jobid) => {
    Cookies.set('jobid', jobid);
  };

  const handleFeedback = (job) => {
    setSelectedJob(job);
    setShowFeedbackForm(true);
  };
  const fetchCompanyEmpData = async (jobid) => {
    try {
      console.log(jobid)
      const response = await axios.get(`http://localhost:3000/api/Home/CompanyEmpData/${jobid}`);
    
      return response.data.empid;
    } catch (error) {
      console.error('Error fetching company employee data:', error);
      return null;
    }
  };
  
  const handleSubmitFeedback = async () => {
    try {
      const userid = Cookies.get('id');
      const empid = await fetchCompanyEmpData(selectedJob.jobid); 
      const existingFeedback = await axios.get(`http://localhost:3000/api/Home/check-feedback?jobid=${selectedJob.jobid}&id=${userid}&empid=${empid}`);
    
      if (existingFeedback.data.exists) {
        alert('Feedback for this job has already been provided.');
        return;
      }
      console.log(empid)
      const response = await axios.post('http://localhost:3000/api/Home/feedback', {
        jobid: selectedJob.jobid,
        id: userid,
        empid: empid,
        rating: feedbackData.rating,
        comments: feedbackData.comments
      });
      // Reset feedback form fields and hide the form after successful submission
      setFeedbackData({ rating: 0, comments: '' });
      setShowFeedbackForm(false);
      alert('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
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

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Job Listings</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by job title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="job-listings">
        <ul>
          {filteredJobs.map((job) => (
            <li key={job.jobid} className="job-item">
              <h3>{job.title}</h3>
              <p>Company: {job.companyname}</p>
              <p>Description: {job.description}</p>
              <p>Location: {job.location}</p>
              <p>Experience Required: {job.experience}</p>
              <p>Skills Required: {job.skills}</p>
              <p>Salary-CTC: {job.ctc}</p>
              <p>Post Date: {job.postDate}</p>
              <button className="feedback-button" onClick={() => handleFeedback(job)}>
                Feedback
              </button>
              <Link to={{ pathname: "/Application" }}>
                <button className="apply-button" onClick={() => handleApply(job.jobid)}>
                  Apply
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {showFeedbackForm && (
        <div className="feedback-form-overlay">
          <div className="feedback-form">
            <h2>Feedback Form</h2>
            <p>Provide your feedback for {selectedJob?.title} at {selectedJob?.companyname}:</p>
             <label htmlFor="rating">Rating:</label>
             <input 
  type="number" 
  placeholder="Out of 5" 
  id="rating" 
  value={feedbackData.rating} 
  onChange={(e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 5) {
      setFeedbackData({ ...feedbackData, rating: value });
    } else {
    
      alert("Rating must be between 0 and 5.");
     
    }
  }}
/>
            <label htmlFor="comments">Comments:</label>
            <textarea id="comments" value={feedbackData.comments} onChange={(e) => setFeedbackData({ ...feedbackData, comments: e.target.value })}></textarea>
            <button onClick={handleSubmitFeedback}>Submit</button>
            <button onClick={() => setShowFeedbackForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
