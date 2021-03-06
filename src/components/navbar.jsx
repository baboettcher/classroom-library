import React from 'react';
import { NavLink, Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/movies">
          Movies
          </NavLink>
        <NavLink className="nav-item nav-link" to="/customers">
          Customers
          </NavLink>
        <NavLink className="nav-item nav-link" to="/rentals">
          Rentals
          </NavLink>
        <NavLink className="nav-item nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-item nav-link" to="/register">
          Register
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
