// Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <div className={`overlay ${isSidebarOpen ? 'visible' : ''}`} onClick={toggleSidebar}></div>

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="menu-card">
          <div className="profile-section">
            <img
              src="https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050663/profile_cidlht.png"
              alt="Profile"
              className="profile-picture"
            />
            <h3 className="profile-name">Bhavya Kothari</h3>
          </div>
          <div className="menu-balance">
            <h2>259</h2>
            <p>Total Coins</p>
            <button className="refresh-button" onClick={() => alert('Refresh Balance')}>⟳</button>
          </div>
          <div className="menu-actions">
            <button className="menu-action" onClick={() => navigate('/profile')}>
              <span className="action-icon">👤</span>
              <span>Profile</span>
            </button>
            <button className="menu-action" onClick={() => navigate('/transactions')}>
              <span className="action-icon">📜</span>
              <span>Transactions</span>
            </button>
            <button className="menu-action" onClick={() => navigate('/settings')}>
              <span className="action-icon">⚙️</span>
              <span>Settings</span>
            </button>
            <button className="menu-action" onClick={() => navigate('/help')}>
              <span className="action-icon">❓</span>
              <span>Help</span>
            </button>
            <button className="menu-action" onClick={() => navigate('/contact')}>
              <span className="action-icon">📞</span>
              <span>Contact Support</span>
            </button>
            <button className="menu-action" onClick={() => navigate('/promotions')}>
              <span className="action-icon">🎉</span>
              <span>Promotions</span>
            </button>
            <button className="menu-action" onClick={() => navigate('/faq')}>
              <span className="action-icon">📘</span>
              <span>FAQs</span>
            </button>
            <button className="menu-action" onClick={handleLogout}>
              <span className="action-icon">🚪</span>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
