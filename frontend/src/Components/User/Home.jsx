import React from 'react';
import Navbar from '../Navbar';
import ProductList from './ProductList';
import Footer from './Footer'

const Home = () => {
  return (
    <div className="has-background-link has-text-white-ter " style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="section">
        <div className="container mt-5">
          <div className="columns is-vcentered">
            <div className="column is-6">
              <h1 className="title is-2 has-text-white mb-5">Welcome to Keto Store</h1>
              <p className="subtitle is-5 has-text-white-ter mb-5" style={{ lineHeight: '1.8' }}>
                Explore our premium electronics crafted for performance and innovation.
                Delivering smart electronics with end-to-end consulting for optimized integration.
              </p>
              <a className="button is-light mt-5">Shop Now</a>
            </div>
            <div className="column is-6 has-text-centered">
              <img
                src="https://plus.unsplash.com/premium_photo-1683288662040-5ca51d0880b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Featured Product"
                style={{ maxHeight: '300px', borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section has-background-light">
        <div className="container">
          <h2 className="title is-4 has-text-dark mb-4">Our Products</h2>
          <ProductList />
        </div>
      </section>

     <Footer/>
    </div>
  );
};

export default Home;
