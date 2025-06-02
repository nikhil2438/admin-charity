import React, { useEffect, useState } from 'react';
import Event from './Event';
import DonationHistory from './DonationHistory';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalAmount: 0,
    totalDonors: 0,
    categoryTotals: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/donations/summary') 
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching summary:", err);
        setError("Failed to load summary data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        <style>{`
          .loader {
            border-top-color: #3498db;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="text-gray-500 text-sm">Total Donations</div>
          <div className="text-2xl font-bold">₹{summary.totalAmount.toLocaleString()}</div>
        </div>

        
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="text-gray-500 text-sm">Total Donors</div>
          <div className="text-2xl font-bold">{summary.totalDonors}</div>
        </div>

        
        {summary.categoryTotals && Object.keys(summary.categoryTotals).length > 0 ? (
          Object.entries(summary.categoryTotals).map(([category, amount], index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-4">
              <div className="text-gray-500 text-sm">{category}</div>
              <div className="text-2xl font-bold">₹{amount.toLocaleString()}</div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No category donation data available.
          </div>
        )}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Event />
      </div>

    
      <DonationHistory />
    </div>
  );
};

export default Dashboard;
 
