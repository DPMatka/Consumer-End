import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import AddFunds from './pages/AddFunds';
import MarketPlay from './pages/MarketPlay';
import SingleDigit from './pages/SingleDigit';
import JodiDigit from './pages/JodiDigit';
import SinglePana from './pages/SinglePana';
import DoublePana from './pages/DoublePana';
import TriplePana from './pages/TriplePana';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header'; // New Header component

function App() {
  return (
    <Router>
      <Header /> {/* Global Header */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/play/:marketName" element={<MarketPlay />} />
          <Route path="/single-digit" element={<SingleDigit />} />
          <Route path="/jodi-digit" element={<JodiDigit />} />
          <Route path="/single-pana" element={<SinglePana />} />
          <Route path="/double-pana" element={<DoublePana />} />
          <Route path="/triple-pana" element={<TriplePana />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
