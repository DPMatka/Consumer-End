import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameRates = () => {
  const navigate = useNavigate();

  // Sample game rates data
  const gameRates = [
    { game: "Single Digit", rate: "1:10" },
    { game: "Jodi Digit", rate: "1:90" },
    { game: "Single Pana", rate: "1:150" },
    { game: "Double Pana", rate: "1:300" },
    { game: "Triple Pana", rate: "1:600" },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-5">
      {/* Header */}
      <div className="flex items-center bg-gray-800 p-3 rounded-lg shadow-md mb-5">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 bg-transparent text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h2 className="text-lg font-bold">Game Rates</h2>
      </div>

      {/* Game Rates Table */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-3 text-center">Game Rates</h3>
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">Game</th>
              <th className="p-3">Rate</th>
            </tr>
          </thead>
          <tbody>
            {gameRates.map((rate, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="p-3">{rate.game}</td>
                <td className="p-3">{rate.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-5">
        <h3 className="text-lg font-bold mb-2">Disclaimer</h3>
        <p className="text-sm text-gray-300">
          Game rates are subject to change without prior notice. Please verify
          the rates before placing your bets.
        </p>
      </div>
    </div>
  );
};

export default GameRates;
