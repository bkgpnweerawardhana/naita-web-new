import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'react-feather';
import logo from '../../assets/images/logos/Naita-Text-logo.png' // Adjust the path as necessary

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About Us' },
    { path: '/courses', name: 'Courses' },
    { path: '/institutions', name: 'Institutions' },
    { path: '/news', name: 'News' },
    { path: '/downloads', name: 'Downloads' },
    { path: '/contact', name: 'Contact' },
  ];

  return (
    <div className='inset-0 bg-gradient-to-r from-gray-100/60 via-gray-50/30 to-transparent'>
    <nav className="container mx-auto px-4 py-3 flex items-center justify-between relative">
      {/* Logo */}
      {/*  */}
      <div className=' w-24   | lg:w-36  lg:-ml-10  lg:h-auto flex flex-row'>
        <img src={logo} alt="NAITA Logo" className="-mb-10 -mt-12  " />
      </div>

      {/* Hamburger Icon - Mobile Only */}
      <button
        className="lg:hidden text-naita-red focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation Links - Desktop */}
      <div className="hidden lg:flex space-x-10">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-lg font-medium ${
              location.pathname === link.path ? 'text-naita-red' : 'text-gray-600'
            } hover:text-red-800 transition font-semibold  hover:-translate-y-[2px]`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Search Bar - Desktop */}
     <div className="hidden lg:block relative w-[220px] xl:w-[300px]">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-[30px] xl:h-[38px] pl-4 pr-[130px] border border-gray-300 rounded-[30px] focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-800 text-white w-[90px] xl:w-[100px] h-[26px] xl:h-[32px] rounded-[30px] flex items-center justify-center">
          <Search className="mr-2" size={18} />
          Search
        </button>
      </div>   
 
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white border-t border-gray-200 shadow-md lg:hidden z-50">
          <div className="flex flex-col space-y-4 py-4 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium ${
                  location.pathname === link.path ? 'text-naita-red' : 'text-[#636262]'
                } hover:text-naita-red transition`}
              >
                {link.name}
              </Link>
            ))}

            {/* Optional: Mobile Search */}
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-[40px] pl-4 pr-[110px] border border-gray-300 rounded-[30px] focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-800 text-white w-[100px] h-[36px] rounded-[30px] flex items-center justify-center text-sm">
                <Search className="mr-1" size={16} />
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
    </div>
  );
}
