import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admincmp.css'; // Import CSS file for styling

const Admincmp = () => {
  const [verifiedCompanies, setVerifiedCompanies] = useState([]);
  const [nonVerifiedCompanies, setNonVerifiedCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/Admincmp');
      const companies = response.data;

      // Separate verified and non-verified companies
      const verified = companies.filter(company => company.verification);
      const nonVerified = companies.filter(company => !company.verification);

      setVerifiedCompanies(verified);
      setNonVerifiedCompanies(nonVerified);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleVerify = async (empid) => {
    try {
      await axios.put(`http://localhost:3000/api/Admincmp/${empid}/verify`);
      // After verifying, refetch the companies to update the lists
      fetchCompanies();
    } catch (error) {
      console.error('Error verifying company:', error);
    }
  };

  const handleDelete = async (empid) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this company?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/Admincmp/${empid}`);
        // After deleting, refetch the companies to update the lists
        fetchCompanies();
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };
  
  return (  
    <div className="admin-companies">
      <div className="admin-companies1">
        <h2>Verified Companies</h2>
        <ul>
          {verifiedCompanies.map(company => (   
            <li key={company.companyname}>
              {company.companyname}
              <button className="btn-verified" onClick={() => handleVerify()}>Verified</button>
              <button className="btn-delete" onClick={() => handleDelete(company.empid)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>


      <div>
        <h2>Non-Verified Companies</h2>
        <ul>
          {nonVerifiedCompanies.map(company => (
            <li key={company.companyname}>
              {company.companyname}
              <button className="btn-verify" onClick={() => handleVerify(company.empid)}>Verify</button>
              <button className="btn-delete" onClick={() => handleDelete(company.empid)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admincmp;
