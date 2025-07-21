import React from "react";
import { useAuth } from "../context/AuthProvider";
import VideoCard from "./VideoCard";

function VideoGrid() {
  const { loading, data } = useAuth();

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((video, index) => (
        <VideoCard
          key={index}
          title={video.snippet.title}
          channel={video.snippet.channelTitle}
          views="N/A"
          thumbnail={video.snippet.thumbnails.medium.url}
          videoId={video.id.videoId}
        />
      ))}
    </div>
  );
}

export default VideoGrid;
