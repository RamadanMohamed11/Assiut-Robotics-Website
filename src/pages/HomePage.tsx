import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Cpu, Eye, Home, Laptop, CircuitBoard, Zap } from 'lucide-react';
import About from '../components/About';
import Score from '../components/Score';
import Assistants from '../components/Assistants';
import HRs from '../components/HRs';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div className="hero-pattern">
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">
              Welcome to Assiut Robotics
            </h1>
            <p className="text-3xl text-blue-200 font-light animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Learn How To Learn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Hardware",
                description: "Learn about electronic components and circuit design",
                link: "/hardware",
                icon: <Laptop className="w-8 h-8 mb-4 text-red-600" />,
                borderColor: "border-red-200"
              },
              {
                title: "Embedded Systems",
                description: "Master microcontroller programming and interfacing",
                link: "/embedded",
                icon: <CircuitBoard className="w-8 h-8 mb-4 text-blue-600" />,
                borderColor: "border-blue-200"
              },
              {
                title: "ROS",
                description: "Explore Robot Operating System fundamentals",
                link: "/ros",
                icon: <Bot className="w-8 h-8 mb-4 text-green-600" />,
                borderColor: "border-green-200"
              },
              {
                title: "Raspberry Pi",
                description: "Build projects with single-board computers",
                link: "/raspberry",
                icon: <Cpu className="w-8 h-8 mb-4 text-purple-600" />,
                borderColor: "border-purple-200"
              },
              {
                title: "Computer Vision",
                description: "Learn image processing and object detection",
                link: "/computer-vision",
                icon: <Eye className="w-8 h-8 mb-4 text-yellow-600" />,
                borderColor: "border-yellow-200"
              }
            ].map((card, index) => (
              <TrackCard
                key={card.title}
                {...card}
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      <Score />
      <About />
      <Assistants />
      <HRs />
    </div>
  );
};

const TrackCard = ({ title, description, link, icon, borderColor, style }) => (
  <Link
    to={link}
    className={`bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${borderColor} track-card animate-fade-in`}
    style={style}
  >
    <div className="text-center">
      {icon}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

export default HomePage;