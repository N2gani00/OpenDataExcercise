import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductPage from './App'; // Import your ProductPage component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductPage /> {/* Render ProductPage */}
  </React.StrictMode>
);
