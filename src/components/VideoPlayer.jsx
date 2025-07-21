import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function VideoPlayer() {
  const { videoId } = useParams();
  const { data, fetchAllData } = useAuth();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    // Find current video from the data
    if (data && data.length > 0) {
      const video = data.find(v => 
        v.type === 'video' && v.video && v.video.videoId === videoId
      );
      if (video) {
        setCurrentVideo(video.video);
      }
    }

    // Fetch related videos
    if (currentVideo) {
      fetchAllData(currentVideo.title.split(' ').slice(0, 3).join(' '));
    }
  }, [videoId, data, currentVideo?.title]);

  useEffect(() => {
    // Set related videos (exclude current video)
    if (data && data.length > 0) {
      const filtered = data
        .filter(v => v.type === 'video' && v.video && v.video.videoId !== videoId)
        .slice(0, 10);
      setRelatedVideos(filtered);
    }
  }, [data, videoId]);

  if (!videoId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600">Video not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen pt-16">
      {/* Main Video Section */}
      <div className="flex-1 p-4">
        {/* Video Player */}
        <div className="bg-black rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full"
          ></iframe>
        </div>

        {/* Video Info */}
        {currentVideo && (
          <div className="bg-white rounded-lg p-6 mb-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">
              {currentVideo.title}
            </h1>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={currentVideo.author?.avatar?.[0]?.url || 'https://via.placeholder.com/48'}
                  alt={currentVideo.author?.title}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {currentVideo.author?.title || 'Unknown Channel'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentVideo.stats?.views ? `${Math.floor(currentVideo.stats.views / 1000)}K views` : 'No view data'}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
                  Subscribe
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                  👍 Like
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                  👎
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                  Share
                </button>
              </div>
            </div>

            {/* Description */}
            {currentVideo.descriptionSnippet && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-700 text-sm">
                  {currentVideo.descriptionSnippet}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Videos Sidebar */}
      <div className="w-full lg:w-96 p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Related Videos</h2>
        <div className="space-y-4">
          {relatedVideos.map((video, index) => (
            <Link
              key={video.video.videoId || index}
              to={`/watch/${video.video.videoId}`}
              className="flex bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={video.video.thumbnails?.[0]?.url || 'https://via.placeholder.com/168x94'}
                alt={video.video.title}
                className="w-42 h-24 object-cover flex-shrink-0"
              />
              <div className="p-3 flex-1">
                <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-gray-900">
                  {video.video.title}
                </h3>
                <p className="text-xs text-gray-600 mb-1">
                  {video.video.author?.title || 'Unknown Channel'}
                </p>
                <p className="text-xs text-gray-500">
                  {video.video.stats?.views ? `${Math.floor(video.video.stats.views / 1000)}K views` : 'No views'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
