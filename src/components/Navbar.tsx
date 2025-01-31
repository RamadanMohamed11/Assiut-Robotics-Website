import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Eye, Home, Laptop, CircuitBoard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
              <Bot size={32} className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 animate-pulse-slow" />
            </div>
            <span className="font-bold text-2xl">Assiut Robotics</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" icon={<Home size={20} />} text="Home" />
            <NavLink to="/hardware" icon={<Laptop size={20} />} text="Hardware" />
            <NavLink to="/embedded" icon={<CircuitBoard size={20} />} text="Embedded" />
            <NavLink to="/ros" icon={<Bot size={20} />} text="ROS & Raspberry" />
            <NavLink to="/computer-vision" icon={<Eye size={20} />} text="Computer Vision" />
          </div>
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img 
              src="https://res.cloudinary.com/dhjyfpw6f/image/upload/v1737757792/Rob_bpibmx.png" 
              alt="Assiut Robotics Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
  >
    {icon}
    <span className="font-medium">{text}</span>
  </Link>
);

export default Navbar;