import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from 'react-oauth-google';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error on each attempt
    try {
      const res = await axios.post('https://keto-13et.vercel.app/login', form);
      alert(res.data.message);
      localStorage.setItem('loggedInUser', form.username);
      localStorage.setItem('customerId', res.data.customerId);
      navigate('/');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      setError(errorMsg);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-2">
        <div className="box mb-5" style={{ marginLeft: "220px", marginRight: "150px" }}>
          <div className="columns is-centered">
            <div className="column is-5">
              <img
                src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?ga=GA1.1.1942842452.1749559381&semt=ais_hybrid&w=740"
                className="image"
                alt=""
              />
            </div>
            <div className="column is-5">
              {error && (
                <div className="notification is-danger is-light">
                  {error}
                </div>
              )}

              <div className="block">
                <span className="icon-text">
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
                      minLength="4"
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
                      minLength="4"
                    />
                  </div>
                </div>

                <div className='block'>
                  <div className='field is-grouped is-grouped-right'>
                    <p>
                      <Link to="/reset_password">
                        <button className='button is-small is-inverted is-link has-background-white is-paddingless'>
                          Forgot Password?
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="field mt-5">
                  <button className="button is-link" type="submit">Login</button>
                </div>
              </form>

              <div className="has-text-centered has-text-grey is-size-6 mt-5">
                Don't have an Account?
                <Link to="/register" className='has-text-link has-text-weight-bold'> Register</Link>
              </div>

              <div className='has-text-centered has-text-grey is-size-6 mt-5'>
                <GoogleOAuthProvider clientId='383383244113-kaud4akjjtuefmgmc2m9g683uojllu1j.apps.googleusercontent.com'>
                  <GoogleLogin useOneTap />
                </GoogleOAuthProvider>
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

export default Login;
