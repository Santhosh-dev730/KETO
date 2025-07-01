import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <section className="hero is-light has-shadow">

      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <strong className="ml-2 title is-4">KETO</strong>
              </Link>

              <button className="navbar-burger" id="burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="navbar-menu" id="navbar-menu">
              <div className="navbar-end">
                <Link to="/" className="navbar-item mr-5">Home</Link>
                <Link
                  to={`/cart/${localStorage.getItem("customerId")}`}
                  className="navbar-item mr-5"
                >
                  Add to Cart
                </Link>
                <a className="navbar-item is-text-white mr-5">Orders</a>

                {!username ? (
                  <>
                    <Link to="/login" className="navbar-item mr-5 is-radiusless">
                      <button className="button has-background-link-dark has-text-white is-shadowless ">Login</button>
                    </Link>
                  </>
                ) : (
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link has-text-weight-bold">Hi, {username}</a>
                    <div className="navbar-dropdown is-right">
                      <a className="navbar-item">Profile</a>
                      <Link to="#" className="navbar-item">Favourites</Link>
                      <a className="navbar-item" onClick={handleLogout}>Logout</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
