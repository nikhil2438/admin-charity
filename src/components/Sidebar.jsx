import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  return (
    <>
    
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed left-4 top-4 z-50 flex flex-col justify-between w-8 h-6 p-1 bg-red-800 rounded"
        aria-label={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      >
        <span
          className={`block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        ></span>
        <span
          className={`block w-full h-0.5 bg-white transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}
        ></span>
        <span
          className={`block w-full h-0.5 bg-white transform transition duration-300 ease-in-out ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        ></span>
      </button>

    
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-red-800 text-white p-4 transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:top-auto md:left-auto md:h-auto md:flex md:flex-col md:w-64`}
      >
        <h1 className="text-2xl font-bold mb-8">Maa Siddheshwari Trust</h1>
        <ul className="space-y-4">
          
          <li>
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`block py-2 px-4 rounded-md ${
                location.pathname === '/' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Dashboard
            </Link>
          </li>
      
          <li>
            <Link
              to="/event"
              onClick={handleLinkClick}
              className={`block py-2 px-4 rounded-md ${
                location.pathname === '/event' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Events
            </Link>
          </li>
          
          <li>
            <Link
              to="/donation-history"
              onClick={handleLinkClick}
              className={`block py-2 px-4 rounded-md ${
                location.pathname === '/donation-history' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Donation History
            </Link>
          </li>

          
  <li>
  <Link
    to="/admin-fundraisers"
    onClick={handleLinkClick}
    className={`block py-2 px-4 rounded-md ${
      location.pathname === '/admin-fundraisers' ? 'bg-gray-700' : 'hover:bg-gray-700'
    }`}
  >
    AdminFundraiser
  </Link>
</li>

<li>
  <Link
    to="/fundrelease-admin"
    onClick={handleLinkClick}
    className={`block py-2 px-4 rounded-md ${
      location.pathname === '/admin-fundraisers' ? 'bg-gray-700' : 'hover:bg-gray-700'
    }`}
  >
    FundReleaseAdmin
  </Link>
</li>


        </ul>
      </div>

    
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
