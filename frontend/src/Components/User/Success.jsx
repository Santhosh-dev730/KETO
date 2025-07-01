import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <section className="section has-background-success-light is-flex is-flex-direction-column is-align-items-center is-justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="box has-text-centered p-6">
        

        <h1 className="title has-text-success">Order Confirmed!</h1>
        <p className="subtitle has-text-grey-dark">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <button
          className="button is-success mt-4"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    </section>
  );
};

export default Success;
