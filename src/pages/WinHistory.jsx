import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import winHistoryData from "./winHistory.json"; // Importing sample win data

const WinHistory = () => {
  const navigate = useNavigate();
  const [wins] = useState(winHistoryData.wins); // Directly using sample JSON data

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
        <h2 className="text-lg font-bold">Win History</h2>
      </div>

      {/* Wins Table */}
      {wins.length === 0 ? (
        <div className="text-center text-gray-400">No wins found.</div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 text-left">Game</th>
                <th className="p-2 text-left">Bet Type</th>
                <th className="p-2 text-left">Points</th>
                <th className="p-2 text-left">Win Amount</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {wins.map((win, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-2">{win.game}</td>
                  <td className="p-2">{win.betType}</td>
                  <td className="p-2">{win.points}</td>
                  <td className="p-2 text-green-500 font-semibold">
                    {win.winAmount}
                  </td>
                  <td className="p-2">
                    {new Date(win.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WinHistory;
