// src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProductSelection from './ProductSelection';
import OrderConfirmation from './OrderConfirmation';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductSelection />} />
      <Route path="/order" element={<OrderConfirmation />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
