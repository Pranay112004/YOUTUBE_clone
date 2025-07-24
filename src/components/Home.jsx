import React from "react";
import VideoGrid from "./VideoGrid";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar: Enhanced with backdrop blur and modern styling */}
      <div className="hidden lg:block fixed top-0 left-0 w-72 h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/60 shadow-2xl shadow-black/30 z-30">
        <div className="pt-20 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 transition-colors">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <div className="lg:hidden fixed inset-0 z-40 pointer-events-none">
        {/* This will be controlled by mobile menu state in a real implementation */}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 transition-all duration-300 ease-in-out">
        {/* Header spacer with gradient */}
        <div className="h-20 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800"></div>

        {/* Content container with enhanced styling */}
        <div className="relative min-h-[calc(100vh-5rem)]">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-purple-950/10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-900/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-900/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          {/* Main content */}
          <div className="relative z-10 p-6 lg:p-8">
            {/* Enhanced container with subtle shadow */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/50 border border-gray-700/60 p-6 lg:p-8">
              <VideoGrid />
            </div>
          </div>
        </div>
      </main>

      {/* Floating elements for modern touch */}
      <div className="fixed bottom-8 right-8 z-50 lg:hidden">
        {/* Mobile menu button placeholder - would be controlled by state */}
        <button className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-2xl shadow-red-500/30 flex items-center justify-center hover:scale-110 transition-transform duration-200 hover:shadow-red-500/40">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Ambient lighting effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-red-900/10 via-purple-900/5 to-transparent blur-3xl"></div>
      </div>
    </div>
  );
}

export default Home;
