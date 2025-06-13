
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
    fetch('https://charity-backend-uj5e.onrender.com/api/donations/summary') 
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
      <div className=" text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
  
  <div className=" bg-gray-50 min-h-screen ">
  
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 mt-20 sm:mt-2 ">
  {/* Total Donations */}
  <div className="bg-white rounded-2xl shadow p-4 w-full">
    <div className="text-gray-500 text-sm">Total Donations</div>
    <div className="text-2xl font-bold break-words">
      ₹{summary.totalAmount.toLocaleString()}
    </div>
  </div>

  {/* Total Donors */}
  <div className=" rounded-2xl shadow p-4 w-full">
    <div className="text-gray-500 text-sm">Total Donors</div>
    <div className="text-2xl font-bold break-words">
      {summary.totalDonors}
    </div>
  </div>

  {/* Category-wise Donations */}
  {summary.categoryTotals && Object.keys(summary.categoryTotals).length > 0 ? (
    Object.entries(summary.categoryTotals).map(([category, amount], index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow p-4 w-full"
      >
        <div className="text-gray-500 text-sm break-words">{category}</div>
        <div className="text-2xl font-bold break-words">
          ₹{amount.toLocaleString()}
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center text-gray-500">
      No category donation data available.
    </div>
  )}
</div>


    
    <div className=" gap-6">
      <Event />
    </div>

    
    <DonationHistory />
  


    </div>
  );
};

export default Dashboard;
 
