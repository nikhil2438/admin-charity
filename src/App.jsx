import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import DonationHistory from './components/DonationHistory';
import TopDonors from './components/TopDonors';
import Event from './components/Event';
import Login from './components/Login';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';    

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div className="flex min-h-screen flex-col">
                <Topbar toggleSidebar={toggleSidebar} /> 
                <div className="flex flex-1">
                  <Sidebar isOpen={isSidebarOpen} />
                  <div className={`flex-1 p-6 space-y-8 bg-gray-50 ${isSidebarOpen ? 'ml-64' : ''}`}>
                    <Dashboard />
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/donation-history"
          element={isAuthenticated ? (
            <div className="flex min-h-screen flex-col">
              <Topbar toggleSidebar={toggleSidebar} />
              <div className="flex flex-1">
                <Sidebar isOpen={isSidebarOpen} />
                <div className={`flex-1 p-6 space-y-8 bg-gray-50 ${isSidebarOpen ? 'ml-64' : ''}`}>
                  <DonationHistory />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/top-donors"
          element={isAuthenticated ? (
            <div className="flex min-h-screen flex-col">
              <Topbar toggleSidebar={toggleSidebar} />
              <div className="flex flex-1">
                <Sidebar isOpen={isSidebarOpen} />
                <div className={`flex-1 p-6 space-y-8 bg-gray-50 ${isSidebarOpen ? 'ml-64' : ''}`}>
                  <TopDonors />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/event"
          element={isAuthenticated ? (
            <div className="flex min-h-screen flex-col">
              <Topbar toggleSidebar={toggleSidebar} />
              <div className="flex flex-1">
                <Sidebar isOpen={isSidebarOpen} />
                <div className={`flex-1 p-6 space-y-8 bg-gray-50 ${isSidebarOpen ? 'ml-64' : ''}`}>
                  <Event />
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </Router>
  );
};

export default App;