import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import coinSettlementsData from "./coinSettlements.json"; // Importing sample JSON

const CoinSettlements = () => {
  const navigate = useNavigate();
  const [transactions] = useState(coinSettlementsData.transactions);

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
        <h2 className="text-lg font-bold">Coin Settlements</h2>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full table-auto text-sm">
            <thead className="sticky top-0 bg-gray-700">
              <tr>
                <th className="p-2 text-left">Transaction ID</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-2">{transaction.transactionId}</td>
                  <td className="p-2">{transaction.amount}</td>
                  <td
                    className={`p-2 font-semibold ${
                      transaction.status === "Approved"
                        ? "text-green-500"
                        : transaction.status === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {transaction.status}
                  </td>
                  <td className="p-2">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoinSettlements;
