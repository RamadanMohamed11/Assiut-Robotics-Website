import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

const SubjectTasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject } = location.state || {};

  if (!subject) {
    return null;
  }

  const tasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Introduction and basic concepts',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Intermediate concepts and practical applications',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Advanced topics and real-world scenarios',
      difficulty: 'Advanced'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 py-16 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-white mb-8 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Track</span>
        </button>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl font-bold text-white mb-4">{subject.title}</h1>
          <p className="text-blue-200 text-lg">{subject.description}</p>
        </div>

        <div className="space-y-6">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              onClick={() => window.open(subject.link, '_blank')}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 animate-slide-in cursor-pointer group"
              style={{ animationDelay: `${(index + 2) * 0.2}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{task.title}</h3>
                  <p className="text-blue-200">{task.description}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300">
                  {task.difficulty}
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-blue-200">
                  Estimated time: 2-3 hours
                </div>
                <a
                  href={subject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()} // Prevent card click when clicking the button
                >
                  <Send size={18} className="animate-pulse-slow" />
                  <span>Submit Solution</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectTasks;