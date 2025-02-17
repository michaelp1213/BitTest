// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';




const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Create root

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
