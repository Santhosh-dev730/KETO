import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('https://keto-backend-two.vercel.app/orders'); // Update the URL based on your backend
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h2>Admin Order Details</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table is-bordered is-striped ">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.fullName}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.title} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td>₹{order.grandTotal}</td>
                <td>{order.status}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrder;
