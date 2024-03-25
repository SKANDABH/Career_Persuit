import React from 'react';
import { Link } from 'react-router-dom';
import imgjob from '../Assets/job-search.png';
import imgstatus from '../Assets/check-list.png';
import './Userhome.css';

const Userhome = () => {
  return (
    <div className="user-home-container">
      <div className="background-color">
        <Link to='/Home' className="link">
          <img src={imgjob} alt="Job Search" className="image" />
        </Link>
        <Link to='/Applicationstatus' className="link">
          <img src={imgstatus} alt="Application Status" className="image" />
        </Link>
      </div>
    </div>
  );
};

export default Userhome;
