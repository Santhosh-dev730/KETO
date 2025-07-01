import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="footer has-background-dark has-text-white-ter">
        <div className="container">
          <div className="columns">
            {/* Column 1: Brand Info */}
            <div className="column is-3">
              <h2 className="title is-5 has-text-white">KETO</h2>
              <p>
                Delivering smart electronics with end-to-end consulting for optimized integration.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="column is-3">
              <h2 className="title is-6 has-text-white">Quick Links</h2>
              <ul>
                <li className="mt-4"><a className="has-text-white-ter">Products</a></li>
                <li className="mt-4"><a className="has-text-white-ter">About Us</a></li>
                <li className="mt-4"><a className="has-text-white-ter">Contact</a></li>
              </ul>
            </div>

            {/* Column 3: Follow Us */}
            <div className="column is-3">
              <h2 className="title is-6 has-text-white">Follow Us</h2>
              <div className="level is-mobile">
                <div className="level-left" style={{ gap: 0, display: 'flex' }}>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <span className="icon has-text-white-ter">
                      <i className="fab fa-facebook"></i>
                    </span>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    <span className="icon has-text-white-ter">
                      <i className="fab fa-twitter"></i>
                    </span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <span className="icon has-text-white-ter">
                      <i className="fab fa-instagram"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4: Services */}
            <div className="column is-3">
              <h2 className="title is-6 has-text-white">Services</h2>
              <ul>
                <li className="mt-4"><a className="has-text-white-ter">Consulting</a></li>
                <li className="mt-4"><a className="has-text-white-ter">Integration</a></li>
                <li className="mt-4"><a className="has-text-white-ter">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="content has-text-centered mt-6">
            <p>&copy; {new Date().getFullYear()} Keto Electronics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer