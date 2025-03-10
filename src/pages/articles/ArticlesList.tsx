import React, { useState } from 'react';
import thumbnail from '../../assets/images/thumbnail-im.jpg'
import { Link } from 'react-router-dom';
// Types
interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedDate: string;
  readingTime: number;
  category: string;
  imageUrl?: string;
}

const ArticlesList: React.FC = () => {
  // Sample articles data
  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'Understanding TypeScript: A Comprehensive Guide',
      excerpt: 'TypeScript adds static typing to JavaScript, providing developers with tools to build more robust applications...',
      author: {
        name: 'Sarah Johnson',
        avatar: thumbnail,
      },
      publishedDate: 'Mar 5, 2025',
      readingTime: 8,
      category: 'Programming',
      imageUrl: thumbnail,
    },
    {
      id: '2',
      title: 'The Future of Web Development in 2025',
      excerpt: 'As web technologies evolve, developers face new challenges and opportunities. Here\'s what to expect in 2025...',
      author: {
        name: 'Michael Chen',
        avatar: thumbnail,
      },
      publishedDate: 'Feb 28, 2025',
      readingTime: 6,
      category: 'Web Development',
    },
    {
      id: '3',
      title: 'Why React Remains the Top Frontend Framework',
      excerpt: 'Despite new competitors emerging every year, React continues to dominate frontend development. Here\'s why...',
      author: {
        name: 'Avery Williams',
        avatar: thumbnail,
      },
      publishedDate: 'Feb 25, 2025',
      readingTime: 5,
      category: 'React',
      imageUrl: thumbnail,
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="space-y-8">
        {/* Featured Section */}
        <div className="border-b pb-8">
          <div className="text-sm text-gray-500 mb-4">FEATURED STORY</div>
          <Link to={`/articles/${articles[0].id}`} className="flex flex-col md:flex-row gap-6">
            {articles[0].imageUrl && (
              <img 
                src={articles[0].imageUrl} 
                alt={articles[0].title} 
                className="w-full md:w-1/2 h-56 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 hover:text-gray-700 cursor-pointer">
                {articles[0].title}
              </h2>
              <p className="text-gray-600 mb-4">{articles[0].excerpt}</p>
              <div className="flex items-center">
                <img 
                  src={articles[0].author.avatar} 
                  alt={articles[0].author.name} 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="text-sm">
                  <div className="font-medium">{articles[0].author.name}</div>
                  <div className="text-gray-500">
                    {articles[0].publishedDate} · {articles[0].readingTime} min read · {articles[0].category}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Article List */}
        <div className="space-y-8">
          <h3 className="text-xl font-semibold mb-4">Latest Articles</h3>
          
          {articles.slice(1).map(article => (
            <Link to={`/articles/${article.id}`} key={article.id} className="flex flex-col md:flex-row gap-6 border-b pb-8">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2 hover:text-gray-700 cursor-pointer">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name} 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="text-sm">
                    <div className="font-medium">{article.author.name}</div>
                    <div className="text-gray-500">
                      {article.publishedDate} · {article.readingTime} min read · {article.category}
                    </div>
                  </div>
                </div>
              </div>
              {article.imageUrl && (
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full md:w-1/3 h-40 object-cover rounded-lg"
                />
              )}
            </Link>
          ))}
        </div>
        
        {/* Load More Button */}
        <button className="w-full mt-4 text-indigo-600 font-medium py-2 hover:bg-indigo-50 rounded-lg transition-colors">
            Load more articles
        </button>
      </div>
    </div>
  );
};

export default ArticlesList;
