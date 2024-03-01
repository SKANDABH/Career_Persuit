import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EApplication.css'
const EApplication = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/EApplication");
                setApplications(response.data.result);
                console.log('Fetched applications:', response.data.result);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []); 

    return (
        <div className="application-container">
            <h1 className="application-title">Application List</h1>
            <ul className="application-list">
                {applications.map(application => (
                    <li key={application.application_id} className="application-item">
                        <p className="application-info">Name: {application.username}</p>
                        <p className="application-info">Email: {application.email}</p>
                        <p className="application-info">Phone: {application.phone}</p>
                        <p className="application-info">Education: {application.education}</p>
                        <p className="application-info">Skills: {application.skills}</p>


                        <p className={`application-status ${application.status === 0 ? 'pending' : 'approved'}`}>
                            Status: {application.status === 0 ? 'Pending' : 'Approved'}
                        </p>
                        <p className="application-info">
                            Application Date: {new Date(application.application_date).toLocaleString()}
                        </p>
                        <p className="application-text">Resume Text: {application.resume_text}</p>
                        {/* Additional fields can be displayed similarly */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EApplication;
