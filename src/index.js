import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CSVExport from './components/CSVExport';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      {/* Wrap the app with BrowserRouter for routing */}
      <Router>
        <Routes>
          {/* Define the homepage route */}
          <Route path="/" element={<App />} />

          {/* Define the preview page route */}
          <Route path="/csv" element={<CSVExport/>} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
