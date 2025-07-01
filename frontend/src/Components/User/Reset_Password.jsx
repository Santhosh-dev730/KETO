import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Reset_Password = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleReset = async () => {
    if (!email) {
      setMessage('Please enter your email address.');
      setIsError(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/api/send-reset-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        
      });

      const data = await response.json();
      console.log(data.message)
      if (response.ok) {
        setMessage(data.message || 'Password reset link has been sent to your email.');
        setIsError(false);
      } else {
        setMessage(data.message || 'Something went wrong.');
        setIsError(true);
      }
    } catch (err) {
      setMessage('Failed to connect to server.');
      setIsError(true);
    }
  };

  return (
    <div className="container is-fluid">
      <div className="box" style={{ maxWidth: '380px', margin: 'auto', marginTop: '40px' }}>
        <div className="block">
                <span className="icon-text">
                  <span className="icon is-medium mr-2">
                    <img src="https://img.icons8.com/fluency/48/000000/meta.png" alt="meta" />
                  </span>
                  <span className="is-size-5 has-text-weight-medium mt-1">KETO</span>
                </span>
              </div>
              <hr/>
        <h1 className="title is-3 has-text-centered">Reset Password</h1>

        {message && (
          <div className={`notification ${isError ? 'is-danger' : 'is-success'} is-light`}>
            {message}
          </div>
        )}

        <div className="field">
          <label className="label">
            Enter the email address associated with your "KETO" account:
          </label>
          
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="block mt-4">
          
            <button className="button is-link is-fullwidth" onClick={handleReset}>Submit</button>
        
          <div className='block has-text-centered mt-4'>
            <Link to="/login">
            <button className="button is-link is-centered is-inverted has-background-white" style={{fontSize: '14px'}}>
              Return to Login</button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset_Password;
