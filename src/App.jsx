import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import VideoGrid from "./components/VideoGrid";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex mt-16">
        <Sidebar className="lg:block hidden" />
        <main className="ml-0 lg:ml-64 p-4 w-full">
          <VideoGrid />
        </main>
      </div>
    </div>
  );
}

export default App;
