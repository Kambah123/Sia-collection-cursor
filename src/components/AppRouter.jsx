import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import Header from './Header';
import Hero from './Hero';
import Categories from './Categories';
import FeaturedProducts from './FeaturedProducts';
import Footer from './Footer';
import AdminApp from './AdminApp';
import Checkout from './Checkout';
import OrderSuccess from './OrderSuccess';

const MainSite = ({ onCheckout }) => (
  <div className="min-h-screen bg-white">
    <Header onCheckout={onCheckout} />
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </main>
    <Footer />
  </div>
);

const AppRouter = () => {
  const [currentView, setCurrentView] = useState('main'); // 'main', 'checkout', 'success'
  const [orderData, setOrderData] = useState(null);

  const handleCheckout = () => {
    setCurrentView('checkout');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  const handleOrderComplete = (data) => {
    setOrderData(data);
    setCurrentView('success');
  };

  const handleContinueShopping = () => {
    setCurrentView('main');
    setOrderData(null);
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              currentView === 'main' ? (
                <MainSite onCheckout={handleCheckout} />
              ) : currentView === 'checkout' ? (
                <Checkout 
                  onBack={handleBackToMain}
                  onOrderComplete={handleOrderComplete}
                />
              ) : (
                <OrderSuccess 
                  orderData={orderData}
                  onContinueShopping={handleContinueShopping}
                />
              )
            } 
          />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default AppRouter;

