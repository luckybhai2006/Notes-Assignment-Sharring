import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css'; // Import CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      await axios.post(`${process.env.URI}/api/auth/register`, { name, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error("Upload error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register page </h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <input className='name'
              type="text" 
              value={name} 
              placeholder='Enter Your Name'
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <input 
              type="email" 
              value={email} 
              placeholder='Enter Your Email'
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              value={password} 
              placeholder='Enter Your Password'
              onChange={(e) => setPassword(e.target.value)} 
              required 
              
            />
          </div>

          <button type="submit" className="register-button">Register here</button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
