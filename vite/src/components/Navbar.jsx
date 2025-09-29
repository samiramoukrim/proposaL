// Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <NavLink to="/">
          <img src="/logo_promise_transparent (1).png" alt="Promise Logo" className="logo-img" />
        </NavLink>
      </div>
      <nav>
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => isActive ? "active-link" : ""}>Services</NavLink></li>
          <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? "active-link" : ""}>Portfolio</NavLink></li>
          <li><NavLink to="/blog" className={({ isActive }) => isActive ? "active-link" : ""}>Blog</NavLink></li>
          <li><NavLink to="/StartPlanning" className={({ isActive }) => isActive ? "active-link " : ""}>Start Planning</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
