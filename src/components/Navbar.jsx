import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setValue } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setValue(searchQuery);
      navigate("/"); // Navigate to home page with search results
    }
  };

  return (
    <nav className="flex items-center justify-between p-3 bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      {/* Logo and Menu */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600" aria-label="Menu">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link to="/" className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className="h-6"
          />
        </Link>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-1 max-w-xl mx-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search videos..."
          className="w-full px-4 py-1 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 transition-colors"
          aria-label="Search"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

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
