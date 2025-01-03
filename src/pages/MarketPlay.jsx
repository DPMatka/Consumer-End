import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MarketPlay = () => {
  const { marketName } = useParams();
  const navigate = useNavigate();

  const options = [
    { name: 'Single Digit', path: '/single-digit', image: 'https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/single_digit_dtpwhz.webp' },
    { name: 'Jodi Digit', path: '/jodi-digit', image: 'https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/jodi_digit_bpn6m8.webp' },
    { name: 'Single Pana', path: '/single-pana', image: 'https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/single-pana_uup7nq.webp' },
    { name: 'Double Pana', path: '/double-pana', image: 'https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/double-pana_o6zfol.webp' },
    { name: 'Triple Pana', path: '/triple-pana', image: 'https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/triple-pana_pmzep7.webp' },
  ];

  return (
    <div className="market-play-container">
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h2>{marketName}</h2>
        <div className="wallet-info">
          <span className="wallet-balance">💰 Coins: 259</span>
        </div>
      </header>

      <div className="options-grid">
        {options.map((option, index) => (
          <div key={index} className="option-item" onClick={() => navigate(option.path)}>
            <img src={option.image} alt={option.name} className="option-image" />
            <button className="option-button gradient-button">{option.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPlay;
