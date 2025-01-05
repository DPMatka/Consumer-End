import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JodiDigit = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [points, setPoints] = useState("");
  const [bets, setBets] = useState([]);
  const [placedBets, setPlacedBets] = useState([]);
  const [coins, setCoins] = useState(1000);
  const [error, setError] = useState("");
  const [betType, setBetType] = useState("Open");

  const handleAddBet = () => {
    if (!input || !points) {
      setError("Both input and points are required!");
      return;
    }

    if (!/^\d{2}$/.test(input)) {
      setError("Input must be a two-digit number!");
      return;
    }

    if (parseInt(points) <= 0) {
      setError("Points must be greater than 0!");
      return;
    }

    const newBet = {
      betId: Math.random().toString(36).substr(2, 9),
      userId: "12345",
      gameId: "jodi-digit",
      betType,
      input,
      points,
      isPlaced: false,
      isWin: false,
    };

    setBets([...bets, newBet]);
    setInput("");
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

    const updatedPlacedBets = bets.map((bet) => ({
      ...bet,
      isPlaced: true,
    }));

    setPlacedBets([...placedBets, ...updatedPlacedBets]);
    setCoins(coins - totalPoints);
    setBets([]);
    setError("");
    alert("Bet placed successfully!");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <header className="flex items-center bg-gray-800 p-3 shadow-md mb-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 bg-transparent text-white p-1 rounded-full hover:bg-gray-700 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold">Jodi Digit</h2>
        <div className="ml-auto bg-yellow-500 text-gray-900 px-3 py-1 rounded-full font-medium">
          💰 Coins: {coins}
        </div>
      </header>

      {/* Bet Type Switch */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setBetType("Open")}
          className={`px-5 py-1 rounded-l-md text-sm font-medium ${
            betType === "Open"
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-400"
          } hover:bg-purple-700 transition duration-200`}
        >
          Open
        </button>
        <button
          onClick={() => setBetType("Close")}
          className={`px-5 py-1 rounded-r-md text-sm font-medium ${
            betType === "Close"
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-400"
          } hover:bg-purple-700 transition duration-200`}
        >
          Close
        </button>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter Jodi (2-digit)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="col-span-1 px-3 py-1 bg-gray-800 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="number"
          placeholder="Enter Points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          className="col-span-1 px-3 py-1 bg-gray-800 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={handleAddBet}
          className="col-span-1 bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md text-sm font-medium transition duration-200"
        >
          Add Bet
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-600 text-white px-3 py-1 rounded-md text-center mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Current Bets Table */}
      <div className="bg-gray-800 p-4 rounded-md shadow-md mb-4">
        <h3 className="text-sm font-semibold mb-3">Current Bets</h3>
        <table className="w-full text-sm table-auto mb-3">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-3 py-1">Jodi</th>
              <th className="px-3 py-1">Points</th>
              <th className="px-3 py-1">Bet Type</th>
              <th className="px-3 py-1 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet, index) => (
              <tr key={bet.betId} className="border-b border-gray-700">
                <td className="px-3 py-1">{bet.input}</td>
                <td className="px-3 py-1">{bet.points}</td>
                <td className="px-3 py-1">{bet.betType}</td>
                <td className="px-3 py-1 text-right">
                  <button
                    onClick={() => handleDeleteBet(index)}
                    className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md text-white text-xs font-medium transition duration-200"
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
        className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-md text-sm font-medium transition duration-200 mb-4"
      >
        Place Bet
      </button>

      {/* Placed Bets Table */}
      <div className="bg-gray-800 p-4 rounded-md shadow-md">
        <h3 className="text-sm font-semibold mb-3">Placed Bets</h3>
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-3 py-1">Jodi</th>
              <th className="px-3 py-1">Points</th>
              <th className="px-3 py-1">Bet Type</th>
              <th className="px-3 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {placedBets.map((bet) => (
              <tr key={bet.betId} className="border-b border-gray-700">
                <td className="px-3 py-1">{bet.input}</td>
                <td className="px-3 py-1">{bet.points}</td>
                <td className="px-3 py-1">{bet.betType}</td>
                <td className="px-3 py-1">
                  {bet.isWin ? (
                    <span className="text-green-500 font-medium">Win</span>
                  ) : (
                    <span className="text-yellow-500 font-medium">Pending</span>
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

export default JodiDigit;
