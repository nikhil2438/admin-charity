import React from 'react';

const TopDonors = ({ donors }) => {
  
  const safeDonors = donors || [];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Top Donors</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Category</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {safeDonors.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-2 text-center text-gray-500">
                  No donors available
                </td>
              </tr>
            ) : (
              safeDonors.map((donor, index) => (
                <tr key={index}>
                  <td className="p-2">{donor.name}</td>
                  <td className="p-2">{donor.amount}</td>
                  <td className="p-2">{donor.category}</td>
                  <td className="p-2">{donor.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopDonors;

