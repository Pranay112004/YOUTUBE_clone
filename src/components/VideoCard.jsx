import React, { useState } from "react";
import { Link } from "react-router-dom";

function VideoCard({ title, channel, views, thumbnail, videoId }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/watch/${videoId}`} 
      className="group block transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100">
        {/* Thumbnail Section */}
        <div className="relative overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          )}
          
          <img
            src={thumbnail}
            alt={title}
            className={`w-full h-48 object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=Video+Thumbnail";
              setImageLoaded(true);
            }}
          />
          
          {/* Play button overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'bg-black/30' : 'bg-black/0'
          }`}>
            <div className={`transform transition-all duration-300 ${
              isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}>
              <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-2xl">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Duration badge (if available) */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            5:32
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 space-y-3">
          <div className="flex space-x-3">
            {/* Channel Avatar */}
            <div className="flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {channel?.charAt(0)?.toUpperCase() || 'C'}
                </span>
              </div>
            </div>
            
            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-sm mb-1 line-clamp-2 transition-colors duration-200 ${
                isHovered ? 'text-red-600' : 'text-gray-900'
              }`}>
                {title}
              </h3>
              
              <div className="space-y-1">
                <p className="text-gray-600 text-xs hover:text-gray-800 transition-colors cursor-pointer">
                  {channel}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>{views} views</span>
                  <span>•</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons (appears on hover) */}
          <div className={`flex items-center justify-between pt-2 border-t border-gray-100 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span className="text-xs">Like</span>
              </button>
              
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-xs">Share</span>
              </button>
            </div>
            
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
