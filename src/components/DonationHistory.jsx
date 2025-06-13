// 
import React, { useEffect, useState } from 'react';

const DonationHistory = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const response = await fetch('https://charity-backend-uj5e.onrender.com/api/razorpay/donation-history');
        const data = await response.json();

        const formattedData = data
          .filter(entry => entry.donation)
          .map(entry => ({
            name: entry.FullName,
            email: entry.ContactNumber,
            amountValue: entry.amount,
amount: `₹${Number(entry.amount).toLocaleString()}`,
            category: entry.category || 'General',
            date: new Date(entry.donation.createdAt),
            dateString: new Date(entry.donation.createdAt).toLocaleDateString('en-IN', {
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


  const categories = ['All', ...new Set(donationHistory.map(item => item.category))];


  const filteredHistory = donationHistory.filter(donation => {
    const matchesSearch = `${donation.name} ${donation.email} ${donation.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || donation.category === selectedCategory;

    const matchesStartDate = startDate ? donation.date >= new Date(startDate) : true;
    const matchesEndDate = endDate ? donation.date <= new Date(endDate) : true;

    return matchesSearch && matchesCategory && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="bg-white rounded-2xl shadow-md sm:p-5">
      <h2 className="text-lg font-semibold mb-4  text-gray-700">Donation History</h2>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ">
        <input
          type="text"
          placeholder="Search by name, contact, or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}> 
              {cat}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>


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
            {filteredHistory.length > 0 ? (
              filteredHistory.map((donation, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{donation.name}</td>
                  <td className="p-2">{donation.email}</td>
                  <td className="p-2">{donation.amount}</td>
                  <td className="p-2">{donation.category}</td>
                  <td className="p-2">{donation.dateString}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 text-center" colSpan="5">
                  No donation data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationHistory;


