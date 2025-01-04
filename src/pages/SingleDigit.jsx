import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SingleDigit = () => {
  const navigate = useNavigate(); // For navigation
  const [digit, setDigit] = useState("");
  const [points, setPoints] = useState("");
  const [bets, setBets] = useState([]);
  const [placedBets, setPlacedBets] = useState([]); // For Placed Bets
  const [coins, setCoins] = useState(1000);
  const [error, setError] = useState("");
  const [betType, setBetType] = useState("Open"); // Default bet type

  const handleAddBet = () => {
    if (!digit || !points) {
      setError("Both digit and points are required!");
      return;
    }

    if (parseInt(digit) < 0 || parseInt(digit) > 9) {
      setError("Digit must be between 0 and 9!");
      return;
    }

    if (parseInt(points) <= 0) {
      setError("Points must be greater than 0!");
      return;
    }

    const newBet = {
      betId: Math.random().toString(36).substr(2, 9), // Unique Bet ID
      userId: "12345", // Static User ID for now
      gameId: "single-digit", // Static Game ID for this example
      betType, // Include bet type (Open or Close)
      digit,
      points,
      isPlaced: false,
      isWin: false,
    };

    setBets([...bets, newBet]);
    setDigit("");
    setPoints("");
    setError("");
  };

  const handleDeleteBet = (index) => {
    setBets(bets.filter((_, i) => i !== index));
  };

  const handlePlaceBet = () => {
    const totalPoints = bets.reduce(
      (sum, bet) => sum + parseInt(bet.points, 10),
      0
    );

    if (totalPoints === 0) {
      setError("No bets to place!");
      return;
    }

    if (coins < totalPoints) {
      setError("Insufficient coins!");
      return;
    }

    // Move bets to Placed Bets
    const updatedPlacedBets = bets.map((bet) => ({
      ...bet,
      isPlaced: true,
    }));

    setPlacedBets([...placedBets, ...updatedPlacedBets]);
    setCoins(coins - totalPoints);
    setBets([]); // Clear current bets
    setError("");
    alert("Bet placed successfully!");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-5">
      {/* Game Header */}
      <header className="flex items-center bg-gray-800 p-4 shadow-lg mb-5">
        {/* Back Arrow */}
        <button
          onClick={() => navigate(-1)} // Back navigation
          className="mr-4 bg-transparent text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
          aria-label="Go Back"
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
        <h2 className="text-xl font-bold">Single Digit</h2>
        <div className="ml-auto bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold">
          💰 Coins: {coins}
        </div>
      </header>

      {/* Bet Type Switch */}
      <div className="flex justify-center mb-5">
        <button
          onClick={() => setBetType("Open")}
          className={`px-6 py-2 rounded-l-lg font-bold ${
            betType === "Open"
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-400"
          } hover:bg-purple-700 transition duration-300`}
        >
          Open
        </button>
        <button
          onClick={() => setBetType("Close")}
          className={`px-6 py-2 rounded-r-lg font-bold ${
            betType === "Close"
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-400"
          } hover:bg-purple-700 transition duration-300`}
        >
          Close
        </button>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <input
          type="number"
          placeholder="Enter Digit"
          value={digit}
          onChange={(e) => setDigit(e.target.value)}
          className="col-span-1 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="number"
          placeholder="Enter Points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          className="col-span-1 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={handleAddBet}
          className="col-span-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-bold transition duration-300"
        >
          Add Bet
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center mb-5">
          {error}
        </div>
      )}

      {/* Current Bets Table */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg mb-5">
        <h3 className="text-lg font-bold mb-4">Current Bets</h3>
        <table className="w-full table-auto mb-4">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="px-4 py-2">Digit</th>
              <th className="px-4 py-2">Points</th>
              <th className="px-4 py-2">Bet Type</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet, index) => (
              <tr key={bet.betId} className="border-b border-gray-700">
                <td className="px-4 py-2">{bet.digit}</td>
                <td className="px-4 py-2">{bet.points}</td>
                <td className="px-4 py-2">{bet.betType}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleDeleteBet(index)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-white font-bold transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Place Bet Button */}
      <button
        onClick={handlePlaceBet}
        className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold text-lg mb-5 transition duration-300"
      >
        Place Bet
      </button>

      {/* Placed Bets Table */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4">Placed Bets</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="px-4 py-2">Digit</th>
              <th className="px-4 py-2">Points</th>
              <th className="px-4 py-2">Bet Type</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {placedBets.map((bet) => (
              <tr key={bet.betId} className="border-b border-gray-700">
                <td className="px-4 py-2">{bet.digit}</td>
                <td className="px-4 py-2">{bet.points}</td>
                <td className="px-4 py-2">{bet.betType}</td>
                <td className="px-4 py-2">
                  {bet.isWin ? (
                    <span className="text-green-500 font-bold">Win</span>
                  ) : (
                    <span className="text-yellow-500 font-bold">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleDigit;
