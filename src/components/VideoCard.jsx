import React, { useState } from "react";

function VideoCard({
  title,
  channel,
  views,
  thumbnail,
  videoId,
  duration = "Unknown",
  publishedAt,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format timestamp exactly like YouTube
  const formatTimestamp = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    if (diffInWeeks < 4)
      return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
    if (diffInMonths < 12)
      return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
    return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
  };

  // Format views exactly like YouTube
  const formatViews = (viewCount) => {
    if (!viewCount) return "No views";
    const numStr = viewCount.toString().replace(/[^0-9]/g, "");
    const num = parseInt(numStr);
    if (isNaN(num)) return "No views";

    if (num === 1) return "1 view";
    if (num < 1000) return `${num.toLocaleString()} views`;
    if (num < 1000000) {
      const k = Math.floor(num / 1000);
      const remainder = num % 1000;
      if (remainder === 0) return `${k}K views`;
      return `${k}.${Math.floor(remainder / 100)}K views`;
    }
    if (num < 1000000000) {
      const m = Math.floor(num / 1000000);
      const remainder = num % 1000000;
      if (remainder === 0) return `${m}M views`;
      return `${m}.${Math.floor(remainder / 100000)}M views`;
    }
    const b = Math.floor(num / 1000000000);
    return `${b}B views`;
  };

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => console.log(`Navigate to /watch/${videoId}`)}
    >
      {/* Thumbnail Container */}
      <div className="relative mb-3">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
          {!imageLoaded && (
            <div className="w-full h-full bg-gray-800 animate-pulse"></div>
          )}

          <img
            src={thumbnail}
            alt=""
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "https://i.ytimg.com/vi/placeholder/hqdefault.jpg";
              setImageLoaded(true);
            }}
          />

          {/* Duration */}
          {duration && duration !== "Unknown" && (
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded font-medium">
              {duration}
            </div>
          )}

          {/* Hover overlay - YouTube style */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-20">
              <div className="absolute bottom-2 left-2 right-2">
                <div className="bg-black bg-opacity-80 rounded px-2 py-1">
                  <div className="flex items-center justify-between text-white text-xs">
                    <span>Watch later</span>
                    <div className="flex space-x-2">
                      <button className="hover:bg-white hover:bg-opacity-20 p-1 rounded">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.83 16.17L12 13.34V7h2v5.17l2.83 2.83-1.42 1.42z" />
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        </svg>
                      </button>
                      <button className="hover:bg-white hover:bg-opacity-20 p-1 rounded">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14 7l-5 5 5 5V7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex space-x-3">
        {/* Channel Avatar */}
        <div className="flex-shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {channel?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </div>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-white font-medium text-sm leading-5 mb-1 line-clamp-2 pr-6">
            {title}
          </h3>

          {/* Channel name */}
          <div className="text-gray-400 text-sm mb-1 hover:text-white cursor-pointer">
            {channel}
          </div>

          {/* Views and time */}
          <div className="text-gray-400 text-sm">
            {formatViews(views)} • {formatTimestamp(publishedAt)}
          </div>
        </div>

        {/* Three dots menu */}
        <div className="flex-shrink-0">
          <button
            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Open menu");
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
