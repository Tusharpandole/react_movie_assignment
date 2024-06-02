// 

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogin } from '../../services/authService';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    handleLogin(email, password)
      .then(({ token }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        navigate('/home');
      })
      .catch((error) => {
        setError('Login failed. Please check your credentials and try again.');
        console.error('Login failed:', error);
      });
  };

  return (
    <div className="login-container">
      <div className="top-bar">
        <Link to="/">
          <span className="back-arrow">{'<'}</span>
          <span className="home-m">Home</span>
        </Link>
      </div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="signup_user">
        Don't have an account? <Link className="navigate_signup" to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
