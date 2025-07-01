import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from './Footer';

const ViewProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProductById();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCartById = async (productId) => {
    const customerId = localStorage.getItem("customerId");

    if (!customerId) {
      alert("Please login to add products to cart.");
      return navigate('/login');
    }

    try {
      const res = await axios.post("http://localhost:7000/cart", {
        customerId,
        productId,
        quantity
      });

      if (res.status === 200 || res.status === 201) {
        alert("Product added to cart!");
      }

    } catch (error) {
      if (error.response?.status === 401) {
        alert("You are not logged in.");
        navigate('/login');
      } else if (error.response?.status === 409) {
        alert("Product already in cart.");
      } else {
        alert("Failed to add product to cart.");
        console.error("Add to cart error:", error);
      }
    }
  };

  if (!product) return <p className="has-text-centered mt-6">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className='container is-fluid'>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              <div className="column is-5">
                  <div className="box p-4">
                    <figure className="image is-square">
                      <img src={product.image} alt={product.title} style={{ objectFit: 'contain' }} />
                    </figure>
                  </div>
                </div>
              <div className="column is-7">
                <h1 className="title is-3 mb-3">{product.title}</h1>
                <p className="subtitle is-5 has-text-grey">{product.description || "No description available."}</p>
                <p className="has-text-success has-text-weight-semibold mb-3">In Stock</p>
                <p className="title is-4 has-text-primary mt-4">₹{product.price}</p>

                {/* Quantity Buttons */}
                <div className="field is-grouped mt-4">
                  {/* <label className="label mr-3">Quantity</label> */}
                  <div className="buttons has-addons">
                    <button className="button is-link is-light is-small" onClick={decreaseQuantity}>-</button>
                    <button className="button is-small">{quantity}</button>
                    <button className="button is-link is-light is-small" onClick={increaseQuantity}>+</button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="buttons mt-4">
                  <button className="button is-primary" onClick={() => addToCartById(product.id)}>
                    Add to Cart
                  </button>
                  <button className="button is-link">
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
};

export default ViewProducts;
