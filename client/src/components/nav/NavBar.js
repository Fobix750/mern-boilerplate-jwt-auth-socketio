import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function NavBar() {
  return (
    <ul id="nav-bar">
      <Link to="/">
        <li className="menu-item">Home</li>
      </Link>
      <Link to="/profiles">
        <li className="menu-item">Profiles</li>
      </Link>
      <Link to="/register">
        <li className="menu-item">Register</li>
      </Link>
      <Link to="/login">
        <li className="menu-item">Login</li>
      </Link>
    </ul>
  );
}

export default NavBar;
