import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import { getCSRFToken } from '../../services/authService';
import { useLanguage } from '../../context/LanguageContext';
import SocialLinks from '../SocialLinks';
import Inquiries from '../Inquiries';

export default function TopBar() {
  useEffect(() => {
    getCSRFToken();
  }, []);

  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const { language, changeLanguage } = useLanguage();

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  return (
  <div className="w-full bg-gradient-to-r from-rose-800 via-red-700 to-rose-900 text-white shadow-md rounded-b-3xl">
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex flex-col gap-y-3 md:flex-row md:items-center md:justify-between">
        
        {/* === Left Section === */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-6 gap-y-2">
          
          {/* Language Switch */}
          <div className="flex items-center space-x-1 bg-white text-gray-700 rounded-full px-2 py-1 shadow-inner w-fit">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                language === 'en'
                  ? 'bg-red-700 text-white shadow'
                  : 'hover:bg-gray-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('si')}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                language === 'si'
                  ? 'bg-red-700 text-white shadow'
                  : 'hover:bg-gray-200'
              }`}
            >
              SI
            </button>
          </div>

          {/* Social Links */}
          <div className="w-full sm:w-auto">
            <SocialLinks />
          </div>

          
        </div>

        {/* === Right Section === */}
        <div className="flex items-center justify-center gap-4">
          {/* Inquiries */}
          <div className="hidden sm:block">
            <Inquiries />
          </div>
          {user ? (
            <>
              <span className="text-sm font-medium hidden sm:inline">
                {user.first_name} {user.last_name}
              </span>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 focus:outline-none group"
                >
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt="Profile"
                      className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white text-red-700 font-bold flex items-center justify-center shadow">
                      {user.first_name.charAt(0)}
                      {user.last_name.charAt(0)}
                    </div>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${
                      showDropdown ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showDropdown && (
                  <ProfileDropdown
                    user={user}
                    onClose={() => setShowDropdown(false)}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                href="/login"
                className="px-4 py-1.5 text-sm rounded-md border border-white hover:bg-white hover:text-red-700 transition"
              >
                Log In
              </a>
              <a
                href="/register"
                className="px-4 py-1.5 text-sm rounded-md bg-white text-red-700 font-medium hover:bg-red-100 transition shadow"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);


}
