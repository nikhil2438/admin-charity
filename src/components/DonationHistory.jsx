import React, { useEffect, useState } from 'react';

const DonationHistory = () => {
  const [donationHistory, setDonationHistory] = useState([]);

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/razorpay/donation-history');
        const data = await response.json();

        
        const formattedData = data
          .filter(entry => entry.donation) 
          .map(entry => ({
            name: entry.FullName,
            email: entry.ContactNumber, 
            amount: `₹${(entry.donation.amount / 100).toLocaleString()}`,
            category: entry.category || 'General',
            date: new Date(entry.donation.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          }));

        setDonationHistory(formattedData);
      } catch (error) {
        console.error('Failed to fetch donation history:', error);
      }
    };

    fetchDonationHistory();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Donation History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Category</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {donationHistory.length > 0 ? (
              donationHistory.map((donation, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{donation.name}</td>
                  <td className="p-2">{donation.email}</td>
                  <td className="p-2">{donation.amount}</td>
                  <td className="p-2">{donation.category}</td>
                  <td className="p-2">{donation.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 text-center" colSpan="5">No donation data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationHistory;
 
