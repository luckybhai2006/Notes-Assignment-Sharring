import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '../css/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Left-aligned Brand */}
        <Link className="navbar-brand" to="/">NotesApp</Link>

        {/* Main Navigation Links */}
        <ul className='home'>
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        </div>
        <div className='items'>
        <ul>
          {isAuthenticated ? (
            <>
              <li className="nav-item1">
                <Link className="nav-link" to="/MyNotes">My Notes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
        <div>
        </div>
        <i class="fa-solid fa-bars"></i>
      </div>
    </nav>
  );
};

export default Navbar;