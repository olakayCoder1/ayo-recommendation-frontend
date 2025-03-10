import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import thumbnail from '../../../assets/images/thumbnail-im.jpg'
import PreviewQuiz from '../../../components/admin/quiz/PreviewQuiz';

interface QuizQuestion {
    id: string;
    text: string;
    options: {
      id: string;
      text: string;
    }[];
    correctOptionId?: string; 
    explanation?: string; 
    
  }

// Types
interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number;
  tags: string[];
  questionsCount: number;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  questions: QuizQuestion[];
}

const QuizListingPage: React.FC = () => {
  // State
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const questions =  [
    {
      id: 'q1',
      text: 'Which of the following is a primitive type in TypeScript?',
      options: [
        { id: 'a', text: 'array' },
        { id: 'b', text: 'object' },
        { id: 'c', text: 'boolean' },
        { id: 'd', text: 'function' },
      ],
      correctOptionId: 'c',
      explanation: 'TypeScript has several primitive types: boolean, number, string, undefined, null, symbol, and bigint. Arrays, objects, and functions are not primitive types.'
    },
    {
      id: 'q2',
      text: 'What does the "readonly" modifier do in TypeScript?',
      options: [
        { id: 'a', text: 'It makes a property only readable by certain classes' },
        { id: 'b', text: 'It prevents a property from being changed after initialization' },
        { id: 'c', text: 'It marks a method as final and prevents overriding' },
        { id: 'd', text: 'It designates a class that cannot be instantiated' },
      ],
      correctOptionId: 'b',
      explanation: 'The "readonly" modifier in TypeScript makes a property immutable after it has been initialized. You can set its value when creating the object, but you cannot change it afterward.'
    },
    {
      id: 'q3',
      text: 'What is the purpose of the "interface" keyword in TypeScript?',
      options: [
        { id: 'a', text: 'To create a new instance of a class' },
        { id: 'b', text: 'To define a contract for object shapes' },
        { id: 'c', text: 'To implement inheritance between classes' },
        { id: 'd', text: 'To define public APIs for libraries' },
      ],
      correctOptionId: 'b',
      explanation: 'Interfaces in TypeScript define the structure or shape that objects must conform to. They act as contracts and are used for type-checking.'
    },
    {
      id: 'q4',
      text: 'What is the purpose of generics in TypeScript?',
      options: [
        { id: 'a', text: 'To create reusable components that work with a variety of types' },
        { id: 'b', text: 'To define static methods in a class' },
        { id: 'c', text: 'To specify global variables accessible throughout an application' },
        { id: 'd', text: 'To optimize code compilation speed' },
      ],
      correctOptionId: 'a',
      explanation: 'Generics in TypeScript allow you to create reusable components that can work with different types while maintaining type safety. They let you create functions, classes, and interfaces that work with any type you specify when using them.'
    },
    {
      id: 'q5',
      text: 'What is the "any" type in TypeScript?',
      options: [
        { id: 'a', text: 'A type that can only hold numeric values' },
        { id: 'b', text: 'A type that automatically converts between different types' },
        { id: 'c', text: 'A type that can hold any value and bypasses type checking' },
        { id: 'd', text: 'A type that cannot be null or undefined' },
      ],
      correctOptionId: 'c',
      explanation: 'The "any" type in TypeScript allows a variable to hold values of any type. It effectively opts out of type checking for that variable, making it similar to how variables work in JavaScript.'
    },
  ]

  // Mock data - In a real application, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockQuizzes: Quiz[] = [
        {
          id: '1',
          title: 'TypeScript Fundamentals',
          description: 'Test your knowledge of TypeScript basics including types, interfaces, and generics',
          category: 'Programming',
          difficulty: 'Medium',
          estimatedTime: 30,
          tags: ['TypeScript', 'Web Development', 'JavaScript'],
          questionsCount: 5,
          author: {
            name: 'Sarah Johnson',
            avatar: thumbnail,
          },
          createdAt: '2025-02-15T14:22:18Z',
          questions:questions
        },
        {
          id: '2',
          title: 'React Hooks Deep Dive',
          description: 'Master React Hooks and functional component patterns',
          category: 'Web Development',
          difficulty: 'Hard',
          estimatedTime: 45,
          tags: ['React', 'JavaScript', 'Hooks'],
          questionsCount: 8,
          author: {
            name: 'Michael Chen',
            avatar: thumbnail,
          },
          createdAt: '2025-03-01T09:15:00Z',
          questions:questions
        },
        {
          id: '3',
          title: 'CSS Grid Layout Basics',
          description: 'Learn how to create responsive layouts with CSS Grid',
          category: 'Web Development',
          difficulty: 'Easy',
          estimatedTime: 20,
          tags: ['CSS', 'Web Design', 'Responsive'],
          questionsCount: 4,
          author: {
            name: 'Emma Wilson',
            avatar: thumbnail,
          },
          createdAt: '2025-02-22T11:30:45Z',
          questions:questions
        },
        {
          id: '4',
          title: 'Python Data Structures',
          description: 'Understanding lists, dictionaries, sets, and tuples in Python',
          category: 'Programming',
          difficulty: 'Medium',
          estimatedTime: 35,
          tags: ['Python', 'Data Structures', 'Programming'],
          questionsCount: 6,
          author: {
            name: 'David Kim',
            avatar: thumbnail,
          },
          createdAt: '2025-03-05T16:42:30Z',
          questions:questions
        },
        {
          id: '5',
          title: 'SQL Query Basics',
          description: 'Learn essential SQL queries for database manipulation',
          category: 'Databases',
          difficulty: 'Easy',
          estimatedTime: 25,
          tags: ['SQL', 'Databases', 'Data'],
          questionsCount: 5,
          author: {
            name: 'Olivia Martinez',
            avatar: thumbnail,
          },
          createdAt: '2025-02-28T13:20:15Z',
          questions:questions
        },
        {
          id: '6',
          title: 'Advanced JavaScript Patterns',
          description: 'Exploring advanced patterns and techniques in JavaScript',
          category: 'Programming',
          difficulty: 'Hard',
          estimatedTime: 50,
          tags: ['JavaScript', 'Advanced', 'Design Patterns'],
          questionsCount: 7,
          author: {
            name: 'James Wilson',
            avatar: thumbnail,
          },
          createdAt: '2025-03-08T10:15:45Z',
          questions:questions
        },
      ];

      setQuizzes(mockQuizzes);
      setFilteredQuizzes(mockQuizzes);
      setIsLoading(false);

      // Extract all unique tags
      const allTags = Array.from(
        new Set(
          mockQuizzes.flatMap(quiz => quiz.tags)
        )
      );
      setAvailableTags(allTags);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = quizzes;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(quiz => 
        quiz.title.toLowerCase().includes(term) || 
        quiz.description.toLowerCase().includes(term) ||
        quiz.category.toLowerCase().includes(term)
      );
    }

    // Apply difficulty filter
    if (difficultyFilter) {
      result = result.filter(quiz => quiz.difficulty === difficultyFilter);
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      result = result.filter(quiz => 
        selectedTags.some(tag => quiz.tags.includes(tag))
      );
    }

    setFilteredQuizzes(result);
  }, [quizzes, searchTerm, difficultyFilter, selectedTags]);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Handle quiz preview
  const openPreviewModal = (quiz: Quiz) => {
    console.log(
        quiz.title,
    )
    setSelectedQuiz(quiz);
    setShowPreviewModal(true);
  };


  const closeModal = () => {
    setShowPreviewModal(false);
    setSelectedQuiz(null);
    };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setDifficultyFilter('');
    setSelectedTags([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quiz Library</h1>
          <p className="text-gray-600 mt-1">Browse and filter available quizzes</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/admin/quiz-create" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create New Quiz
          </Link>
        </div>
      </div>

      {/* Filters section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by title, description, or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="md:col-span-1 flex items-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Tags filter */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quizzes listing */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No quizzes found</h3>
          <p className="text-gray-500">Try adjusting your filter criteria or create a new quiz.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow-sm rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{quiz.description}</div>
                          <div className="mt-1 flex flex-wrap gap-1 sm:hidden">
                            {quiz.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                {tag}
                              </span>
                            ))}
                            {quiz.tags.length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                +{quiz.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900">{quiz.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                          quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {quiz.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                      {quiz.estimatedTime} mins
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {formatDate(quiz.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openPreviewModal(quiz)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Preview
                      </button>
                      <Link
                        to={`/admin/quiz-edit/${quiz.id}`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
        {/* Preview Modal */}
        {showPreviewModal && selectedQuiz && ( <PreviewQuiz quiz={selectedQuiz} closeModal={closeModal}/> )}
    </div>
  );
};

export default QuizListingPage;