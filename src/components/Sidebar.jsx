// 
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <>
      
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed left-4 top-4 z-50 flex flex-col justify-between w-8 h-6 p-1 bg-red-800 rounded"
        aria-label={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      >
        <span className={`block w-full h-0.5 bg-white transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
        <span className={`block w-full h-0.5 bg-white transition duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-full h-0.5 bg-white transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
      </button>

  
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-red-800 text-white p-4 transform transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative md:h-auto md:flex md:flex-col md:w-64`}
      >
        
        <div className="flex items-center gap-2 mb-6">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain   " />
          <span className="text-xl font-bold">Maa Siddheshwari Trust</span>
        </div>

      
        <div className="mb-4">
          <Link
            to="/profile"
            onClick={handleLinkClick}
            className={`block py-2 px-4 rounded-md bg-white text-red-800 font-semibold hover:bg-gray-100`}
          >
            Profile
          </Link>
        </div>

      
        <ul className="space-y-4 flex-1">
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
              Admin Fundraiser
            </Link>
          </li>
          <li>
            <Link
              to="/fundrelease-admin"
              onClick={handleLinkClick}
              className={`block py-2 px-4 rounded-md ${
                location.pathname === '/fundrelease-admin' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Fund Release Admin
            </Link>
          </li>
        </ul>

        
        <div className="mt-auto pt-4 border-t border-white/30">
          <button
            onClick={handleLogout}
            className="block w-full py-2 px-4 text-left rounded-md bg-white text-red-800 font-semibold hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
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
