import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ChevronRight } from 'lucide-react';

const TrackLayout = ({ title, description, tasks }) => {
  const navigate = useNavigate();
  
  const getBgClass = () => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('hardware')) return 'hardware-bg';
    if (titleLower.includes('embedded')) return 'embedded-bg';
    if (titleLower.includes('ros')) return 'ros-bg';
    if (titleLower.includes('raspberry')) return 'raspberry-bg';
    if (titleLower.includes('computer vision')) return 'cv-bg';
    return '';
  };

  const handleSubjectClick = (subject) => {
    const path = window.location.pathname;
    navigate(`${path}/${subject.title.toLowerCase().replace(/\s+/g, '-')}`, { state: { subject } });
  };

  return (
    <div className={`min-h-screen ${getBgClass()} relative`}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tasks.map((task, index) => (
            <div 
              key={task.id} 
              onClick={() => handleSubjectClick(task)}
              className="content-overlay p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in cursor-pointer transform hover:scale-105 hover:bg-blue-50"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center justify-between">
                {task.title}
                <ChevronRight className="w-6 h-6 text-blue-500" />
              </h3>
              <p className="text-gray-600 mb-6 text-lg">{task.description}</p>
              <div className="absolute bottom-4 right-4">
                <div className="text-blue-500 text-sm font-medium">Click to view tasks</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackLayout;