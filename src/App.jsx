
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';
import './App.css';

const App = () => {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1>Paradise Nursery</h1>
          <div>
            <Link to="/">Home</Link> | <Link to="/plants">Plants</Link> | <Link to="/cart">Cart</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={
            showProductList ? (
              <ProductList />
            ) : (
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <h2>Welcome to Paradise Nursery</h2>
                <p>Your online destination for beautiful houseplants.</p>
                <button
                  style={{ padding: '1rem 2rem', fontSize: '1.2rem', background: '#4caf50', color: 'white', border: 'none', borderRadius: '8px' }}
                  onClick={handleGetStartedClick}
                >
                  Get Started
                </button>
                <AboutUs />
              </div>
            )
          } />
          <Route path="/plants" element={<ProductList />} />
          <Route path="/cart" element={<CartItem />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
