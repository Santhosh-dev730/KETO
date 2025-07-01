// components/AdminNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("adminAuth");

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/AdminLogin"), 1000);
  };

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <span className="navbar-item has-text-weight-bold is-size-5 has-text-white">KETO</span>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Products</Link>
          <Link to="/AdminOrder" className="navbar-item">Orders</Link>
          <Link to="/AdminUser" className="navbar-item">Users</Link>
        </div>
        <div className="navbar-end">
          {isAdmin ? (
            <>
              <div className="navbar-item has-text-white mr-4">
                <span>Welcome, <strong className="has-text-white">Admin</strong></span>
              </div>
              <div className="navbar-item">
                <button className="button is-light" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="navbar-item">
              <Link to="/AdminLogin" className="button is-link is-light">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
