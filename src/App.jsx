import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DonationHistory from './components/DonationHistory';
import TopDonors from './components/TopDonors';
import Event from './components/Event';

import DonationFilter from './components/DonationFilter';
import Sidebar from './components/Sidebar'; 
import Topbar from './components/Topbar';
const App = () => {
  return (
    <Router>
       <div className="flex min-h-screen flex-col">
        
        <Topbar/>
        
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 space-y-8 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/donation-history" element={<DonationHistory />} />
            <Route path="/top-donors" element={<TopDonors />} />
            <Route path="/event" element={<Event />} />
            
            <Route path="/donation-filter" element={<DonationFilter />} />
          </Routes>
        </div>
      </div>
      </div>
    </Router>
  );
};

export default App;
