import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const navigate = useNavigate();
  const [allMarkets, setAllMarkets] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchAllMarkets = async () => {
      try {
        const { data } = await axios.get('https://only-backend-je4j.onrender.com/api/markets');
        setAllMarkets(data);
      } catch (error) {
        console.error('Error fetching all markets:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched or an error occurs
      }
    };

    fetchAllMarkets();
  }, []);

  return (
    <div className="font-sans bg-gray-900 text-white p-5 min-h-screen">
      <div className="my-5 flex justify-center items-center overflow-hidden rounded-lg shadow-lg max-w-4xl mx-auto">
        <img
          src="https://static.vecteezy.com/system/resources/previews/038/811/462/large_2x/ai-generated-beautiful-background-for-poker-game-advertising-free-photo.jpeg"
          alt="Casino Banner"
          className="object-cover rounded-lg w-full max-h-64"
        />
      </div>

      <div className="flex justify-center items-center gap-8 mb-5">
        <button
          className="text-lg font-semibold py-3 px-6 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg shadow-xl hover:from-red-800 hover:to-red-900 transition-colors duration-300"
          onClick={() => alert('Contact Us')}
        >
          📞 Contact Us
        </button>
        <button
          className="text-lg font-semibold py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-lg shadow-xl hover:from-yellow-600 hover:to-yellow-800 transition-colors duration-300"
          onClick={() => navigate('/add-funds')}
        >
          + Add Funds
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center mb-5">All Markets</h2>

      {loading ? (
        // Loader
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="loader w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        // Markets Display
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMarkets.length === 0 ? (
            <p className="text-center text-gray-400">No markets available.</p>
          ) : (
            allMarkets.map((market) => (
              <div
                key={market._id}
                className="relative p-4 bg-gray-800 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{market.name}</h3>
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      market.isBettingOpen ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {market.isBettingOpen ? 'Betting is Open' : 'Betting is Closed'}
                  </span>
                </div>
                <div className="text-gray-300">
                  <p className="text-sm">Open: {market.openTime} | Close: {market.closeTime}</p>
                  <p className="text-lg mb-2 text-yellow-500">679 - 24 - 248</p>
                </div>
                {market.isBettingOpen && (
                  <button
                    className="absolute bottom-4 right-4 bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg hover:bg-purple-700 transition-colors duration-300 ease-in-out"
                    onClick={() => navigate(`/play/${market.name}`)}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
