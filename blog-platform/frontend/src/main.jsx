import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // This import is correct

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* --- THIS IS THE FIX --- */}
    {/* The ThemeProvider should wrap the AuthProvider */}
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);