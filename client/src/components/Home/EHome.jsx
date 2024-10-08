import React from 'react';
import { Link } from 'react-router-dom';
import image from '../Assets/icons8-add-96.png';
import image1 from '../Assets/received1.png';
import image2 from '../Assets/satisfaction.png';
import image3 from '../Assets/data-processing.png';

const EHome = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'row',
  };

  const linkStyle = {
    margin: '20px',
    textDecoration: 'none',
    textAlign: 'center', // Center the text
    color: '#000', // Black text color
  };
  

  const imageStyle = {
    width: '150px', 
    height: 'auto', 
  };

  return (
    <div style={containerStyle}>
      <Link to="/Postjob" style={linkStyle}>
        <img src={image} alt="postjob" style={imageStyle} />
        <div>Post a Job</div>
      </Link>

      <Link to="/EApplication" style={linkStyle}>
        <img src={image1} alt="Receive" style={imageStyle} />
        <div>Received Applications</div>
      </Link>
      
      <Link to="/Efeedback" style={linkStyle}>
        <img src={image2} alt="Feedback" style={imageStyle} />
        <div>Feedback</div>
      </Link>
      
      <Link to="/Ejobupdate" style={linkStyle}>
        <img src={image3} alt="job update" style={imageStyle} />
        <div>Job Updates</div>
      </Link>
    </div>
  );
};

export default EHome;
