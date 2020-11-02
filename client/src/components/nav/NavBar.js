import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navbar.css';

function NavBar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <nav className="nav-bar">
      <NavLink
        className="nav-item"
        activeClassName="activated-link"
        exact
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="nav-item"
        activeClassName="activated-link"
        to="/profiles"
      >
        Profiles
      </NavLink>
      {!isAuthenticated ? (
        <React.Fragment>
          <NavLink
            className="nav-item"
            activeClassName="activated-link"
            to="/register"
          >
            Register
          </NavLink>
          <NavLink
            className="nav-item"
            activeClassName="activated-link"
            to="/login"
          >
            Login
          </NavLink>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavLink
            className="nav-item"
            activeClassName="activated-link"
            to="/profile"
          >
            Profile
          </NavLink>
          <NavLink
            className="nav-item"
            activeClassName="activated-link"
            to="/logout"
          >
            Logout
          </NavLink>
        </React.Fragment>
      )}
    </nav>
  );
}

export default NavBar;
