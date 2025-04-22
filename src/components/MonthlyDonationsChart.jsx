import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', amount: 10000 },
  { month: 'Feb', amount: 12000 },
  { month: 'Mar', amount: 8000 },
  { month: 'Apr', amount: 14000 },
];

const MonthlyDonationsChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Monthly Donation Trends</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Bar dataKey="amount" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyDonationsChart;
