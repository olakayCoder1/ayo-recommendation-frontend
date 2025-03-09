import React, { useState } from 'react';
import { Video, BookOpen } from 'lucide-react';
import thumbnail from '../assets/images/thumbnail-im.jpg'
import { Link, useNavigate } from 'react-router-dom';

// Define TypeScript interfaces
interface Student {
  name: string;
  course: string;
  year: string;
}

interface VideoRecommendation {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  instructor: string;
  views: string;
}

interface ArticleRecommendation {
  id: number;
  title: string;
  image: string;
  author: string;
  readTime: string;
  date: string;
}

const StudentDashboard: React.FC = () => {



  const [student] = useState<Student>({
    name: "Olanrewaju AbdulKabeer",
    course: "Computer Science",
    year: "Finalist"
  });

  const navigate = useNavigate()

  const [recommendedVideos] = useState<VideoRecommendation[]>([
    {
      id: 1,
      title: "Introduction to Machine Learning Algorithms",
      thumbnail: thumbnail,
      duration: "18:24",
      instructor: "Dr. Sarah Chen",
      views: "1.2K"
    },
    {
      id: 2,
      title: "Data Structures Explained Simply",
      thumbnail: thumbnail,
      duration: "24:15",
      instructor: "Prof. Michael Reed",
      views: "986"
    },
    {
      id: 3,
      title: "Web Development Fundamentals",
      thumbnail: thumbnail,
      duration: "32:10",
      instructor: "Jamie Taylor",
      views: "2.5K"
    }
  ]);

  const [recommendedArticles] = useState<ArticleRecommendation[]>([
    {
      id: 1,
      title: "How to Ace Your Technical Interviews",
      image: thumbnail,
      author: "Career Services",
      readTime: "8 min read",
      date: "Mar 2, 2025"
    },
    {
      id: 2,
      title: "The Future of AI in Education",
      image: thumbnail,
      author: "Tech Insights",
      readTime: "12 min read",
      date: "Feb 28, 2025"
    },
    {
      id: 3,
      title: "Study Techniques That Actually Work",
      image: thumbnail,
      author: "Learning Lab",
      readTime: "6 min read",
      date: "Feb 25, 2025"
    }
  ]);

  // Get current time of day for greeting
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">{getGreeting()}, {student.name}!</h2>
        <p className="opacity-90 mb-4">{student.year} • {student.course}</p>
        <p className="text-lg">Your weekly progress is on track. You've completed 80% of this week's assignments.</p>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Video Recommendations */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Video size={20} className="mr-2 text-indigo-600" />
            Top Pick Videos for You
          </h2>
          <div className="space-y-4">
            {recommendedVideos.map((video) => (
              <Link to={'/videos/0'} key={video.id} className="flex space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                <div className="relative flex-shrink-0">
                  <img src={video.thumbnail} alt={video.title} className="w-32 h-20 object-cover rounded-md" />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.instructor}</p>
                  <p className="text-gray-500 text-xs">{video.views} views</p>
                </div>
              </Link >
            ))}
          </div>
          <button 
            onClick={()=> navigate('/videos')}
            className="w-full mt-4 text-indigo-600 font-medium py-2 hover:bg-indigo-50 rounded-lg transition-colors">
            View All Recommended Videos
          </button>
        </div>

        {/* Article Recommendations */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <BookOpen size={20} className="mr-2 text-indigo-600" />
            Top Pick Articles for You
          </h2>
          <div className="space-y-4">
            {recommendedArticles.map((article) => (
              <Link to={"/articles/10"} key={article.id} className="flex space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
                <img src={article.image} alt={article.title} className="w-32 h-20 object-cover rounded-md flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{article.title}</h3>
                  <p className="text-gray-600 text-sm">{article.author}</p>
                  <p className="text-gray-500 text-xs">{article.readTime} • {article.date}</p>
                </div>
              </Link>
            ))}
          </div>
          <button className="w-full mt-4 text-indigo-600 font-medium py-2 hover:bg-indigo-50 rounded-lg transition-colors">
            View All Recommended Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;