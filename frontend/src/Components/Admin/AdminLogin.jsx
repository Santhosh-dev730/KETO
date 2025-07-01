import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (isAdmin) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hardcodedAdmin = {
      username: 'san',
      password: 'san345'
    };

    if (form.username === hardcodedAdmin.username && form.password === hardcodedAdmin.password) {
      localStorage.setItem("adminAuth", "true");
      toast.success('Login successful!');
      setTimeout(() => navigate('/admin'), 1500); // Delayed to show toast
    } else {
      toast.error('Invalid admin credentials');
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <Navbar />
      <hr />
      <div className="container is-fluid">
        <div className="box" style={{ marginLeft: "220px", marginRight: "150px" }}>
          <div className="columns is-centered">
            <div className="column is-5">
              <img
                src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg"
                className="image"
                alt="Login Illustration"
              />
            </div>
            <div className="column is-5">
              <div className="block">
                <span className="icon-text">
                  <span className="icon is-medium mr-2">
                    <img
                      src="https://img.icons8.com/fluency/48/000000/meta.png"
                      alt="meta"
                    />
                  </span>
                  <span className="is-size-5 has-text-weight-medium mt-1">KETO</span>
                </span>
              </div>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field mt-5">
                  <button className="button is-link" type="submit">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
