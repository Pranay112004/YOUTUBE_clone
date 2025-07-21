import React from "react";
import VideoCard from "./VideoCard";
import { useAuth } from "../context/AuthProvider";

function VideoGrid() {
  const { loading, data } = useAuth();

  // Fallback sample data if API data is not available
  const fallbackVideos = [
    {
      title: "Sample Video 1",
      channel: "Channel A",
      views: "1M",
      thumbnail: "https://via.placeholder.com/320x180",
      id: "sample1",
    },
    {
      title: "Sample Video 2",
      channel: "Channel B",
      views: "500K",
      thumbnail: "https://via.placeholder.com/320x180",
      id: "sample2",
    },
    {
      title: "Sample Video 3",
      channel: "Channel C",
      views: "750K",
      thumbnail: "https://via.placeholder.com/320x180",
      id: "sample3",
    },
  ];

  // Loading skeleton component
  const VideoSkeleton = ({ delay = 0 }) => (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-full aspect-video bg-gray-200"></div>
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="flex space-x-3">
          <div className="w-8 h-8 sm:w-9 h-9 rounded-full bg-gray-200 flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6">
        {Array.from({ length: 12 }, (_, i) => (
          <VideoSkeleton key={i} delay={i * 100} />
        ))}
      </div>
    );
  }

  const videos = data && data.length > 0 ? data : fallbackVideos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 sticky top-[64px] sm:top-[68px] bg-gradient-to-br from-gray-50 to-gray-100 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Recommended for you
          </h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Latest
            </button>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Popular
            </button>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Trending
            </button>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 px-4 sm:px-6 pb-8">
        {videos.map((video, index) => {
          // Handle different video data structures
          let videoData = {
            id: `video-${index}`,
            title: "Unknown Title",
            channel: "Unknown Channel",
            views: "N/A",
            thumbnail:
              "https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=Video+Thumbnail",
            duration: "5:32",
          };

          // Handle API data structure (from RapidAPI YouTube API)
          if (video.type === "video" && video.video) {
            const v = video.video;
            videoData = {
              id: v.videoId || `video-${index}`,
              title: v.title || "Unknown Title",
              channel: v.author?.title || "Unknown Channel",
              views: v.stats?.views
                ? `${Math.floor(v.stats.views / 1000)}K`
                : "N/A",
              thumbnail:
                v.thumbnails?.[0]?.url ||
                v.thumbnails?.[1]?.url ||
                "https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=Video+Thumbnail",
              duration: v.length?.simpleText || "5:32",
            };
          }
          // Handle fallback sample data structure
          else if (video.title && video.channel) {
            videoData = {
              id: video.id || `video-${index}`,
              title: video.title,
              channel: video.channel,
              views: video.views || "N/A",
              thumbnail:
                video.thumbnail ||
                "https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=Video+Thumbnail",
              duration: video.duration || "5:32",
            };
          }

          return (
            <div
              key={videoData.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <VideoCard
                title={videoData.title}
                channel={videoData.channel}
                views={videoData.views}
                thumbnail={videoData.thumbnail}
                videoId={videoData.id}
                duration={videoData.duration}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VideoGrid;
