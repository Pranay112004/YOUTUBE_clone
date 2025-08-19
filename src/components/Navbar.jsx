import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

function Navbar({ onMenuClick }) {
  const { setValue } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Effect to detect page scroll for styling the navbar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to prevent body scroll when mobile search is open
  useEffect(() => {
    if (isMobileSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setValue(searchQuery.trim()); // Update the search query in AuthProvider
      setMobileSearchOpen(false); // Close mobile search after submission
      setSearchQuery(""); // Clear the input after search
    }
  };

  return (
    <>
      {/* ======================================= */}
      {/* ==     MOBILE SEARCH OVERLAY         == */}
      {/* ======================================= */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-black z-[100] lg:hidden">
          <div className="flex items-center h-20 px-4 border-b border-gray-800">
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setMobileSearchOpen(false)}
              className="p-2 text-gray-300 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <form onSubmit={handleSearch} className="flex-1 ml-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* ==       MAIN NAVBAR CONTAINER       == */}
      {/* ======================================= */}
      <nav
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/60"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 h-20">
          {/* == Left Section: Logo & Menu Button == */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              type="button"
              aria-label="Open menu"
              onClick={onMenuClick}
              className="p-2 rounded-full hover:bg-white/10 transition-colors lg:hidden"
            >
              <svg
                className="w-6 h-6 text-white"
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

            <a href="/" className="flex items-center space-x-2">
              <div className="bg-red-600 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <span className="hidden sm:inline text-xl font-bold text-white">
                MyTube
              </span>
            </a>
          </div>

          {/* == Middle Section: Desktop Search Bar == */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex flex-1">
              <div
                className={`flex flex-1 transition-all duration-300 ${
                  isSearchFocused
                    ? "bg-gray-800 border-red-500"
                    : "bg-gray-900/80 border-gray-700"
                } border rounded-full overflow-hidden`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search"
                  className="flex-1 px-5 py-2 text-white placeholder-gray-400 bg-transparent outline-none"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="px-5 bg-gray-800 hover:bg-red-600 border-l border-gray-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-300"
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
          </div>

          {/* == Right Section: Mobile Search & All Icons == */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setMobileSearchOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors lg:hidden"
            >
              <svg
                className="w-6 h-6 text-white"
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

            <div className="hidden lg:flex items-center space-x-4">
              <button
                type="button"
                aria-label="Create content"
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-white"
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
              <button
                type="button"
                aria-label="View notifications"
                className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.407-1.407A8.001 8.001 0 04 9v3a3 3 0 11-6 0v-3a8.001 8.001 0 0115.593 6.593L22 17h-5zM12 22a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                  />
                </svg>
                <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  3
                </div>
              </button>
            </div>

            <button
              type="button"
              aria-label="View profile"
              className="flex-shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-medium text-sm">U</span>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
