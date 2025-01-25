import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Hardware from './pages/Hardware';
import EmbeddedSystem from './pages/EmbeddedSystem';
import ROS from './pages/ROS';
import Raspberry from './pages/Raspberry';
import ComputerVision from './pages/ComputerVision';
import SubjectTasks from './components/SubjectTasks';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/hardware/:subject" element={<SubjectTasks />} />
          <Route path="/embedded" element={<EmbeddedSystem />} />
          <Route path="/embedded/:subject" element={<SubjectTasks />} />
          <Route path="/ros" element={<ROS />} />
          <Route path="/ros/:subject" element={<SubjectTasks />} />
          <Route path="/raspberry" element={<Raspberry />} />
          <Route path="/raspberry/:subject" element={<SubjectTasks />} />
          <Route path="/computer-vision" element={<ComputerVision />} />
          <Route path="/computer-vision/:subject" element={<SubjectTasks />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;