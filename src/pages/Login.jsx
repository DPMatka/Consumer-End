import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '/styles/pages/Login.css'; // Ensure the correct relative path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to manage loading spinner
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Save token and wallet balance to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('walletBalance', data.user.walletBalance);

      // Redirect to the attempted page or home
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Log in to access your account</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <button
            type="submit"
            className="login-button gradient-button"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="register-link">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="link-text">
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
