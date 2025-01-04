import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TriplePana = () => {
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

    if (!/^\d{3}$/.test(input)) {
      setError("Input must be a three-digit number!");
      return;
    }

    if (parseInt(points) <= 0) {
      setError("Points must be greater than 0!");
      return;
    }

    const newBet = {
      betId: Math.random().toString(36).substr(2, 9),
      userId: "12345",
      gameId: "triple-pana",
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
    <div className="bg-gray-900 text-white min-h-screen p-5">
      <header className="flex items-center bg-gray-800 p-4 shadow-lg mb-5">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 bg-transparent text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
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
        <h2 className="text-xl font-bold">Triple Pana</h2>
        <div className="ml-auto bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold">
          💰 Coins: {coins}
        </div>
      </header>

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

      <div className="grid grid-cols-3 gap-4 mb-5">
        <input
          type="text"
          placeholder="Enter Triple Pana (3-digit)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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

      {error && (
        <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center mb-5">
          {error}
        </div>
      )}

      <div className="bg-gray-800 p-5 rounded-lg shadow-lg mb-5">
        <h3 className="text-lg font-bold mb-4">Current Bets</h3>
        <table className="w-full table-auto mb-4">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="px-4 py-2">Triple Pana</th>
              <th className="px-4 py-2">Points</th>
              <th className="px-4 py-2">Bet Type</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet, index) => (
              <tr key={bet.betId} className="border-b border-gray-700">
                <td className="px-4 py-2">{bet.input}</td>
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

      <button
        onClick={handlePlaceBet}
        className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold text-lg mb-5 transition duration-300"
      >
        Place Bet
      </button>

      <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4">Placed Bets</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="px-4 py-2">Triple Pana</th>
              <th className="px-4 py-2">Points</th>
              <th className="px-4 py-2">Bet Type</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {placedBets.map((bet) => (
              <tr key={bet.betId} className="border-b border-gray-700">
                <td className="px-4 py-2">{bet.input}</td>
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

export default TriplePana;
