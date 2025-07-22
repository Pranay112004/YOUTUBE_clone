import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function VideoPlayer() {
  const { videoId } = useParams();
  const { data, fetchAllData, loading, error } = useAuth();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  // Find current video
  useEffect(() => {
    if (data && data.length > 0) {
      const video = data.find(
        (v) => v.type === "video" && v.video && v.video.videoId === videoId
      );
      if (video) {
        setCurrentVideo(video.video);
      } else {
        setCurrentVideo(null); // Reset if not found
      }
    }
  }, [videoId, data]);

  // Fetch related videos only when videoId changes
  useEffect(() => {
    if (videoId && currentVideo?.title) {
      setRelatedLoading(true);
      const query = currentVideo.title.split(" ").slice(0, 3).join(" ");
      fetchAllData(query, false).finally(() => setRelatedLoading(false));
    }
  }, [videoId, fetchAllData]); // Removed currentVideo.title from deps

  // Update related videos
  useEffect(() => {
    if (data && data.length > 0) {
      const filtered = data
        .filter(
          (v) => v.type === "video" && v.video && v.video.videoId !== videoId
        )
        .slice(0, 10);
      setRelatedVideos(filtered);
    } else {
      setRelatedVideos([]);
    }
  }, [data, videoId]);

  // Loading skeleton for related videos
  const RelatedVideoSkeleton = ({ delay = 0 }) => (
    <div
      className="flex bg-white rounded-lg overflow-hidden animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-36 sm:w-42 h-20 sm:h-24 bg-gray-200"></div>
      <div className="p-2 sm:p-3 flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );

  if (!videoId || (!currentVideo && !loading && error)) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-lg sm:text-xl text-gray-600">
            {error || "Video not found"}
          </p>
          <Link
            to="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            aria-label="Return to home"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen pt-[64px] sm:pt-[68px]">
      {/* Main Video Section */}
      <div className="flex-1 p-3 sm:p-4 lg:p-6 animate-fadeInUp">
        {loading && !currentVideo ? (
          <div className="bg-black rounded-2xl overflow-hidden mb-4 sm:mb-6 shadow-lg">
            <div className="relative aspect-video bg-gray-200 animate-pulse"></div>
          </div>
        ) : (
          currentVideo && (
            <>
              {/* Video Player */}
              <div className="bg-black rounded-2xl overflow-hidden mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={currentVideo.title || "YouTube video player"}
                    aria-label={`Video player for ${currentVideo.title}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </div>

              {/* Video Info */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 mb-4 shadow-sm">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 line-clamp-2">
                  {currentVideo.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <img
                      src={
                        currentVideo.author?.avatar?.[0]?.url ||
                        "https://via.placeholder.com/48"
                      }
                      alt={`Avatar for ${
                        currentVideo.author?.title || "channel"
                      }`}
                      loading="lazy"
                      className="w-10 h-10 sm:w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                        {currentVideo.author?.title || "Unknown Channel"}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {currentVideo.stats?.views
                          ? `${Math.floor(
                              currentVideo.stats.views / 1000
                            )}K views`
                          : "No view data"}
                        {" • "}
                        {currentVideo.publishedAt
                          ? new Date(
                              currentVideo.publishedAt
                            ).toLocaleDateString()
                          : "Unknown date"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      className="bg-red-600 text-white px-4 sm:px-5 py-1.5 sm:py-2 text-sm rounded-full hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label="Subscribe to channel"
                      onClick={() => console.log("Subscribe clicked")}
                    >
                      Subscribe
                    </button>
                    <button
                      className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center space-x-1"
                      aria-label="Like video"
                      onClick={() => console.log(`Like video: ${videoId}`)}
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
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.7c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span>Like</span>
                    </button>
                    <button
                      className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center space-x-1"
                      aria-label="Dislike video"
                      onClick={() => console.log(`Dislike video: ${videoId}`)}
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
                          d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13v-9m-7 10h2m5-10h2a2 2 0 002 2v6a2 2 0 01-2 2h-2.5"
                        />
                      </svg>
                      <span>Dislike</span>
                    </button>
                    <button
                      className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center space-x-1"
                      aria-label="Share video"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: currentVideo.title,
                            url: `${window.location.origin}/watch/${videoId}`,
                          });
                        } else {
                          console.log("Share not supported");
                        }
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
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {currentVideo.descriptionSnippet && (
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-sm sm:text-base mb-2">
                      Description
                    </h4>
                    <p className="text-gray-700 text-xs sm:text-sm line-clamp-4">
                      {currentVideo.descriptionSnippet}
                    </p>
                  </div>
                )}
              </div>
            </>
          )
        )}
      </div>

      {/* Related Videos Sidebar */}
      <div className="w-full lg:w-80 xl:w-96 p-3 sm:p-4 lg:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">
          Related Videos
        </h2>

        {relatedLoading ? (
          <div className="space-y-3 sm:space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              <RelatedVideoSkeleton key={i} delay={i * 100} />
            ))}
          </div>
        ) : relatedVideos.length === 0 ? (
          <p className="text-gray-600 text-sm">No related videos found</p>
        ) : (
          <div className="space-y-3 sm:space-y-4 max-h-[calc(100vh-128px)] sm:max-h-[calc(100vh-132px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {relatedVideos.map((video, index) => (
              <Link
                key={video.video.videoId || index}
                to={`/watch/${video.video.videoId}`}
                className="flex bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Watch ${video.video.title} by ${
                  video.video.author?.title || "Unknown Channel"
                }`}
              >
                <img
                  src={
                    video.video.thumbnails?.[0]?.url ||
                    "https://via.placeholder.com/168x94"
                  }
                  alt={`Thumbnail for ${video.video.title}`}
                  loading="lazy"
                  className="w-36 sm:w-42 h-20 sm:h-24 object-cover flex-shrink-0"
                />
                <div className="p-2 sm:p-3 flex-1">
                  <h3 className="font-semibold text-xs sm:text-sm mb-1 line-clamp-2 text-gray-900">
                    {video.video.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1 truncate">
                    {video.video.author?.title || "Unknown Channel"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {video.video.stats?.views
                      ? `${Math.floor(video.video.stats.views / 1000)}K views`
                      : "No views"}
                    {" • "}
                    {video.video.publishedAt
                      ? new Date(video.video.publishedAt).toLocaleDateString()
                      : "Unknown date"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
