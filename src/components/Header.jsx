import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css'; // Ensure proper CSS path
import Sidebar from '../components/SideBar';

const Header = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchWalletBalance = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        try {
          const { data } = await axios.get('https://only-backend-je4j.onrender.com/api/wallet/balance', {
            headers: { Authorization: token },
          });
          setWalletBalance(data.walletBalance);
        } catch (error) {
          console.error('Error fetching wallet balance:', error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    fetchWalletBalance();
  }, []);


  return (
    <header className="app-header">
        <div className="menu-icon" onClick={toggleSidebar}>
          ☰
        </div>
        <h1 className="app-logo" onClick={() => navigate('/')}>
            Matka Pro
        </h1>
        <div className="header-right">
            {isLoggedIn ? (
            <>
                <span className="wallet-balance">💰 Wallet: ₹{walletBalance}</span>
            </>
            ) : (
            <button className="login-button" onClick={() => navigate('/login')}>
                Login
            </button>
            )}
        </div>

        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
};

export default Header;
