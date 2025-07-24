import React, { useState, useEffect } from "react";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Navigate to search results
    }
  };

  return (
    <>
      {/* Backdrop blur overlay when scrolled */}
      <div
        className={`fixed top-0 w-full h-20 z-40 transition-all duration-500 ${
          isScrolled ? "backdrop-blur-xl bg-black/80" : "bg-black/95"
        }`}
      ></div>

      <nav className="fixed top-0 w-full z-50 transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-3 h-20">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            {/* Hamburger Menu */}
            <button className="p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group">
              <svg
                className="w-6 h-6 text-white group-hover:text-red-400 transition-colors"
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
            <a href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                {/* Glowing effect behind logo */}
                <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-xl group-hover:bg-red-500/30 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-r from-red-600 to-red-500 p-2 rounded-xl group-hover:from-red-500 group-hover:to-red-400 transition-all duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                YouTube
              </span>
            </a>
          </div>

          {/* Middle Section - Enhanced Search */}
          <div onSubmit={handleSearch} className="flex flex-1 max-w-2xl mx-8">
            <div
              className={`flex flex-1 transition-all duration-300 ${
                isSearchFocused
                  ? "bg-gray-800/80 backdrop-blur-xl border-red-500/50 shadow-lg shadow-red-500/20"
                  : "bg-gray-900/60 backdrop-blur-sm border-gray-700/60 hover:border-gray-600/80"
              } border rounded-full overflow-hidden`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search videos, channels, playlists..."
                className="flex-1 px-6 py-3 text-white placeholder-gray-400 bg-transparent outline-none text-base"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gray-800/80 hover:bg-red-600/80 border-l border-gray-700/60 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
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

            {/* Voice Search */}
            <button className="ml-4 p-3 bg-gray-900/60 backdrop-blur-sm border border-gray-700/60 rounded-full hover:bg-gray-800/80 hover:border-gray-600/80 transition-all duration-300 group">
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Create Button */}
            <button className="p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="w-6 h-6 text-white group-hover:text-red-400 transition-colors relative z-10"
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
            <button className="p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors relative z-10"
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
              {/* Notification badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-semibold">3</span>
              </div>
            </button>

            {/* Profile Avatar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-0.5"></div>
              <img
                src="src/assets/IMG_3301.jpg"
                alt="User"
                className="w-10 h-10 rounded-full object-cover cursor-pointer transition-all duration-300 group-hover:scale-105 relative z-10"
              />
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black z-20"></div>
            </div>
          </div>
        </div>

        {/* Subtle gradient line at bottom */}
        <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
      </nav>
    </>
  );
}

export default Navbar;
