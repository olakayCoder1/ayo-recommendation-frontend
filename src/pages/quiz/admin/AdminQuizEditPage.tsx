import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Types
interface QuizQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation?: string;
}

interface QuizFormData {
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number;
  tags: string[];
  questions: QuizQuestion[];
}

const AdminQuizEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // State for form data
  const [formData, setFormData] = useState<QuizFormData>({
    title: '',
    description: '',
    category: '',
    difficulty: 'Medium',
    estimatedTime: 20,
    tags: [],
    questions: []
  });
  
  // State for the current question being edited
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    id: '',
    text: '',
    options: [
      { id: 'a', text: '' },
      { id: 'b', text: '' },
      { id: 'c', text: '' },
      { id: 'd', text: '' }
    ],
    correctOptionId: '',
    explanation: ''
  });
  
  // State for tag input
  const [tagInput, setTagInput] = useState('');
  
  // Fetch quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, you would fetch from your API
        // For demo, we'll simulate fetching data
        setTimeout(() => {
          // Mock data - in a real application this would come from your API
          const mockQuizData: QuizFormData = {
            title: 'React Fundamentals',
            description: 'Test your knowledge of React core concepts and hooks.',
            category: 'Web Development',
            difficulty: 'Medium',
            estimatedTime: 30,
            tags: ['React', 'JavaScript', 'Frontend'],
            questions: [
              {
                id: 'q1',
                text: 'What hook would you use to run side effects in a function component?',
                options: [
                  { id: 'a', text: 'useEffect' },
                  { id: 'b', text: 'useState' },
                  { id: 'c', text: 'useContext' },
                  { id: 'd', text: 'useReducer' }
                ],
                correctOptionId: 'a',
                explanation: 'useEffect is used for performing side effects in function components.'
              },
              {
                id: 'q2',
                text: 'Which is NOT a core principle of React?',
                options: [
                  { id: 'a', text: 'Component-based architecture' },
                  { id: 'b', text: 'Virtual DOM' },
                  { id: 'c', text: 'Two-way data binding' },
                  { id: 'd', text: 'Unidirectional data flow' }
                ],
                correctOptionId: 'c',
                explanation: 'React uses one-way data binding, not two-way data binding.'
              }
            ]
          };
          
          setFormData(mockQuizData);
          setIsLoading(false);
        }, 800); // Simulate network delay
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setIsLoading(false);
      }
    };
    
    fetchQuizData();
  }, [quizId]);
  
  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle question field changes
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle option field changes
  const handleOptionChange = (optionId: string, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.map(option => 
        option.id === optionId ? { ...option, text: value } : option
      )
    }));
  };
  
  // Handle correct option selection
  const handleCorrectOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion(prev => ({
      ...prev,
      correctOptionId: e.target.value
    }));
  };
  
  // Add question to quiz
  const handleAddQuestion = () => {
    // Validate question
    if (!currentQuestion.text || 
        currentQuestion.options.some(opt => !opt.text) || 
        !currentQuestion.correctOptionId) {
      alert('Please fill in all question fields and select a correct answer.');
      return;
    }
    
    if (currentQuestion.id) {
      // Update existing question
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.map(q => 
          q.id === currentQuestion.id ? currentQuestion : q
        )
      }));
    } else {
      // Create unique ID for new question
      const questionId = `q${formData.questions.length + 1}`;
      
      // Add new question to form data
      setFormData(prev => ({
        ...prev,
        questions: [...prev.questions, { ...currentQuestion, id: questionId }]
      }));
    }
    
    // Reset current question form
    setCurrentQuestion({
      id: '',
      text: '',
      options: [
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' }
      ],
      correctOptionId: '',
      explanation: ''
    });
  };
  
  // Remove question from quiz
  const handleRemoveQuestion = (questionId: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };
  
  // Edit existing question
  const handleEditQuestion = (questionId: string) => {
    const questionToEdit = formData.questions.find(q => q.id === questionId);
    if (questionToEdit) {
      setCurrentQuestion(questionToEdit);
    }
  };
  
  // Add tag
  const handleAddTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput]
      }));
      setTagInput('');
    }
  };
  
  // Remove tag
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.category || formData.questions.length === 0) {
      alert('Please fill in all required fields and add at least one question.');
      return;
    }
    
    // In a real application, you would update the quiz via API here
    console.log('Quiz data updated:', formData);
    
    // Mock submission - typically you'd make an API call here
    alert('Quiz successfully updated!');
    navigate('/admin/quiz-list');
  };
  
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Quiz</h1>
        <p className="text-gray-600">Update the details of your quiz below.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Quiz Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Quiz Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                placeholder="e.g. Programming, Web Development"
              />
            </div>
            
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty *
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Time (minutes) *
              </label>
              <input
                type="number"
                id="estimatedTime"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleInputChange}
                min="5"
                max="120"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          {/* Tags */}
          <div className="mt-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l-md"
                placeholder="Add a tag and press Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-r-md hover:bg-gray-300"
              >
                Add
              </button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-indigo-600 hover:text-indigo-800"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Questions Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Questions</h2>
          
          {/* Question Editor */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium mb-3">
              {currentQuestion.id ? 'Edit Question' : 'Add New Question'}
            </h3>
            
            <div className="mb-4">
              <label htmlFor="question-text" className="block text-sm font-medium text-gray-700 mb-1">
                Question Text *
              </label>
              <textarea
                id="question-text"
                name="text"
                value={currentQuestion.text}
                onChange={handleQuestionChange}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your question here..."
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options *
              </label>
              <div className="space-y-3">
                {currentQuestion.options.map(option => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`option-${option.id}`}
                      name="correctOption"
                      value={option.id}
                      checked={currentQuestion.correctOptionId === option.id}
                      onChange={handleCorrectOptionChange}
                      className="mr-2"
                    />
                    <label htmlFor={`option-${option.id}`} className="mr-2 w-8">
                      {option.id.toUpperCase()}.
                    </label>
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded-md"
                      placeholder={`Option ${option.id.toUpperCase()}`}
                      required
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Select the radio button next to the correct answer.
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
                Explanation (Optional)
              </label>
              <textarea
                id="explanation"
                name="explanation"
                value={currentQuestion.explanation || ''}
                onChange={handleQuestionChange}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Explain why the correct answer is right (shown after answering)"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              {currentQuestion.id && (
                <button
                  type="button"
                  onClick={() => setCurrentQuestion({
                    id: '',
                    text: '',
                    options: [
                      { id: 'a', text: '' },
                      { id: 'b', text: '' },
                      { id: 'c', text: '' },
                      { id: 'd', text: '' }
                    ],
                    correctOptionId: '',
                    explanation: ''
                  })}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {currentQuestion.id ? 'Update Question' : 'Add Question'}
              </button>
            </div>
          </div>
          
          {/* Question List */}
          {formData.questions.length > 0 ? (
            <div className="border border-gray-200 rounded-lg divide-y">
              {formData.questions.map((question, index) => (
                <div key={question.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <div className="font-medium mb-1">
                        Question {index + 1}: {question.text}
                      </div>
                      <div className="text-sm text-gray-600 ml-4">
                        {question.options.map(option => (
                          <div key={option.id} className="flex items-center">
                            <span className={`w-6 ${option.id === question.correctOptionId ? 'font-bold text-green-600' : ''}`}>
                              {option.id.toUpperCase()}.
                            </span>
                            <span>{option.text}</span>
                            {option.id === question.correctOptionId && (
                              <span className="ml-2 text-xs text-green-600">✓ Correct</span>
                            )}
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <div className="mt-1 text-sm text-gray-500 ml-4">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEditQuestion(question.id)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(question.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No questions added yet. Add your first question above.</p>
            </div>
          )}
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/admin/quiz-list')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            disabled={formData.questions.length === 0}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminQuizEditPage;