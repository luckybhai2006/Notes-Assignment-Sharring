import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-2">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold mx-3" to="/">NotesApp</Link>
        <button 
          className="navbar-toggler mx-3" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded={isMenuOpen} 
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/MyNotes" onClick={() => setIsMenuOpen(false)}>My Notes</Link>
              </li>
            )}
          </ul>
          
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <li className="nav-item mx-2">
                <Link 
                  className="nav-link text-danger fw-bold" 
                  to="#" 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
