import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-lg mb-2">
            Made by{' '}
            <span className="font-semibold">Eng. Ramadan Mohamed</span>
          </p>
          <p className="text-blue-200">
            © {new Date().getFullYear()} Assiut Robotics - AC Electrical Committee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;