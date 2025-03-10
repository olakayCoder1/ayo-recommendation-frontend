import React, { useState } from 'react';
import thumbnail from '../../assets/images/thumbnail-im.jpg'
import { useNavigate } from 'react-router-dom';
// Types
interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionsCount: number;
  estimatedTime: number;  // in minutes
  author: {
    name: string;
    avatar: string;
  };
  dateCreated: string;
  imageUrl?: string;
  tags: string[];
  popularity: number; // number of times taken
}

const RecommendedQuizzes: React.FC = () => {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const navigate = useNavigate()

  // Sample quiz data
  const [quizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'TypeScript Fundamentals',
      description: 'Test your knowledge of TypeScript basics including types, interfaces, and generics',
      category: 'Programming',
      difficulty: 'Medium',
      questionsCount: 15,
      estimatedTime: 20,
      author: {
        name: 'Sarah Johnson',
        avatar: thumbnail,
      },
      dateCreated: 'Feb 25, 2025',
      imageUrl: thumbnail,
      tags: ['TypeScript', 'Web Development', 'Programming'],
      popularity: 3450
    },
    {
      id: '2',
      title: 'React Hooks Master Quiz',
      description: 'Challenge yourself with questions about React hooks and functional components',
      category: 'Web Development',
      difficulty: 'Hard',
      questionsCount: 20,
      estimatedTime: 30,
      author: {
        name: 'Michael Chen',
        avatar: thumbnail,
      },
      dateCreated: 'Feb 15, 2025',
      imageUrl: thumbnail,
      tags: ['React', 'JavaScript', 'Hooks', 'Frontend'],
      popularity: 5621
    },
    {
      id: '3',
      title: 'HTML & CSS Basics',
      description: 'Review your foundational knowledge of HTML5 and CSS3',
      category: 'Web Development',
      difficulty: 'Easy',
      questionsCount: 12,
      estimatedTime: 15,
      author: {
        name: 'Avery Williams',
        avatar: thumbnail,
      },
      dateCreated: 'Mar 2, 2025',
      tags: ['HTML', 'CSS', 'Web Development', 'Frontend'],
      popularity: 7892
    },
    {
      id: '4',
      title: 'SQL Database Challenges',
      description: 'Test your SQL query skills with these database challenges',
      category: 'Databases',
      difficulty: 'Medium',
      questionsCount: 18,
      estimatedTime: 25,
      author: {
        name: 'Jamie Rodriguez',
        avatar: thumbnail,
      },
      dateCreated: 'Feb 28, 2025',
      imageUrl: thumbnail,
      tags: ['SQL', 'Databases', 'Backend'],
      popularity: 2987
    },
    {
      id: '5',
      title: 'Machine Learning Concepts',
      description: 'Challenge your understanding of machine learning algorithms and concepts',
      category: 'Data Science',
      difficulty: 'Hard',
      questionsCount: 25,
      estimatedTime: 40,
      author: {
        name: 'Alex Kumar',
        avatar: thumbnail,
      },
      dateCreated: 'Feb 10, 2025',
      imageUrl: thumbnail,
      tags: ['Machine Learning', 'AI', 'Data Science', 'Python'],
      popularity: 4152
    },
  ]);

  // Extract unique categories and difficulties
  const categories = ['All', ...Array.from(new Set(quizzes.map(quiz => quiz.category)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  // Filter quizzes based on selected criteria
  const filteredQuizzes = quizzes.filter(quiz => {
    return (selectedCategory === 'All' || quiz.category === selectedCategory) &&
           (selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty);
  });

  // Function to render difficulty badge with appropriate color
  const renderDifficultyBadge = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    let bgColor = '';
    switch(difficulty) {
      case 'Easy':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'Medium':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Hard':
        bgColor = 'bg-red-100 text-red-800';
        break;
    }
    
    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${bgColor}`}>
        {difficulty}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Recommended Quizzes</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category-filter"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="difficulty-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            id="difficulty-filter"
            className="w-full p-2 border border-gray-300 rounded-md bg-white"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Featured Quiz */}
      {filteredQuizzes.length > 0 && (
        <div className="mb-12">
          <div className="text-sm text-gray-500 mb-4">FEATURED QUIZ</div>
          <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="md:flex">
              {filteredQuizzes[0].imageUrl && (
                <div className="md:flex-shrink-0">
                  <img 
                    src={filteredQuizzes[0].imageUrl} 
                    alt={filteredQuizzes[0].title} 
                    className="h-48 w-full object-cover md:w-64"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold mb-1">
                      {filteredQuizzes[0].category}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition mb-2">
                      {filteredQuizzes[0].title}
                    </h2>
                  </div>
                  <div>
                    {renderDifficultyBadge(filteredQuizzes[0].difficulty)}
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{filteredQuizzes[0].description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="mr-4">{filteredQuizzes[0].questionsCount} questions</span>
                  <span className="mr-4">~{filteredQuizzes[0].estimatedTime} mins</span>
                  <span>{filteredQuizzes[0].popularity.toLocaleString()} attempts</span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={filteredQuizzes[0].author.avatar} 
                      alt={filteredQuizzes[0].author.name} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-700">{filteredQuizzes[0].author.name}</span>
                  </div>
                  <button onClick={()=> navigate(`${filteredQuizzes[0].id}`)}  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Quiz List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuizzes.slice(1).map(quiz => (
          <div key={quiz.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                  {quiz.category}
                </div>
                {renderDifficultyBadge(quiz.difficulty)}
              </div>
              <h3 className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition mb-2">
                {quiz.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
              <div className="flex items-center text-xs text-gray-500 mb-4">
                <span className="mr-3">{quiz.questionsCount} questions</span>
                <span className="mr-3">~{quiz.estimatedTime} mins</span>
                <span>{quiz.popularity.toLocaleString()} attempts</span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {quiz.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {quiz.tags.length > 3 && (
                  <span className="px-2 py-1 text-gray-500 text-xs">
                    +{quiz.tags.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={quiz.author.avatar} 
                    alt={quiz.author.name} 
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-xs text-gray-700">{quiz.author.name}</span>
                </div>
                <button onClick={()=> navigate(`${quiz.id}`)} className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more results.</p>
        </div>
      )}
      
      {/* Load More Button */}
      {filteredQuizzes.length > 0 && (
        <button className="w-full mt-4 text-indigo-600 font-medium py-2 hover:bg-indigo-50 rounded-lg transition-colors">
            Load more quizzes
        </button>
      )}
    </div>
  );
};

export default RecommendedQuizzes;