import React from "react";
import VideoCard from "./VideoCard";

function VideoGrid() {
  const videos = [
    {
      title: "Sample Video 1",
      channel: "Channel A",
      views: "1M",
      thumbnail: "https://via.placeholder.com/320x180",
    },
    {
      title: "Sample Video 2",
      channel: "Channel B",
      views: "500K",
      thumbnail: "https://via.placeholder.com/320x180",
    },
    {
      title: "Sample Video 3",
      channel: "Channel C",
      views: "750K",
      thumbnail: "https://via.placeholder.com/320x180",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {videos.map((video, index) => (
        <VideoCard
          key={index}
          title={video.title}
          channel={video.channel}
          views={video.views}
          thumbnail={video.thumbnail}
        />
      ))}
    </div>
  );
}

export default VideoGrid;
