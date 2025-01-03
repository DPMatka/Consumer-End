// src/pages/DoublePana.jsx
import React, { useState } from 'react';

const DoublePana = () => {
  const [input, setInput] = useState('');
    const [points, setPoints] = useState('');
    const [bets, setBets] = useState([]);
    const [coins, setCoins] = useState(1000);
    const [error, setError] = useState('');
  
    const handleAddBet = () => {
      if (!input || !points) {
        setError('Both input and points are required!');
        return;
      }
  
      if (!/^\d{3}$/.test(input)) {
        setError('Input must be a three-digit number!');
        return;
      }
  
      if (parseInt(points) <= 0) {
        setError('Points must be greater than 0!');
        return;
      }
  
      setBets([...bets, { input, points }]);
      setInput('');
      setPoints('');
      setError('');
    };
  
    const handleDeleteBet = (index) => {
      setBets(bets.filter((_, i) => i !== index));
    };
  
    const handlePlaceBet = () => {
      const totalPoints = bets.reduce((sum, bet) => sum + parseInt(bet.points, 10), 0);
  
      if (totalPoints === 0) {
        setError('No bets to place!');
        return;
      }
  
      if (coins < totalPoints) {
        setError('Insufficient coins!');
        return;
      }
  
      setCoins(coins - totalPoints);
      alert('Bet placed successfully!');
      setBets([]);
      setError('');
    };
  
    return (
      <div className="game-page">
        <header className="header">
            <h1>Double Pana</h1>
            <div className="wallet-info">
                <span className="wallet-balance">💰 Coins: 259</span>
            </div>
        </header>
  
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter Input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter Points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="input-field"
          />
          <button onClick={handleAddBet} className="add-button">Add Bet</button>
        </div>
  
        {error && <div className="error">{error}</div>}
  
        <div className="bet-list">
          <table>
            <thead>
              <tr>
                <th>Input</th>
                <th>Points</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bets.map((bet, index) => (
                <tr key={index}>
                  <td>{bet.input}</td>
                  <td>{bet.points}</td>
                  <td>
                    <button onClick={() => handleDeleteBet(index)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <strong>Total Points: </strong>
            {bets.reduce((sum, bet) => sum + parseInt(bet.points, 10), 0)}
          </div>
        </div>
  
        <button onClick={handlePlaceBet} className="play">Place Bet</button>
      </div>
    );
  };

export default DoublePana;
