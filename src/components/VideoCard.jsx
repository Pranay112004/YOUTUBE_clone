import React from "react";
import { Link } from "react-router-dom";

function VideoCard({ title, channel, views, thumbnail, videoId }) {
  return (
    <Link 
      to={`/watch/${videoId}`} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer block"
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/320x180?text=Video+Thumbnail";
          }}
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all">
          <div className="bg-black bg-opacity-70 rounded-full p-3 opacity-0 hover:opacity-100 transition-opacity">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-900 hover:text-blue-600">
          {title}
        </h3>
        <p className="text-gray-600 text-xs mb-1">{channel}</p>
        <p className="text-gray-500 text-xs">{views} views</p>
      </div>
    </Link>
  );
}

export default VideoCard;
