import React, { useState } from 'react';
import axios from 'axios';

const AddFunds = () => {
  const [transactionId, setTransactionId] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionId || !amount) {
      setError('Amount and Transaction ID are required.');
      return;
    }

    const formData = new FormData();
    formData.append('transactionId', transactionId);
    formData.append('amount', amount);
    if (receipt) {
      formData.append('receiptUrl', receipt);
    }

    try {
      // API call to submit fund request
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post(
        'http://localhost:5000/api/wallet/add-funds',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );

      setMessage(response.data.message);
      setError('');
      setTransactionId('');
      setAmount('');
      setReceipt(null);
    } catch (err) {
      console.error('Error submitting fund request:', err);
      setMessage('');
      setError(err.response?.data?.message || 'Failed to submit fund request.');
    }
  };

  const handleReceiptChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  return (
    <div className="add-funds-container">
      <h2 className="add-funds-title">Add Funds</h2>

      <form className="add-funds-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">Enter Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount in INR"
          required
        />

        <label htmlFor="transactionId">Transaction ID:</label>
        <input
          type="text"
          id="transactionId"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter transaction ID"
          required
        />

        <label htmlFor="receipt">Upload Receipt (optional):</label>
        <input
          type="file"
          id="receipt"
          accept="image/*"
          onChange={handleReceiptChange}
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddFunds;
