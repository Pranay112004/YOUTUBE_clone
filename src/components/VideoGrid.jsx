import React from "react";
import VideoCard from "./VideoCard";
import { useAuth } from "../context/AuthProvider";

function VideoGrid() {
  const { loading, data, error, fetchAllData, value, setValue, limit } =
    useAuth();
  const MAX_VIDEOS = 8; // Cap at 8 videos (adjust to 7 if preferred)

  // Fallback sample data if API data is not available
  const fallbackVideos = [
    {
      title: "Sample Video 1",
      channel: "Channel A",
      views: "1M",
      thumbnail: "https://via.placeholder.com/320x180",
      id: "sample1",
      duration: "5:32",
      publishedAt: "", // Added for consistency
    },
    {
      title: "Sample Video 2",
      channel: "Channel B",
      views: "500K",
      thumbnail: "https://via.placeholder.com/320x180",
      id: "sample2",
      duration: "5:32",
      publishedAt: "",
    },
    {
      title: "Sample Video 3",
      channel: "Channel C",
      views: "750K",
      thumbnail: "https://via.placeholder.com/320x180",
      id: "sample3",
      duration: "5:32",
      publishedAt: "",
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

  // Handle button clicks for sorting/filtering
  const handleFilter = (filter) => {
    setValue(filter); // Updates query in AuthProvider
  };

  // Handle "Load More" button
  const handleLoadMore = () => {
    fetchAllData(value, true); // Append more data
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6">
        {Array.from({ length: Math.min(limit, MAX_VIDEOS) }, (_, i) => (
          <VideoSkeleton key={i} delay={i * 100} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            onClick={() => fetchAllData(value, false)}
            aria-label="Retry loading videos"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const videos = (data && data.length > 0 ? data : fallbackVideos).slice(
    0,
    MAX_VIDEOS
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 sticky top-[64px] sm:top-[68px] bg-gradient-to-br from-gray-50 to-gray-100 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Recommended for you
          </h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                value === "Latest"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleFilter("Latest")}
              aria-label="Filter by latest videos"
            >
              Latest
            </button>
            <button
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                value === "Popular"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleFilter("Popular")}
              aria-label="Filter by popular videos"
            >
              Popular
            </button>
            <button
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                value === "Trending"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleFilter("Trending")}
              aria-label="Filter by trending videos"
            >
              Trending
            </button>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 px-4 sm:px-6 pb-8">
        {videos.map((video, index) => {
          let videoData = {
            id: `video-${index}`,
            title: "Unknown Title",
            channel: "Unknown Channel",
            views: "N/A",
            thumbnail:
              "https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=Video+Thumbnail",
            duration: "Unknown",
            publishedAt: "", // Added for consistency
          };

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
              duration: v.length?.simpleText || "Unknown",
              publishedAt: v.publishedAt || "",
            };
          } else if (video.title && video.channel) {
            videoData = {
              id: video.id || `video-${index}`,
              title: video.title,
              channel: video.channel,
              views: video.views || "N/A",
              thumbnail:
                video.thumbnail ||
                "https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=Video+Thumbnail",
              duration: video.duration || "Unknown",
              publishedAt: video.publishedAt || "",
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
                publishedAt={videoData.publishedAt} // Pass to VideoCard
              />
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {data.length > 0 && videos.length < MAX_VIDEOS && (
        <div className="flex justify-center pb-6">
          <button
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400"
            onClick={handleLoadMore}
            disabled={loading || data.length >= MAX_VIDEOS}
            aria-label={`Load more videos (currently ${data.length} of ${MAX_VIDEOS})`}
          >
            {loading
              ? "Loading..."
              : `Load More (${data.length} of ${MAX_VIDEOS} videos)`}
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoGrid;
