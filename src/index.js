//Import necessary libraries and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import * as environments from './environments';
import Parse from 'parse';

// INITIALIZATION
Parse.initialize(environments.APPLICATION_ID, environments.JAVASCRIPT_KEY);
Parse.serverURL = environments.SERVER_URL;

// RENDER APP
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
