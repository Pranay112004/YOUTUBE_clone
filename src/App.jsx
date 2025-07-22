import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-youtube-dark flex flex-col">
        <Navbar />
        {/* Add top margin to prevent content overlap */}
        <div className="flex-1 overflow-y-auto mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:videoId" element={<VideoPlayer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
