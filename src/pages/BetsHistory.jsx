import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sampleBets from "./sampleBets.json"; // Importing sample bets

const BetsHistory = () => {
  const navigate = useNavigate();
  const [bets] = useState(sampleBets.bets); // Directly using sample JSON data

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
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
        <h2 className="text-lg font-bold">Bet History</h2>
      </div>

      {/* Bets Table */}
      {bets.length === 0 ? (
        <div className="text-center text-gray-400">No bets found.</div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 text-left">Game</th>
                <th className="p-2 text-left">Bet Type</th>
                <th className="p-2 text-left">Points</th>
                <th className="p-2 text-left">Result</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {bets.map((bet, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-2">{bet.game}</td>
                  <td className="p-2">{bet.betType}</td>
                  <td className="p-2">{bet.points}</td>
                  <td className={`p-2 ${bet.isWin ? "text-green-500" : "text-red-500"}`}>
                    {bet.isWin ? "Win" : "Loss"}
                  </td>
                  <td className="p-2">{new Date(bet.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BetsHistory;
