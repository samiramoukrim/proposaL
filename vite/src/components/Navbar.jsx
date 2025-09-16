import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => isActive ? "active-link" : ""}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" className={({ isActive }) => isActive ? "active-link" : ""}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => isActive ? "active-link" : ""}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking" className={({ isActive }) => isActive ? "active-link booking-link" : ""}>
              StartPlanning
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

