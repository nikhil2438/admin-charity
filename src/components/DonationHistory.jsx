import React from 'react';

const donationHistory = [
  { name: "Amit Sharma", email: "amit@example.com", amount: "₹1000", category: "Education", date: "April 20, 2025" },
  { name: "Sita Devi", email: "sita@example.com", amount: "₹500", category: "Healthcare", date: "April 18, 2025" },
  { name: "Ravi Kumar", email: "ravi@example.com", amount: "₹2000", category: "Food", date: "April 15, 2025" },
  { name: "Meena Patel", email: "meena@example.com", amount: "₹1500", category: "Education", date: "April 12, 2025" },
  
];

const DonationHistory = () => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">Donation History</h2>
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
          {donationHistory.map((donation, index) => (
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
  </div>
);

export default DonationHistory;
