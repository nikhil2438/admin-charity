
import React from 'react';
import logo from '../assets/logo.png';
import Event from './Event';
import TopDonors from './TopDonors';
import DonationHistory from './DonationHistory';

const stats = [
  { title: "Total Donations", value: "₹1,25,000" },
  { title: "Total Donors", value: "150" },
  { title: "Education", value: "₹60,000" },
  { title: "Healthcare", value: "₹40,000" },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-4">
            <div className="text-gray-500 text-sm">{stat.title}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Event />
      </div>

      <DonationHistory />
    </div>
  );
};

export default Dashboard;
