// AdminPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [unapprovedCompanies, setUnapprovedCompanies] = useState([]);

  const fetchUnapprovedCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/unapproved');
      setUnapprovedCompanies(response.data.companies);
    } catch (error) {
      console.error('Error fetching unapproved companies:', error);
    }
  };

  useEffect(() => {
    fetchUnapprovedCompanies();
  }, []);

  const handleApprove = async (companyId) => {
    try {
      await axios.put(`http://localhost:3000/admin/approve/${companyId}`);
      // Refresh the list of unapproved companies after approval
      fetchUnapprovedCompanies();
    } catch (error) {
      console.error('Error approving company:', error);
    }
  };

  return (
    <div>
      <h2>Unapproved Companies</h2>
      <ul>
        {unapprovedCompanies.map((company) => (
          <li key={company.companyId}>
            {company.companyName}
            <button onClick={() => handleApprove(company.companyId)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
