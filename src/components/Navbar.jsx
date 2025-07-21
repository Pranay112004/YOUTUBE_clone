import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { setValue } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setValue(searchQuery);
      navigate("/");
    }
  };

  return (
    <nav className={`flex items-center justify-between px-4 py-3 bg-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg backdrop-blur-md bg-white/95' : 'shadow-md'
    }`}>
      {/* Logo and Menu */}
      <div className="flex items-center space-x-4 min-w-0">
        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900" 
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <Link to="/" className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <span className="font-bold text-xl text-gray-900 hidden sm:block">YouTube</span>
        </Link>
      </div>

      {/* Enhanced Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <form onSubmit={handleSearch} className="relative">
          <div className={`flex items-center rounded-full border-2 transition-all duration-200 bg-white ${
            isFocused ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search videos, channels, and more..."
              className="flex-1 px-5 py-3 rounded-l-full focus:outline-none text-gray-900 placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-r-full border-l border-gray-200 transition-all duration-200 group"
              aria-label="Search"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          {/* Search suggestions could go here */}
          {isFocused && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-3 text-sm text-gray-600 border-b">
                Press Enter to search for "<span className="font-medium text-gray-900">{searchQuery}</span>"
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        {/* Create */}
        <button className="text-gray-600" aria-label="Create">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* Notifications */}
        <button className="text-gray-600" aria-label="Notifications">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.5-1.5M9 11H5l1.5 1.5M12 4v16"
            />
          </svg>
        </button>

        {/* Profile */}
        <button
          className="w-8 h-8 bg-gray-200 rounded-full"
          aria-label="Profile"
        >
          <span className="sr-only">User Profile</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
