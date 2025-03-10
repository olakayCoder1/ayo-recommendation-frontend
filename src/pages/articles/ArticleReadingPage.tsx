import React, { useState } from 'react';
import { BookmarkPlus, Share2, ThumbsUp, MessageSquare } from 'lucide-react';
import thumbnail from '../../assets/images/thumbnail-im.jpg'
import { Link } from 'react-router-dom';

interface Article {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  content: string[];
  coverImage: string;
  tags: string[];
}

const ArticleReadingPage: React.FC = () => {
  const [article] = useState<Article>({
    id: 1,
    title: "The Future of AI in Education",
    author: "Dr. Emma Williams",
    authorAvatar: thumbnail,
    publishDate: "February 28, 2025",
    readTime: "12 min read",
    coverImage: thumbnail,
    tags: ["Education", "Technology", "AI", "Learning"],
    content: [
      "Artificial Intelligence is rapidly transforming the landscape of education, introducing innovative ways to personalize learning experiences and support students in their academic journey. From intelligent tutoring systems to automated grading tools, AI technologies are redefining what's possible in educational environments.",
      
      "One of the most promising applications of AI in education is personalized learning. By analyzing patterns in student performance and behavior, AI systems can identify individual strengths, weaknesses, and learning preferences. This enables the creation of customized learning paths that adapt in real-time to each student's needs, ensuring that everyone receives the support they require to succeed.",
      
      "Intelligent tutoring systems represent another significant advancement. These AI-powered tools can provide students with immediate feedback and guidance, simulating one-on-one instruction even when human teachers are unavailable. Studies have shown that such systems can significantly improve learning outcomes, particularly in subjects like mathematics and science where immediate feedback is crucial.",
      
      "Furthermore, AI is helping educators manage their workload more effectively. Automated grading systems can evaluate objective assessments instantly, freeing up valuable time for teachers to focus on more complex aspects of education such as curriculum development and providing personalized support to students who need it most.",
      
      "Natural language processing technologies are enabling more sophisticated forms of assessment, capable of evaluating essays and written responses with increasing accuracy. While these systems cannot yet match human judgment in all contexts, they provide valuable preliminary feedback and can identify common issues in student writing.",
      
      "Data analytics powered by AI offers unprecedented insights into educational processes. By analyzing vast amounts of data from learning management systems, educators and administrators can identify trends, predict challenges, and make evidence-based decisions to improve educational outcomes at both individual and institutional levels.",
      
      "Despite these promising developments, the integration of AI in education faces several challenges. Concerns about data privacy, the potential for algorithmic bias, and the digital divide remain significant hurdles. Ensuring that AI tools are deployed ethically and equitably requires careful consideration and ongoing dialogue among educators, technologists, policymakers, and other stakeholders.",
      
      "Moreover, the role of human teachers in AI-enhanced educational environments must be carefully considered. Rather than replacing educators, AI should be viewed as a tool that amplifies their capabilities, enabling them to provide more personalized attention and guidance to their students.",
      
      "Looking ahead, the future of AI in education likely involves increasingly sophisticated systems that can understand and respond to not just the cognitive aspects of learning but also social and emotional dimensions. Affective computing, which enables systems to recognize and respond to human emotions, holds particular promise for creating more holistic and supportive learning environments.",
      
      "As we navigate this evolving landscape, collaboration between educators, researchers, technologists, and students will be essential to harness the full potential of AI while addressing its challenges. By approaching these technologies thoughtfully and intentionally, we can create educational systems that are more accessible, effective, and responsive to the diverse needs of learners worldwide."
    ]
  });

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      {/* Article Header */}
      <div className="mb-8">
        <img 
          src={article.coverImage} 
          alt={article.title} 
          className="w-full h-64 object-cover rounded-lg"
        />
        
        <div className="mt-6">
          <div className="flex space-x-2 mb-4">
            {article.tags.map((tag, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={article.authorAvatar} 
                alt={article.author} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{article.author}</p>
                <p className="text-gray-500 text-sm">{article.publishDate} · {article.readTime}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-indigo-600">
                <BookmarkPlus size={20} />
              </button>
              <button className="text-gray-500 hover:text-indigo-600">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <div className="prose max-w-none">
        {article.content.map((paragraph, index) => (
          <p key={index} className="mb-6 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      
      {/* Article Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <ThumbsUp size={18} />
              <span>324</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
              <MessageSquare size={18} />
              <span>42</span>
            </button>
          </div>
          
          <div>
            {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Follow Author
            </button> */}
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to={`/articles/90`} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 cursor-pointer transition-colors">
              <h4 className="font-medium mb-1">How AI is Transforming Online Learning Platforms</h4>
              <p className="text-gray-500 text-sm">8 min read</p>
            </Link>
            <Link to={`/articles/90`} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 cursor-pointer transition-colors">
              <h4 className="font-medium mb-1">Ethics of AI in Academic Assessment</h4>
              <p className="text-gray-500 text-sm">10 min read</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleReadingPage;