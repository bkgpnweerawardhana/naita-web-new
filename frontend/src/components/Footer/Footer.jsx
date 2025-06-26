import { MapPin, Phone, Mail } from 'react-feather';
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import logo from '../../assets/images/logos/Naita-Text-logo.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Footer() {

  const navigate = useNavigate();

  const handleViewCourses = () => {
    navigate('/courses');
  };

  return (
    <footer className="relative bg-white text-[#303030] w-full">
      {/* Red top border */}
      <div className="w-full h-2 bg-[#87212E]"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-12 lg:flex lg:flex-row lg:gap-x-10">
        {/* Column 1 - Logo & Description */}
        <div className="mb-8 flex flex-col items-center lg:items-start lg:max-w-[380px]">
          
          <div className="flex flex-row items-center gap-x-1 -mt-10 -mb-10">
            <img 
              src= {logo}
              alt="NAITA Logo" 
              className="w-34 h-34 object-contain"
            />
          </div>
          
          {/* Title */}
          <h2 className="font-semibold text-2xl text-center lg:font-bold lg:text-gray-700 lg:text-2xl lg:text-start">
            National Apprentice and Industrial Training Authority
          </h2>
          
          {/* Description */}
          <p className="text-sm max-w-full mt-1 mb-6 text-center text-gray-600 lg:text-base lg:text-justify">
            Shape the future with us. Our training center equips you with cutting-edge skills and knowledge for a smarter, stronger tomorrow.
          </p>
          
          {/* Courses Button */}
          <button
           onClick={handleViewCourses}
           className="bg-red-800 px-6 py-3 rounded-full text-white animate-bounce hover:bg-[#991b1b] transition lg:rounded-md">
            View Courses →
          </button>
        </div>

        {/* Columns 2-4 Container */}
        <div className="grid grid-cols-2 gap-6 mr-0 lg:grid-cols-3 lg:mt-14 lg:gap-10">
          {/* Column 2 - Navigation */}
          <div className="mb-6  ">
            <div className="flex flex-row gap-x-1 text-base font-bold text-gray-900 lg:text-xl">
              <span>Navigate</span>
              <div className="flex flex-row gap-x-1 items-center">
                <div className="bg-[#87212E] w-7 h-[3px]"></div>
                <div className="bg-[#87212E] w-2 h-2 rounded-full"></div>
              </div>
            </div>
            <nav className="flex flex-col gap-2 mt-4 text-sm text-gray-600 lg:text-base">
              {['Home', 'Courses', 'News', 'About Us', 'Contact Info'].map((item) => (
                <Link 
                  key={item}
                  to={ `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-[#87212E] hover:underline transition"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

            {/* Column 4 - Community */}
          <div className="mb-6  lg:-ml-20">
            <div className="flex flex-row gap-x-1 text-base font-bold text-gray-900 lg:text-xl">
              <span>Community</span>
              <div className="flex flex-row gap-x-1 items-center">
                <div className="bg-[#87212E] w-7 h-[3px]"></div>
                <div className="bg-[#87212E] w-2 h-2 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 text-sm text-gray-600 lg:text-base">
              {['Board of Management','National Institutions', 'District Offices'].map((item) => (
                <Link 
                  key={item}
                  to={item === 'District Offices' ? "/institutions#district-offices-section" : item ==='National Institutions' ? "/institutions#national-institutes-section" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  // href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-[#87212E] hover:underline transition"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 - Official Info */}
          <div className="mb-6 col-span-2 lg:col-span-1 lg:-ml-28 ">
            <div className="flex flex-row gap-x-1 text-base font-bold text-gray-900 lg:text-xl">
              <span>Official Info</span>
              <div className="flex flex-row gap-x-1 items-center">
                <div className="bg-[#87212E] w-7 h-[3px]"></div>
                <div className="bg-[#87212E] w-2 h-2 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4 text-sm text-gray-600 lg:text-base">
              <div className="flex items-start gap-x-2">
                <div className="bg-red-100 rounded-sm min-w-7 h-7 flex items-center justify-center mt-1">
                  <MapPin className="text-[#87212E] w-4 h-4" />
                </div>
                <p className="whitespace-pre-line  ">
                  No. 971, Sri Jayewardenepura Mawatha,
                  Welikada, Rajagiriya, Sri Lanka.
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="bg-red-100 rounded-sm w-7 h-7 flex items-center justify-center">
                  <Phone className="text-[#87212E] w-4 h-4" />
                </div>
                <p>0112-888-782/5</p>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="bg-red-100 rounded-sm w-7 h-7 flex items-center justify-center">
                  <Mail className="text-[#87212E] w-4 h-4" />
                </div>
                <p>Naita@gov.lk</p>
              </div>
            </div>
          </div>

        
        </div>

        {/* Social Media Icons */}
        <div className="absolute bottom-20 right-4 flex flex-row gap-x-3 z-10 lg:bottom-24">
          <a href="https://facebook.com" className="text-[#87212E] hover:text-[#991b1b] hover:-translate-y-1 transition">
            <FaFacebook size={24} />
          </a>
          <a href="https://linkedin.com" className="text-[#87212E] hover:text-[#991b1b] hover:-translate-y-1 transition">
            <FaLinkedin size={24} />
          </a>
          <a href="https://youtube.com" className="text-[#87212E] hover:text-[#991b1b] hover:-translate-y-1 transition">
            <FaYoutube size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full h-20 bg-gradient-to-r from-red-800 to-red-900 flex items-center justify-center">
        <p className="text-white/75 text-xs text-center lg:text-sm">
          Copyright © 2025 NAITA THRIVE All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}