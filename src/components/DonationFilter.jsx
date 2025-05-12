// import React, { useState } from 'react';

// const DonationFilter = ({ onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     startDate: '',
//     endDate: '',
//     category: '',
//     paymentType: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedFilters = { ...filters, [name]: value };
//     setFilters(updatedFilters);
//     onFilterChange(updatedFilters);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
//       <h2 className="text-lg font-semibold text-gray-700">Filter Donations</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         <div>
//           <label className="text-sm text-gray-600">Start Date</label>
//           <input
//             type="date"
//             name="startDate"
//             value={filters.startDate}
//             onChange={handleChange}
//             className="w-full border rounded px-2 py-1"
//           />
//         </div>
//         <div>
//           <label className="text-sm text-gray-600">End Date</label>
//           <input
//             type="date"
//             name="endDate"
//             value={filters.endDate}
//             onChange={handleChange}
//             className="w-full border rounded px-2 py-1"
//           />
//         </div>
//         <div>
//           <label className="text-sm text-gray-600">Category</label>
//           <select
//             name="category"
//             value={filters.category}
//             onChange={handleChange}
//             className="w-full border rounded px-2 py-1"
//           >
//             <option value="">All</option>
//             <option value="Education">Education</option>
//             <option value="Healthcare">Healthcare</option>
//             <option value="Others">Others</option>
//           </select>
//         </div>
//         <div>
//           <label className="text-sm text-gray-600">Payment Type</label>
//           <select
//             name="paymentType"
//             value={filters.paymentType}
//             onChange={handleChange}
//             className="w-full border rounded px-2 py-1"
//           >
//             <option value="">All</option>
//             <option value="QR">QR</option>
//             <option value="Online">Online</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonationFilter;
