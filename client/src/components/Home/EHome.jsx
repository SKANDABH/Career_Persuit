import React from 'react';
import { Link } from 'react-router-dom';
import image from '../Assets/icons8-add-96.png';
import image1 from '../Assets/received1.png';

const EHome = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  };

  const linkStyle = {
    margin: '20px',
    textDecoration: 'none',
  };

  const imageStyle = {
    width: '150px', 
    height: 'auto', 
  };

  return (
    <div  style={containerStyle}>
      <Link to="/Postjob" style={linkStyle}>
        <img src={image} alt="Add" style={imageStyle} />
      </Link>

      <Link to="/EApplication" style={linkStyle}>
        <img src={image1} alt="Receive" style={imageStyle} />
      </Link>
    </div>
  );
};

export default EHome;
