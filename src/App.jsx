import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import DonationHistory from './components/DonationHistory';
import TopDonors from './components/TopDonors';
import Event from './components/Event';
import Login from './components/Login';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';    
import AdminFundraisers from './components/AdminFundraisers';
import FundReleaseAdmin from './components/FundReleaseAdmin';

const AuthenticatedLayout = ({ children, toggleSidebar, isSidebarOpen }) => (
  <div className="flex min-h-screen flex-col">
    <Topbar toggleSidebar={toggleSidebar} />
    <div className="flex flex-1">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 p-6 bg-gray-50 ${isSidebarOpen ? 'ml-64' : ''}`}>
        {children}
      </div>
    </div>
  </div>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // ✅ This keeps the user logged in on page refresh
    return localStorage.getItem('user') !== null;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('user', 'logged-in'); // store something minimal
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <Dashboard />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/donation-history"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <DonationHistory />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/top-donors"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <TopDonors />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/event"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <Event />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <Profile />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin-fundraisers"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <AdminFundraisers />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/fundrelease-admin"
          element={
            isAuthenticated ? (
              <AuthenticatedLayout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <FundReleaseAdmin />
              </AuthenticatedLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
 
