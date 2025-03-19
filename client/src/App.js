import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import MyNotes from './pages/MyNotes';

function App() {
  return (
    <AuthProvider>  
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/MyNotes" element={<MyNotes />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
