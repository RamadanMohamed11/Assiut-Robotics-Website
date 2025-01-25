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
    <div className={`min-h-screen ${getBgClass()} relative circuit-pattern`}>
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Circuit Animation Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="voltage-line absolute left-1/4 h-full"></div>
        <div className="voltage-line absolute left-2/4 h-full" style={{ animationDelay: '0.5s' }}></div>
        <div className="voltage-line absolute left-3/4 h-full" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="electric-border inline-block p-8 rounded-2xl bg-black/30 backdrop-blur-sm">
            <h1 className="text-5xl font-bold text-white mb-6 power-pulse">{title}</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">{description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tasks.map((task, index) => (
            <div 
              key={task.id} 
              onClick={() => handleSubjectClick(task)}
              className="electric-border content-overlay p-8 rounded-xl shadow-lg transition-all duration-500 animate-slide-in cursor-pointer card-hover backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center justify-between">
                  {task.title}
                  <ChevronRight className="w-6 h-6 text-blue-400" />
                </h3>
                <p className="text-blue-200 mb-6 text-lg">{task.description}</p>
                <div className="absolute bottom-4 right-4">
                  <div className="text-blue-300 text-sm font-medium power-pulse">Click to view tasks</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackLayout;