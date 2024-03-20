import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Adminusers.css'; // Import CSS file for styling

const Adminusers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/Adminusers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserApplications = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/Users/${userId}/applications`);
      setUserApplications(response.data);
    } catch (error) {
      console.error('Error fetching user applications:', error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/Adminusers/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

 // Update the handleShowApplications function to fetch user applications from the backend
const handleShowApplications = async (userId) => {
  try {
      const response = await axios.get(`http://localhost:3000/api/Adminusers/${userId}/applications`);
      setUserApplications(response.data);
      setSelectedUser(userId);
  } catch (error) {
      console.error('Error fetching user applications:', error);
  }
};
console.log(userApplications);

  return (
    <div className="admin-users">
      <h2 className="subtitle">Users</h2>
      <ul className="user-list">
        {users.map(user => (
          <li className="user-item" key={user.id}>
            <span className="username">{user.username}</span> - <span className="email">{user.email}</span>
            <button className='btnus1' onClick={() => handleShowApplications(user.id)}>Application</button>
            <button className='btnus2' onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {userApplications.map((applicationArray, index) => (
  <div key={index}>
    {applicationArray.map((application, innerIndex) => (
      <li key={`${application.title}-${application.companyname}-${innerIndex}`}>
        <div>Title: {application.title}</div>
        <div>Company: {application.companyname}</div>
      </li>
    ))}
  </div>
))}

    </div>
  );
};

export default Adminusers;
