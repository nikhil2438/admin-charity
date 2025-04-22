import React from 'react';
import logo from '../assets/logo.png';

const TopBar = () => {
  return (
    <div className="bg-white text-black s flex justify-between items-center shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Maa Siddheshwari Trust"
          className="w-24 h-24 md:w-36 md:h-36 object-contain"
        />
      </div>
      <button
        className="px-4 py-2 bg-red-800 rounded-md text-white"
        aria-label="Log Out"
      >
        Log Out
      </button>
    </div>
  );
};

export default TopBar;
 
