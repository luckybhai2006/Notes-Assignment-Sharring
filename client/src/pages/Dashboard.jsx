import React from 'react';
import UploadForm from '../components/UploadForm';
import { useNavigate } from 'react-router-dom';
import '../css/Dashbord.css';
const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token'); // Check if user is logged in

  return (
    <div className="containerr">
      {isAuthenticated ? (
        <UploadForm />
      ) : (
        <>
          <p className='para'>You must be logged in to upload notes..!!</p>
          <button onClick={() => navigate('/login')} className="dash-btn">
            Login Here !
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
