import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar.jsx';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:7000/register', {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      setSuccess(res.data.message || 'Registered successfully');
      setForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      const message = error?.response?.data?.message || 'Registration failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <hr />
      <div className='container is-fluid'>
        <div className="box mb-5" style={{ marginLeft: "220px", marginRight: "150px" }}>
          <div className="columns is-centered">
            <div className='column is-5'>
              <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?ga=GA1.1.1942842452.1749559381&semt=ais_hybrid&w=740" className="image" alt="Privacy illustration" />
            </div>
            <div className="column is-5">

              {error && (
                <div className="notification is-danger is-light">
                  {error}
                </div>
              )}
              {success && (
                <div className="notification is-success is-light">
                  {success}
                </div>
              )}

              <div className="block">
                <span className="icon-text">
                  <span className="icon is-medium mr-2">
                    <img src="https://img.icons8.com/fluency/48/000000/meta.png" alt="meta" />
                  </span>
                  <span className="is-size-5 has-text-weight-medium mt-1">KETO</span>
                </span>
              </div>
              <hr />

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label mb-0">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      name="username"
                      type="text"
                      required
                      minLength={4}
                      value={form.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label mb-0">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label mb-0">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      name="password"
                      type="password"
                      required
                      minLength={4}
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label mb-0">Confirm Password</label>
                  <div className="control">
                    <input
                      className="input"
                      name="confirmPassword"
                      type="password"
                      required
                      minLength={4}
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field mt-5">
                  <button className="button is-link" type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                </div>
              </form>

              <div className="has-text-centered has-text-grey is-size-6 mt-5">
                Already have an Account?
                <Link to="/login" className='has-text-link has-text-weight-bold'> Login</Link>
              </div>

              <div className="has-text-centered is-size-7 has-text-grey mt-4">
                A product of <strong>Keto</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
