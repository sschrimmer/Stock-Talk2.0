import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Dashboard from './components/Dashboard/Dashboard'; // Import the Dashboard component
import reportWebVitals from './reportWebVitals';
import { loadStripe } from '@stripe/stripe-js';
import GlobalStyle from './globalStyling';

const stripePromise = loadStripe('pk_test_51NnuTDCQo2qBMXyzMFBiah3MrptUU26TlomFrK8VMfEJIeWfP8YiEvq6fbhKdAwDGdQkvLGBxMe0tAE4eU2Sk1w800zaYgqjnv');
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the Dashboard component as the default
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Dashboard />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

