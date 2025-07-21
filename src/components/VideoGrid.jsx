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
      id: "sample1"
    },
    {
      title: "Sample Video 2",
      channel: "Channel B",
      views: "500K",
      thumbnail: "https://via.placeholder.com/320x180",
      id: "sample2"
    },
    {
      title: "Sample Video 3",
      channel: "Channel C",
      views: "750K",
      thumbnail: "https://via.placeholder.com/320x180",
      id: "sample3"
    },
  ];

  // Loading skeleton component
  const VideoSkeleton = ({ delay = 0 }) => (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="flex space-x-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0"></div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
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
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Recommended for you</h2>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
              Latest
            </button>
            <button className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
              Popular
            </button>
            <button className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
              Trending
            </button>
          </div>
        </div>
      </div>
      
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-6 pb-8">
        {videos.map((video, index) => {
          // Handle different video data structures
          let videoData = {
            id: `video-${index}`,
            title: 'Unknown Title',
            channel: 'Unknown Channel', 
            views: 'N/A',
            thumbnail: 'https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=Video+Thumbnail'
          };
          
          // Handle API data structure (from RapidAPI YouTube API)
          if (video.type === 'video' && video.video) {
            const v = video.video;
            videoData = {
              id: v.videoId || `video-${index}`,
              title: v.title || 'Unknown Title',
              channel: v.author?.title || 'Unknown Channel',
              views: v.stats?.views ? `${Math.floor(v.stats.views / 1000)}K` : 'N/A',
              thumbnail: v.thumbnails?.[0]?.url || v.thumbnails?.[1]?.url || 'https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=Video+Thumbnail'
            };
          }
          // Handle fallback sample data structure
          else if (video.title && video.channel) {
            videoData = {
              id: video.id || `video-${index}`,
              title: video.title,
              channel: video.channel,
              views: video.views || 'N/A',
              thumbnail: video.thumbnail || 'https://via.placeholder.com/320x180/f3f4f6/9ca3af?text=Video+Thumbnail'
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
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VideoGrid;
