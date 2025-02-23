import React from 'react';
import TrackLayout from '../components/TrackLayout';

const ComputerVision = () => {
  const tasks = [
    {
      id: 1,
      title: 'Linux Commands',
      description: 'Learn essential Linux commands, file system navigation, and basic shell scripting',
      link: 'https://forms.google.com/cv-linux'
    },
    {
      id: 2,
      title: 'Python Programming',
      description: 'Master Python fundamentals, data structures, and libraries for computer vision',
      link: 'https://forms.google.com/cv-python'
    },
    {
      id: 3,
      title: 'Computer Vision',
      description: 'Learn image processing, feature detection, object recognition, and deep learning for computer vision',
      link: 'https://forms.google.com/cv-vision'
    },
    {
      id: 4,
      title: 'Final Project',
      description: 'Build a complete computer vision application integrating all learned concepts',
      link: 'https://forms.google.com/cv-final'
    }
  ];

  return (
    <TrackLayout
      title="Computer Vision Track"
      description="Master Linux, Python programming, and computer vision techniques through hands-on projects"
      tasks={tasks}
    />
  );
};

export default ComputerVision;