import React, { useState } from 'react';
import thumbnail from '../../assets/images/thumbnail-im.jpg'
import { Link } from 'react-router-dom';

interface Video {
  id: number;
  title: string;
  channel: string;
  views: string;
  date: string;
  thumbnail: string;
  channelAvatar: string;
  duration?: string;
  description?: string;
  videoUrl?: string;
}

const VideoPlayerPage: React.FC = () => {
  const [activeVideo] = useState<Video>({
    id: 1,
    title: 'How to Build a React App with Tailwind CSS',
    channel: 'WebDev Mastery',
    views: '1.2M views',
    date: '2 weeks ago',
    thumbnail: thumbnail,
    channelAvatar: thumbnail,
    description: 'In this video, we explore how to build responsive UIs with React and Tailwind CSS. We\'ll cover component structure, responsive design principles, and best practices for modern web development.',
    videoUrl: 'https://www.example.com/sample-video.mp4', // Add a sample video URL (replace with your actual video URL)
    duration: '24:18'
  });

  const relatedVideos: Video[] = [
    {
      id: 2,
      title: 'Advanced React Hooks Tutorial',
      channel: 'React Masters',
      views: '856K views',
      date: '3 weeks ago',
      thumbnail: thumbnail,
      channelAvatar: thumbnail,
      duration: '18:24'
    },
    {
      id: 3,
      title: 'Tailwind CSS Tips and Tricks',
      channel: 'CSS Wizards',
      views: '543K views',
      date: '1 month ago',
      thumbnail: thumbnail,
      channelAvatar: thumbnail,
      duration: '12:45'
    },
    {
      id: 4,
      title: 'Build a Full-Stack App with React and Node',
      channel: 'Full Stack Journey',
      views: '1.8M views',
      date: '5 months ago',
      thumbnail: thumbnail,
      channelAvatar: thumbnail,
      duration: '32:10'
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="lg:w-2/3 p-4">
        {/* Video Player */}
        <div className="bg-black relative pt-0 pb-0 h-0" style={{ paddingBottom: '56.25%' }}>
          {activeVideo.videoUrl ? (
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              src={activeVideo.videoUrl}
              poster={activeVideo.thumbnail}
              controls
              autoPlay
            />
          ) : (
            <img 
              src={activeVideo.thumbnail} 
              alt="Video player" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-xl font-bold">{activeVideo.title}</h1>
          <div className="flex items-center justify-between mt-2">
            <div className="text-gray-600">{activeVideo.views} • {activeVideo.date}</div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <button className="text-gray-700 flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  Like
                </button>
              </div>
              <div className="flex items-center">
                <button className="text-gray-700 flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2h-5.416a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                  Dislike
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* Description */}
        <div className="mt-4 bg-gray-200 p-4 rounded">
          <p className="text-sm">{activeVideo.description}</p>
        </div>
      </div>

      {/* Related Videos */}
      <div className="lg:w-1/3 p-4">
        <h2 className="text-lg font-bold mb-4">Related Videos</h2>
        <div className="space-y-4">
          {relatedVideos.map(video => (
            <Link 
              key={video.id} 
              className="flex cursor-pointer hover:bg-gray-200 p-2 rounded"
              to={`/videos/${video.id}`}
            >
              <div className="relative w-40 h-24 flex-shrink-0">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="ml-2 flex-grow">
                <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                <p className="text-gray-600 text-xs mt-1">{video.channel}</p>
                <p className="text-gray-600 text-xs">{video.views} • {video.date}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Suggestions Header */}
        <h2 className="text-lg font-bold mt-6 mb-4">Suggested Videos</h2>
        
        {/* Additional Recommended Videos */}
        <div className="space-y-4">
          {relatedVideos.slice().reverse().map(video => (
            <Link  
              key={`suggested-${video.id}`} 
              className="flex cursor-pointer hover:bg-gray-200 p-2 rounded"
              to={`/videos/${video.id}`}
            >
              <div className="relative w-40 h-24 flex-shrink-0">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="ml-2 flex-grow">
                <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                <p className="text-gray-600 text-xs mt-1">{video.channel}</p>
                <p className="text-gray-600 text-xs">{video.views} • {video.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;