import React from "react";
import Sidebar from "./Sidebar";
import VideoGrid from "./VideoGrid";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="flex">
        <Sidebar className="lg:block hidden" />
        <main className="ml-0 lg:ml-64 p-4 w-full">
          <VideoGrid />
        </main>
      </div>
    </div>
  );
}

export default Home;
