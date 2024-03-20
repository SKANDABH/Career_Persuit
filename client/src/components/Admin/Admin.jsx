import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'; // Import CSS file for styling
import {Link} from 'react-router-dom'

const Admin = () => { 
  const [employees, setEmployees] = useState([]);

  

  const fetchEmployees = async () => {
   
  };

  return (
    <div className="admin-page">
      <h1 className="title">Admin Page</h1>
      <div className="buttons-container">
        <Link to='/Adminusers'><button className="view-button" >View Users</button></Link>
        {/* <button className="view-button">View Employees</button> */}
      </div>
{/* 
      <div>
        <h2 className="subtitle">Users</h2>
        <ul className="list">
          {users.map(user => (
            <li className="list-item" key={user.id}>{user.username} - {user.email}</li>
          ))}
        </ul>
      </div> */}

      {/* <div>
        <h2 className="subtitle">Employees</h2>
        <ul className="list">
          {employees.map(employee => (
            <li className="list-item" key={employee.id}>{employee.name} - {employee.department}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Admin;
