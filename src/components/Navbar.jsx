import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { setValue } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setValue(searchQuery);
      navigate("/");
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 h-14">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6 text-gray-800"
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

          {/* YouTube Logo */}
          <Link to="/" className="flex items-center space-x-1">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-red-600 fill-current"
            >
              <path d="M10 15l5.19-3L10 9v6zm12-3c0-1.2 0-2.4-.1-3.6a3.9 3.9 0 0 0-.6-2.1 3.6 3.6 0 0 0-2.1-.6C17.4 5.4 12 5.4 12 5.4s-5.4 0-7.2.3a3.6 3.6 0 0 0-2.1.6 3.9 3.9 0 0 0-.6 2.1c-.1 1.2-.1 2.4-.1 3.6s0 2.4.1 3.6a3.9 3.9 0 0 0 .6 2.1 3.6 3.6 0 0 0 2.1.6c1.8.3 7.2.3 7.2.3s5.4 0 7.2-.3a3.6 3.6 0 0 0 2.1-.6 3.9 3.9 0 0 0 .6-2.1c.1-1.2.1-2.4.1-3.6z" />
            </svg>
            <span className="text-xl font-semibold text-gray-900 tracking-tight hidden sm:block">
              YouTube
            </span>
          </Link>
        </div>

        {/* Middle Section - Search */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-xl mx-4">
          <div className="flex flex-1 border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-blue-500 bg-white">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 px-4 py-1.5 text-sm outline-none"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Upload Button */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.5-1.5M9 11H5l1.5 1.5M12 4v16"
              />
            </svg>
          </button>

          {/* Profile Avatar */}
          <img
            src="src/assets/IMG_3301.jpg"
            alt="User"
            className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-500"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
