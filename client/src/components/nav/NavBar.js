import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navbar.css';

function NavBar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <ul id="nav-bar">
      <Link to="/">
        <li className="menu-item">Home</li>
      </Link>
      <Link to="/profiles">
        <li className="menu-item">Profiles</li>
      </Link>
      {!isAuthenticated ? (
        <React.Fragment>
          <Link to="/register">
            <li className="menu-item">Register</li>
          </Link>
          <Link to="/login">
            <li className="menu-item">Login</li>
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link to="/profile">
            <li className="menu-item">Profile</li>
          </Link>
          <Link to="/logout">
            <li className="menu-item">Logout</li>
          </Link>
        </React.Fragment>
      )}
    </ul>
  );
}

export default NavBar;
