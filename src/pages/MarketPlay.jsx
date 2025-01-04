import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MarketPlay = () => {
  const { marketName } = useParams(); // Get market name from route
  const navigate = useNavigate();

  const marketTimes = {
    openTime: '10:00 AM',
    closeTime: '5:00 PM',
  };

  const options = [
    {
      name: 'Single Digit',
      path: '/single-digit',
      image: 'https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/single_digit_dtpwhz.webp',
    },
    {
      name: 'Jodi Digit',
      path: '/jodi-digit',
      image: 'https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/jodi_digit_bpn6m8.webp',
    },
    {
      name: 'Single Pana',
      path: '/single-pana',
      image: 'https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/single-pana_uup7nq.webp',
    },
    {
      name: 'Double Pana',
      path: '/double-pana',
      image: 'https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/double-pana_o6zfol.webp',
    },
    {
      name: 'Triple Pana',
      path: '/triple-pana',
      image: 'https://res.cloudinary.com/dwroh4zkk/image/upload/v1735050664/triple-pana_pmzep7.webp',
    },
  ];

  return (
    <div className="p-0 min-h-screen bg-gray-900 text-white">
      {/* Back Arrow and Market Info Container */}
      <div className="bg-gray-800 p-4 shadow-lg flex items-center space-x-4">
        <button
          className="text-white text-2xl hover:scale-110 transition-transform"
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <div>
          <h2 className="text-2xl font-bold">{marketName}</h2>
          <p className="text-sm text-gray-400 mt-1">
            Open: <span className="text-green-400">{marketTimes.openTime}</span> | Close: <span className="text-red-400">{marketTimes.closeTime}</span>
          </p>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 p-3 text-center cursor-pointer"
            onClick={() =>
              navigate(option.path, {
                state: { marketName }, // Pass marketName to the target route
              })
            }
          >
            <img
              src={option.image}
              alt={option.name}
              className="w-28 h-28 mx-auto rounded-lg mb-3 object-cover"
            />
            <button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-3 py-1.5 rounded-lg shadow-lg text-sm font-semibold hover:from-purple-700 hover:to-purple-900 transition-all">
              {option.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPlay;
