// // 
// import React from 'react';
// import logo from '../assets/logo.png';
// import { Menu } from '@headlessui/react';
// import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/solid';
// import { useNavigate } from 'react-router-dom';

// const TopBar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login');
//     window.location.reload();
//   };

//   return (
//     <div className="bg-white text-black flex justify-between items-center shadow-md px-4 py-2 w-full">
//       {/* Logo */}
//       <div className="flex items-center gap-4 flex-shrink-0">
//         <img
//           src={logo}
//           alt="Maa Siddheshwari Trust"
//           className="w-16 h-16 md:w-24 md:h-24 object-contain"
//         />
//       </div>

//       {/* Spacer for desktop */}
//       <div className="flex-grow hidden md:block" />

//       {/* Admin Dropdown */}
//       <div className="flex-shrink-0 mt-2 md:mt-0 ml-auto">
//         <Menu as="div" className="relative inline-block text-left">
//           <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition">
//             <UserIcon className="w-5 h-5" />
//             <span className="hidden md:inline">Admin</span>
//             <ChevronDownIcon className="w-4 h-4" />
//           </Menu.Button>

//           <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
//             <div className="px-1 py-1">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={`${
//                       active ? 'bg-gray-100' : ''
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                     onClick={() => navigate('/profile')}
//                   >
//                     Profile
//                   </button>
//                 )}
//               </Menu.Item>

//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={`${
//                       active ? 'bg-gray-100' : ''
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                     onClick={() => console.log('Settings clicked')}
//                   >
//                     Settings
//                   </button>
//                 )}
//               </Menu.Item>

//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={`${
//                       active ? 'bg-gray-100' : ''
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//           </Menu.Items>
//         </Menu>
//       </div>
//     </div>
//   );
// };

// export default TopBar;
