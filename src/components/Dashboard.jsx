import React, { useState } from 'react';
import logo from '../assets/logo.png';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 

import DonationFilter from './DonationFilter';
import Event from './Event';

import TopDonors from './TopDonors';

const stats = [
  { title: "Total Donations", value: "₹1,25,000" },
  { title: "Total Donors", value: "150" },
  { title: "Education", value: "₹60,000" },
  { title: "Healthcare", value: "₹40,000" },
];

const donationHistory = [
  { name: "Amit Sharma", email: "amit@example.com", amount: "₹1000", category: "Education", date: "2025-04-20" },
  { name: "Sita Devi", email: "sita@example.com", amount: "₹500", category: "Healthcare", date: "2025-04-18" },
  { name: "Ravi Kumar", email: "ravi@example.com", amount: "₹2000", category: "Food", date: "2025-04-15" },
  { name: "Meena Patel", email: "meena@example.com", amount: "₹1500", category: "Education", date: "2025-04-12" },
  // Add more donation records here
];

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Filter donations by date range
  const filterDonations = () => {
    return donationHistory.filter((donation) => {
      const donationDate = new Date(donation.date);
      if (startDate && endDate) {
        return donationDate >= startDate && donationDate <= endDate;
      }
      return true;  // If no filter is applied, show all donations
    });
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
  
      
      <DonationFilter />

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

      <TopDonors />

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Donors</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Category</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr>
                <td className="p-2">Amit Sharma</td>
                <td className="p-2">amit@example.com</td>
                <td className="p-2">₹1000</td>
                <td className="p-2">Education</td>
                <td className="p-2">April 20, 2025</td>
              </tr>
              {/* More rows can be added here */}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Donation History Button */}
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-8"
      >
        View Donation History
      </button>

      {/* Modal for Donation History */}
      <ReactModal isOpen={showModal} onRequestClose={handleCloseModal} ariaHideApp={false} className="modal-content">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Donation History</h2>

        {/* Date Filter */}
        <div className="mb-4 flex gap-4">
          <div>
            <label className="text-sm text-gray-600">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Filtered Donations Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Category</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {filterDonations().map((donation, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{donation.name}</td>
                  <td className="p-2">{donation.email}</td>
                  <td className="p-2">{donation.amount}</td>
                  <td className="p-2">{donation.category}</td>
                  <td className="p-2">{donation.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCloseModal}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default Dashboard;
