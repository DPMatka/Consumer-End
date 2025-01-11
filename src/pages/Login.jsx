import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('https://only-backend-je4j.onrender.com/api/auth/login', { email, password });

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
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-blue-400 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">Welcome Back</h1>
        <p className="text-sm text-blue-700 mb-6">Log in to access your account</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'} // Toggle between text and password type
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute inset-y-0 right-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              {isPasswordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="text-sm text-blue-700 mt-4">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="font-bold text-blue-900 cursor-pointer hover:underline"
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
