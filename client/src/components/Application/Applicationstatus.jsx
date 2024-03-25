import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Applicationstatus.css'; 
import Cookies from 'js-cookie';

const Applicationstatus = () => {
    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {
        try {
            const userId = Cookies.get('id'); 
            console.log(userId);
            const response = await axios.get(`http://localhost:3000/api/Applicationstatus?userId=${userId}`);
    
            if (response.status === 404) {
                alert('NO Applications yet');
            } else {
                setApplications(response.data.result);
                console.log('Fetched applications:', response.data.result);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div className="application-containerU">
            <h1 className="application-titleU">JOB APPLIED</h1>
            <ul className="application-listU">
                {applications.map(application => (
                    <li key={application.application_id} className="application-itemU">
                        <p className="application-infoU">Company: {application.companyname}</p>
                        <p className="application-infoU">Role: {application.title}</p>
                        <p className={`application-status ${application.status === 0 ? 'pending' : 'approved'}`}>
                            Status: {application.status === 0 ? 'Pending' : 'Approved'}
                        </p>
                        <p className="application-infoU">
                            Applied Date: {new Date(application.application_date).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Applicationstatus;
