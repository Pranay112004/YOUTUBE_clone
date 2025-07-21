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

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading videos...</div>
      </div>
    );
  }

  const videos = data && data.length > 0 ? data : fallbackVideos;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {videos.map((video, index) => {
        // Handle different video data structures
        let videoData = {
          id: `video-${index}`,
          title: 'Unknown Title',
          channel: 'Unknown Channel', 
          views: 'N/A',
          thumbnail: 'https://via.placeholder.com/320x180'
        };
        
        // Handle API data structure (from RapidAPI YouTube API)
        if (video.type === 'video' && video.video) {
          const v = video.video;
          videoData = {
            id: v.videoId || `video-${index}`,
            title: v.title || 'Unknown Title',
            channel: v.author?.title || 'Unknown Channel',
            views: v.stats?.views ? `${Math.floor(v.stats.views / 1000)}K` : 'N/A',
            thumbnail: v.thumbnails?.[0]?.url || v.thumbnails?.[1]?.url || 'https://via.placeholder.com/320x180'
          };
        }
        // Handle fallback sample data structure
        else if (video.title && video.channel) {
          videoData = {
            id: video.id || `video-${index}`,
            title: video.title,
            channel: video.channel,
            views: video.views || 'N/A',
            thumbnail: video.thumbnail || 'https://via.placeholder.com/320x180'
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
          />
        );
      })}
    </div>
  );
}

export default VideoGrid;
