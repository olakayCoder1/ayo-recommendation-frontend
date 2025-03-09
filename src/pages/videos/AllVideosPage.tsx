import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import thumbnail from '../../assets/images/thumbnail-im.jpg'

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
  }

const AllVideosPage: React.FC = () => {
  // In a real app, we would fetch these videos from an API
  const [searchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories: string[] = [
    'All', 'JavaScript', 'React', 'TypeScript', 'CSS', 'HTML', 'Node.js', 
    'Python', 
  ];
  
  const videos: Video[] = [
    {
      id: 1,
      title: 'How to Build a React App with Tailwind CSS',
      channel: 'WebDev Mastery',
      views: '1.2M views',
      date: '2 weeks ago',
      thumbnail: thumbnail,
      channelAvatar: '/api/placeholder/40/40',
      duration: '24:18'
    },
    {
      id: 2,
      title: 'Advanced React Hooks Tutorial',
      channel: 'React Masters',
      views: '856K views',
      date: '3 weeks ago',
      thumbnail: thumbnail,
      channelAvatar: '/api/placeholder/40/40',
      duration: '18:24'
    },
    {
      id: 3,
      title: 'Tailwind CSS Tips and Tricks',
      channel: 'CSS Wizards',
      views: '543K views',
      date: '1 month ago',
      thumbnail: thumbnail,
      channelAvatar: '/api/placeholder/40/40',
      duration: '12:45'
    },
    {
      id: 4,
      title: 'Build a Full-Stack App with React and Node',
      channel: 'Full Stack Journey',
      views: '1.8M views',
      date: '5 months ago',
      thumbnail: thumbnail,
      channelAvatar: '/api/placeholder/40/40',
      duration: '32:10'
    },
    {
      id: 5,
      title: 'Responsive Design Fundamentals',
      channel: 'UI/UX Hub',
      views: '723K views',
      date: '2 months ago',
      thumbnail: thumbnail,
      channelAvatar: '/api/placeholder/40/40',
      duration: '15:30'
    },
    {
      id: 6,
      title: 'TypeScript for Beginners - Complete Course',
      channel: 'TypeScript Guru',
      views: '1.5M views',
      date: '3 months ago',
      thumbnail: thumbnail,
      channelAvatar: '/api/placeholder/40/40',
      duration: '2:45:30'
    },
    {
      id: 7,
      title: 'CSS Grid vs Flexbox - When to Use Each',
      channel: 'CSS Wizards',
      views: '895K views',
      date: '4 months ago',
      thumbnail: thumbnail,
      channelAvatar: '/api/placeholder/40/40',
      duration: '15:45'
    },
    {
      id: 8,
      title: 'Modern JavaScript ES6+ Features You Need to Know',
      channel: 'JS Champions',
      views: '2.3M views',
      date: '1 year ago',
      thumbnail: thumbnail,
      channelAvatar: '/api/placeholder/40/40',
      duration: '28:12'
    }
  ];
  
  // Filter videos based on search term
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    video.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header with search */}
      {/* <header className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-red-600 text-white p-2 rounded-lg mr-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">TypeTube</h1>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search videos..." 
                className="w-full py-2 px-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-red-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-3 top-2">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <img 
              src="/api/placeholder/40/40" 
              alt="User avatar" 
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </header> */}
      
      {/* Category filters */}
      <div className="bg-white sticky top-16 z-10 shadow-sm">
        <div className="container mx-auto overflow-x-auto">
          <div className="flex space-x-4 p-2 whitespace-nowrap">
            {categories.map(category => (
              <button 
                key={category} 
                className={`px-4 py-1 rounded-full text-sm ${
                  selectedCategory === category 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Videos grid */}
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVideos.map(video => (
            <Link
            
              key={video.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              to={'/videos/1'}
            //   onClick={() => handleVideoClick(video.id)}
            >
              {/* Thumbnail */}
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              
              {/* Video info */}
              <div className="p-3">
                <div className="flex">
                  <img 
                    src={thumbnail} 
                    alt={`${video.channel} avatar ${video.channelAvatar}`} 
                    className="w-9 h-9 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
                    <p className="text-gray-600 text-xs mt-1">{video.channel}</p>
                    <p className="text-gray-600 text-xs">{video.views} • {video.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllVideosPage;