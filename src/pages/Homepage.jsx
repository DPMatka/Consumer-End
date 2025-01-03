import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Include your CSS for styling

const HomePage = () => {
  const navigate = useNavigate();
  const [markets, setMarkets] = useState([]);
  const [allMarkets, setAllMarkets] = useState([]); // New state for all markets

  useEffect(() => {
    const fetchAllMarkets = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/markets');
        setAllMarkets(data); // Set all markets
      } catch (error) {
        console.error('Error fetching all markets:', error);
      }
    };
    fetchAllMarkets(); // Fetch all markets
  }, []);

  return (
    <div className="homepage-container">
      <div className="banner">
        <img
          src="https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/banner_jqjvfh.webp"
          alt="Chips"
          className="banner-image"
        />
      </div>

      <div className="cta-section">
        <button className="cta-button primary" onClick={() => alert('Contact Us')}>
          📞 Contact Us
        </button>
        <button className="cta-button add-fund" onClick={() => navigate('/add-funds')}>
          + Add Fund
        </button>
      </div>

      <h2 className="market-title">All Markets</h2>
      <div className="market-list">
        {allMarkets.length === 0 ? (
          <p>No markets available.</p>
        ) : (
          allMarkets.map((market) => (
            <div
              key={market._id}
              className={`market-item ${market.isBettingOpen ? '' : 'blurred'}`}
            >
              <div className="market-times">
                <p>Open: {market.openTime}</p>
                <p>Close: {market.closeTime}</p>
              </div>
              <div className="market-info">
                <h3>{market.name}</h3>
                <p className={`market-status ${market.isBettingOpen ? 'open' : 'closed'}`}>
                  {market.isBettingOpen ? 'Market Open' : 'Market Closed'}
                </p>
              </div>
              {market.isBettingOpen && (
                <button
                  className="play-button"
                  onClick={() => navigate(`/play/${market.name}`)} // Pass market name
                >
                  ▶
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
