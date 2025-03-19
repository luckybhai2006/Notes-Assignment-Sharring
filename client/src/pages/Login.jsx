import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import '../css/Login.css'; // Add the CSS import here

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://notes-assignment-sharring-backend.onrender.com/api/auth/login`, { email, password });
  
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);  // ✅ Store userId in localStorage
      console.log("User ID stored:", res.data.user._id);
  
      login(res.data.token); // Instantly update state
      navigate('/dashboard'); // Redirect after login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
       
  return (
    <div className="login-containers">
      <div className="login-box">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" Enter Your Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Enter your Password"
            required
          />
          <button type="submit" id='btn'>Login here</button>
          <p>Don't have an Account?<a href="/register"> Register here</a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
