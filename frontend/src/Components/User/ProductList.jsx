import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:7000/products"); 
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="columns is-multiline">
        {products.map((prod, index) => (
          <div key={index} className="column is-3">
            <div className="card">
              <div className="card-image px-4 py-4">
                <figure className="image is-4by3 ">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    style={{ objectFit: "contain", height: "200px", width: "100%" }}
                  />
                </figure>
            </div>
              <div className="card-content">
                <p
                  className="title is-5"
                  style={{
                    minHeight: '2.8em' 
                  }}
                >
                  {prod.title}
                </p>
                <p>
                  <strong className='mt-0'>Price: ₹{prod.price}</strong>
                </p>
                <p>
                  <em>Brand: {prod.brand}</em>
                </p>
              </div>
              <footer className="card-footer">
                <Link
                  to={`/Details/${prod.id}`}
                  className="card-footer-item has-background-link has-text-white has-text-weight-bold"
                >
                  View details
                </Link>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
