import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Efeedback.css'; 

const Efeedback = () => {
  const [feedback, setFeedback] = useState([]);

  const fetchFeedback = async () => {
    try {
      const empid = Cookies.get('empid');
      const response = await axios.get(`http://localhost:3000/api/Efeedback/${empid}`);
      setFeedback(response.data.feedback); 
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(rating); // Filled stars
    const emptyStars = '☆'.repeat(5 - rating); // Empty stars
    return filledStars + emptyStars;
  };

  return (
    <div className="feedback-container">
      <h1 className="feedback-heading">Feedback List</h1>
      <ul className="feedback-list">
        {feedback.map((item, index) => (
          <li key={index} className="feedback-item">
            <h3>{item.title}</h3>
            <p>Company: {item.username}</p>
            <p>Comment: {item.comments}</p>
            <p>Rating: {renderStars(item.rating)}</p>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Efeedback;
