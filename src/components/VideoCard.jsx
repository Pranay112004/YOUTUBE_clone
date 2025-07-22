import React, { useState } from "react";
import { Link } from "react-router-dom";

function VideoCard({
  title,
  channel,
  views,
  thumbnail,
  videoId,
  duration = "Unknown",
  publishedAt, // New prop for dynamic timestamp
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format timestamp (e.g., "2 days ago")
  const formatTimestamp = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  return (
    <Link
      to={`/watch/${videoId}`}
      className="group block transform transition-all duration-300 hover:scale-[1.03] focus:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Watch ${title} by ${channel}`}
    >
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col">
        {/* Thumbnail Section */}
        <div className="relative overflow-hidden aspect-video">
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          )}

          <img
            src={thumbnail}
            alt={`Thumbnail for ${title}`}
            loading="lazy" // Optimize image loading
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=Video+Thumbnail";
              setImageLoaded(true);
            }}
          />

          {/* Play button overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 touch-none ${
              isHovered ? "bg-black/40" : "bg-black/0"
            }`}
          >
            <div
              className={`transform transition-all duration-300 ${
                isHovered ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              <div className="bg-red-600 hover:bg-red-700 rounded-full p-3 sm:p-4 shadow-xl">
                <svg
                  className="w-5 h-5 sm:w-6 h-6 text-white ml-0.5 sm:ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs sm:text-sm px-2 py-1 rounded-md backdrop-blur-sm">
            {duration}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-1">
          <div className="flex space-x-3">
            {/* Channel Avatar */}
            <div className="flex-shrink-0">
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
                role="img"
                aria-label={`Avatar for ${channel}`}
              >
                <span className="text-white font-semibold text-xs">
                  {channel?.charAt(0)?.toUpperCase() || "C"}
                </span>
              </div>
            </div>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-sm sm:text-base mb-1 line-clamp-2 transition-colors duration-200 ${
                  isHovered ? "text-red-600" : "text-gray-900"
                }`}
              >
                {title}
              </h3>

              <div className="space-y-1">
                <p
                  className="text-gray-600 text-xs sm:text-sm hover:text-gray-800 transition-colors cursor-pointer truncate"
                  title={channel}
                >
                  {channel}
                </p>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <span>{views} views</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{formatTimestamp(publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex items-center justify-between pt-2 border-t border-gray-100 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 sm:opacity-100 sm:translate-y-0"
            }`}
          >
            <div className="flex space-x-3 sm:space-x-4">
              <button
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Like video"
                onClick={(e) => {
                  e.preventDefault(); // Prevent Link navigation
                  console.log(`Like video: ${videoId}`);
                }}
              >
                <svg
                  className="w-4 h-4 sm:w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span className="text-xs sm:text-sm">Like</span>
              </button>

              <button
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Share video"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`Share video: ${videoId}`);
                }}
              >
                <svg
                  className="w-4 h-4 sm:w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                <span className="text-xs sm:text-sm">Share</span>
              </button>
            </div>

            <button
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Save video"
              onClick={(e) => {
                e.preventDefault();
                console.log(`Save video: ${videoId}`);
              }}
            >
              <svg
                className="w-4 h-4 sm:w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
