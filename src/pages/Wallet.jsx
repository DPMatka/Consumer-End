import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(1500); // Initial wallet balance
  const [amount, setAmount] = useState(""); // Input field for amount
  const [error, setError] = useState(""); // Error message

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (!depositAmount || depositAmount <= 0) {
      setError("Please enter a valid deposit amount.");
      return;
    }
    setBalance(balance + depositAmount);
    setAmount("");
    setError("");
    alert(`Successfully deposited ${depositAmount} coins.`);
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (!withdrawAmount || withdrawAmount <= 0) {
      setError("Please enter a valid withdraw amount.");
      return;
    }
    if (withdrawAmount > balance) {
      setError("Insufficient balance.");
      return;
    }
    setBalance(balance - withdrawAmount);
    setAmount("");
    setError("");
    alert(`Successfully withdrew ${withdrawAmount} coins.`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center bg-gray-800 p-3 rounded-lg shadow-md w-full max-w-md mb-5">
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
        <h2 className="text-lg font-bold">Wallet</h2>
      </div>

      {/* Wallet Balance */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 w-full max-w-md p-6 rounded-lg shadow-lg text-center mb-5">
        <h3 className="text-lg font-bold mb-3">Wallet Balance</h3>
        <p className="text-4xl font-bold text-yellow-300">💰 {balance} Coins</p>
      </div>

      {/* Input Field for Amount */}
      <div className="w-full max-w-md mb-5">
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center mb-3">
          {error}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between gap-4 w-full max-w-md">
        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-4 py-3 rounded-lg font-bold text-white shadow-lg transition duration-300 transform hover:scale-105"
        >
          Withdraw
        </button>
        {/* Deposit Button */}
        <button
          onClick={handleDeposit}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 px-4 py-3 rounded-lg font-bold text-white shadow-lg transition duration-300 transform hover:scale-105"
        >
          Deposit
        </button>
      </div>
    </div>
  );
};

export default Wallet;
