import React from "react";
import VideoCard from "./VideoCard";
import { useAuth } from "../context/AuthProvider";

function VideoGrid() {
  // Use real data from AuthProvider instead of mock data
  const { loading, data, error, value, setValue } = useAuth();

  const MAX_VIDEOS = 24; // YouTube typically shows many videos

  // Fallback sample data that matches YouTube's actual video data structure
  const fallbackVideos = [
    {
      title: "Building a Modern React App with TypeScript | Complete Tutorial",
      channel: "Tech Tutorials",
      views: "1,247,832",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      id: "sample1",
      duration: "15:32",
      publishedAt: "2024-01-15T10:30:00Z",
    },
    {
      title: "CSS Grid vs Flexbox - When to Use Each",
      channel: "WebDev Mastery",
      views: "892,145",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      id: "sample2",
      duration: "12:45",
      publishedAt: "2024-01-12T14:20:00Z",
    },
    {
      title: "JavaScript ES2024 New Features You Need to Know",
      channel: "JS Academy",
      views: "2,156,890",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      id: "sample3",
      duration: "18:24",
      publishedAt: "2024-01-10T09:15:00Z",
    },
    {
      title: "Python for Beginners - Complete Course",
      channel: "Code Master",
      views: "5,678,923",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      id: "sample4",
      duration: "2:45:12",
      publishedAt: "2024-01-08T16:45:00Z",
    },
    {
      title: "Docker Tutorial for DevOps Engineers",
      channel: "DevOps Pro",
      views: "743,256",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      id: "sample5",
      duration: "28:17",
      publishedAt: "2024-01-05T11:30:00Z",
    },
    {
      title: "Next.js 14 App Router - Everything You Need to Know",
      channel: "React Central",
      views: "1,834,567",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      id: "sample6",
      duration: "32:08",
      publishedAt: "2024-01-03T13:22:00Z",
    },
    {
      title: "Machine Learning Fundamentals in 30 Minutes",
      channel: "AI Explained",
      views: "3,245,891",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      id: "sample7",
      duration: "29:56",
      publishedAt: "2024-01-01T08:00:00Z",
    },
    {
      title: "Database Design Best Practices",
      channel: "Data Science Hub",
      views: "567,234",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      id: "sample8",
      duration: "22:41",
      publishedAt: "2023-12-28T15:30:00Z",
    },
  ];

  // YouTube-style loading skeleton
  const VideoSkeleton = () => (
    <div className="animate-pulse">
      <div className="aspect-video bg-gray-800 rounded-xl mb-3"></div>
      <div className="flex space-x-3">
        <div className="w-9 h-9 bg-gray-800 rounded-full flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-800 rounded w-4/5"></div>
          <div className="h-3 bg-gray-800 rounded w-2/3"></div>
          <div className="h-3 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  // YouTube-style filter chips
  const filterOptions = [
    "All",
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Learning",
    "Fashion",
    "Podcasts",
    "Movies",
    "Live",
  ];

  const handleFilter = (filter) => {
    setValue(filter);
  };

  const videos = data.length > 0 ? data : fallbackVideos;

  if (loading) {
    return (
      <div className="p-6 max-w-[2000px] mx-auto">
        {/* Filter chips skeleton */}
        <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-8 bg-gray-800 rounded-full w-16 flex-shrink-0 animate-pulse"
            ></div>
          ))}
        </div>

        {/* Video grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-10">
          {Array.from({ length: 12 }, (_, i) => (
            <VideoSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-white text-xl font-medium mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-colors font-medium"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[2000px] mx-auto">
      {/* YouTube-style filter chips */}
      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-none">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              value === filter
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            onClick={() => handleFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Video Grid - YouTube layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 gap-y-10">
        {videos.map((video, index) => {
          // Handle different data structures
          let videoData = {
            id: `video-${index}`,
            title: "Unknown Title",
            channel: "Unknown Channel",
            views: "No views",
            thumbnail: "https://i.ytimg.com/vi/placeholder/hqdefault.jpg",
            duration: "0:00",
            publishedAt: new Date().toISOString(),
          };

          // If it's API data with nested structure
          if (video.type === "video" && video.video) {
            const v = video.video;
            videoData = {
              id: v.videoId || `video-${index}`,
              title: v.title || "Unknown Title",
              channel: v.author?.title || "Unknown Channel",
              views: v.stats?.views ? v.stats.views.toString() : "No views",
              thumbnail:
                v.thumbnails?.[0]?.url ||
                v.thumbnails?.[1]?.url ||
                videoData.thumbnail,
              duration: v.length?.simpleText || "0:00",
              publishedAt: v.publishedAt || new Date().toISOString(),
            };
          }
          // If it's simple object structure (fallback data)
          else if (video.title && video.channel) {
            videoData = {
              id: video.id || `video-${index}`,
              title: video.title,
              channel: video.channel,
              views: video.views || "No views",
              thumbnail: video.thumbnail || videoData.thumbnail,
              duration: video.duration || "0:00",
              publishedAt: video.publishedAt || new Date().toISOString(),
            };
          }

          return (
            <VideoCard
              key={videoData.id}
              title={videoData.title}
              channel={videoData.channel}
              views={videoData.views}
              thumbnail={videoData.thumbnail}
              videoId={videoData.id}
              duration={videoData.duration}
              publishedAt={videoData.publishedAt}
            />
          );
        })}
      </div>

      {/* YouTube-style "Show more" text - appears after scrolling */}
      {videos.length >= 12 && (
        <div className="text-center mt-12">
          <div className="text-gray-400 text-sm">
            That's all for now. Check back later for more videos!
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoGrid;
