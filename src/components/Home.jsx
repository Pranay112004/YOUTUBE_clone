import React, { useState } from "react";
import Navbar from "./Navbar"; // Assuming you have this
import VideoGrid from "./VideoGrid";
import Sidebar from "./Sidebar"; // Import the new simplified Sidebar

function Home() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden lg:block w-64 h-[calc(100vh-5rem)] top-20 sticky">
          <Sidebar />
        </div>

        {/* MOBILE SIDEBAR (MODAL) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
            {/* Menu Content */}
            <div className="relative w-64 h-full bg-gray-900 shadow-xl">
              <Sidebar />
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <VideoGrid />
        </main>
      </div>
    </div>
  );
}

export default Home;
