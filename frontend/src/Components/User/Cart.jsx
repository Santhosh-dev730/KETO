import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    state: '',
    pincode: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const customerId = localStorage.getItem("customerId");
      try {
        const res = await axios.get(`http://localhost:7000/cart/${customerId}`);
        setCartItems(res.data.productItems || []);
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };

    const fetchShippingAddress = async () => {
      const customerId = localStorage.getItem("customerId");
      try {
        const res = await axios.get(`http://localhost:7000/shipping/${customerId}`);
        setShippingAddress(res.data || {});
      } catch (error) {
        console.error("Failed to fetch shipping address", error);
      }
    };

    fetchCartItems();
    fetchShippingAddress();
  }, [navigate]);

const handleRemove = async (productId) => {
  const confirmDelete = window.confirm("Are you sure you want to remove this item?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:7000/cart/${productId}`);
    setCartItems(prev => prev.filter(item => item.productId !== productId));
    alert("Item removed.");
  } catch (error) {
    console.error("Failed to remove item", error);
    alert("Remove failed.");
  }
};


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      alert("Customer ID not found. Please log in again.");
      return;
    }

    try {
      const shippingData = { ...formData, customerId };
      let response;
      if (shippingAddress._id) {
        response = await axios.patch(`http://localhost:7000/shipping/${shippingAddress._id}`, shippingData);
      } else {
        response = await axios.post('http://localhost:7000/shipping', shippingData);
      }
      alert(response.data.message || 'Shipping address saved successfully');
      setShowForm(false);
      const res = await axios.get(`http://localhost:7000/shipping/${customerId}`);
      setShippingAddress(res.data);
    } catch (err) {
      console.error('Error saving shipping address:', err);
      alert(err.response?.data?.message || 'Failed to save address. Please try again.');
    }
  };

  const handlePlaceOrder = async () => {
    const customerId = localStorage.getItem("customerId");
    const orderData = {
      customerId,
      fullName: shippingAddress.fullName,
      phone: shippingAddress.phone,
      address: shippingAddress.address,
      state: shippingAddress.state,
      pincode: shippingAddress.pincode,
      items: cartItems,
      subtotal,
      shipping,
      grandTotal
    };

    try {
      await axios.post("http://localhost:7000/order", orderData);
      alert("Order placed successfully!");
      navigate("/order-success");
    } catch (err) {
      console.error("Error placing order", err);
      alert("Order failed.");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 500 ? 0 : 50;
  const grandTotal = subtotal + shipping;

  return (
    <div>
      <Navbar />
      <div className="section">
        <div className="columns">
          <div className="column is-8">
            <h2 className="title is-4">Shopping Cart</h2>
            <hr />
            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <div className="box mb-3">
                <div className="columns is-vcentered has-text-weight-bold">
                  <div className="column is-3">Product Image</div>
                  <div className="column is-3">Title</div>
                  <div className="column is-2">Price</div>
                  <div className="column is-2">Quantity</div>
                  <div className="column is-2 has-text-centered">Actions</div>
                </div>
                <hr />
                <div className="container">
                  {cartItems.map((item, index) => (
                    <div key={item.productId}>
                      <div className="columns is-vcentered">
                        <div className="column is-2">
                          <figure className="image is-128x128">
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                          </figure>
                        </div>
                        <div className="column is-4">
                          <p className="title is-6">{item.title}</p>
                          <p className="is-size-7 has-text-grey">{item.description}</p>
                        </div>
                        <div className="column is-2">
                          <p className="has-text-weight-bold">₹{item.price}</p>
                        </div>
                        <div className="column is-2">
                          <p className="has-text-weight-bold">Items: {item.quantity}</p>
                        </div>
                        <div className="column is-2 has-text-centered">
                          <button
                            className="button is-danger is-light is-small"
                            onClick={() => handleRemove(item.productId)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      {index !== cartItems.length - 1 && <hr />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="column is-4">
            <div className="box has-background-white has-shadow" style={{ borderRadius: '12px', backgroundImage: 'linear-gradient(145deg, #f0f4f8, #d9e2ec)' }}>
              <h2 className="title is-4 has-text-centered has-text-dark">Order Summary</h2>
              <hr className="my-3" />

              <div className="content is-medium">
                <div className="level">
                  <div className="level-left has-text-weight-semibold">Total Items</div>
                  <div className="level-right has-text-weight-bold">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</div>
                </div>
                <div className="level">
                  <div className="level-left has-text-weight-semibold">Subtotal</div>
                  <div className="level-right">₹{subtotal.toFixed(2)}</div>
                </div>
                <div className="level">
                  <div className="level-left has-text-weight-semibold">Shipping</div>
                  <div className="level-right">{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</div>
                </div>
                <hr />
                <div className="level is-size-5 has-text-weight-bold">
                  <div className="level-left">Total</div>
                  <div className="level-right has-text-link">₹{grandTotal.toFixed(2)}</div>
                </div>
              </div>

              <hr className="my-4" />

              {!showForm && shippingAddress?.address ? (
                <div className="box has-background-light p-4">
                  <div className="is-flex is-justify-content-space-between is-align-items-start mb-2">
                    <p className="has-text-weight-semibold is-size-5">Deliver to: {shippingAddress.fullName}</p>
                    <button
                      className="button is-small is-warning is-light"
                      onClick={() => {
                        setFormData(shippingAddress);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="content is-size-6">
                    <p><strong>Phone:</strong> {shippingAddress.phone}</p>
                    <p><strong>Address:</strong> {shippingAddress.address}</p>
                    <p><strong>State:</strong> {shippingAddress.state}</p>
                    <p><strong>Pincode:</strong> {shippingAddress.pincode}</p>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="title is-5 mt-4 mb-3">Add Shipping Address</h3>
                  <form onSubmit={handleFormSubmit}>
                    <input className="input is-medium mb-3" type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleFormChange} required />
                    <input className="input is-medium mb-3" type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleFormChange} required />
                    <textarea className="textarea is-medium mb-3" name="address" placeholder="Address" value={formData.address} onChange={handleFormChange} required />
                    <input className="input is-medium mb-3" type="text" name="state" placeholder="State" value={formData.state} onChange={handleFormChange} required />
                    <input className="input is-medium mb-4" type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleFormChange} required />
                    <div className="buttons">
                      <button type="submit" className="button is-link is-fullwidth is-medium">Save Address</button>
                      <button type="button" className="button is-light is-fullwidth is-medium" onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                  </form>
                </>
              )}

              <button
                className="button is-link is-fullwidth is-medium mt-4"
                onClick={handlePlaceOrder}
                disabled={!shippingAddress?.address || cartItems.length === 0}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
