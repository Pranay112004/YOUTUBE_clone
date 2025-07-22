import React from "react";
import VideoGrid from "./VideoGrid";
import Sidebar from "./Sidebar"; // Ensure Sidebar is imported

function Home() {
  return (
    <div className="flex min-h-screen pt-16 bg-gray-100">
      {/* Sidebar: hidden on small screens, visible on large */}
      <div className="hidden lg:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="ml-0 lg:ml-64 w-full p-4">
        <VideoGrid />
      </main>
    </div>
  );
}

export default Home;
