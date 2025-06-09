
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo1 from '../assets/logo1.png';

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const handleLinkClick = () => setIsDrawerOpen(false);
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/event', label: 'Events' },
    { path: '/donation-history', label: 'Donation History' },
    { path: '/admin-fundraisers', label: 'Admin Fundraiser' },
    { path: '/fundrelease-admin', label: 'Fund Release Admin' },
  ];

  return (
    <>
      {/* Mobile TopBar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-red-800 text-white p-3 flex items-center justify-between shadow">
        <div className="flex items-center gap-2">
          <img src={logo1} alt="logo1" className="w-10 h-10 object-contain" />
          <span className="text-lg font-bold">Maa Siddheshwari Trust</span>
        </div>
        <button onClick={toggleDrawer} className="focus:outline-none">
          <div className="flex flex-col justify-between w-6 h-5">
            <span className="h-0.5 w-full bg-white" />
            <span className="h-0.5 w-full bg-white" />
            <span className="h-0.5 w-full bg-white" />
          </div>
        </button>
      </div>

      {/* Drawer Modal (mobile only) */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleDrawer}
          ></div>
          <div
            className="fixed top-0 left-0 h-full w-64 bg-red-800 text-white p-4 z-50 transform transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-6">
              <img src={logo1} alt="logo1" className="w-10 h-10 object-contain" />
              <span className="text-lg font-bold">Maa Siddheshwari Trust</span>
            </div>

            <Link
              to="/profile"
              onClick={handleLinkClick}
              className="block py-2 px-4 mb-4 rounded-md bg-white text-red-800 font-semibold hover:bg-gray-100"
            >
              Profile
            </Link>

            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`block py-2 px-4 rounded-md ${
                      location.pathname === link.path
                        ? 'bg-gray-700'
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-4 border-t border-white/30">
              <button
                onClick={() => {
                  toggleDrawer();
                  handleLogout();
                }}
                className="block w-full py-2 px-4 text-left rounded-md bg-white text-red-800 font-semibold hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:flex flex-col w-64 bg-red-800 text-white p-4 min-h-screen">
        <div className="flex items-center gap-2 mb-6">
          <img src={logo1} alt="logo1" className="w-12 h-12 object-contain" />
          <span className="text-xl font-bold">Maa Siddheshwari Trust</span>
        </div>

        <Link
          to="/profile"
          className="block py-2 px-4 mb-4 rounded-md bg-white text-red-800 font-semibold hover:bg-gray-100"
        >
          Profile
        </Link>

        <ul className="space-y-4 flex-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block py-2 px-4 rounded-md ${
                  location.pathname === link.path
                    ? 'bg-gray-700'
                    : 'hover:bg-gray-700'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
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
    </>
  );
};

export default Sidebar;
