import React from 'react';
import TrackLayout from '../components/TrackLayout';

const ROS = () => {
  const tasks = [
    {
      id: 1,
      title: 'Linux Commands',
      description: 'Master essential Linux commands, shell scripting, and system administration',
      link: 'https://forms.google.com/ros-linux'
    },
    {
      id: 2,
      title: 'Python Programming',
      description: 'Learn Python programming for robotics and ROS applications',
      link: 'https://forms.google.com/ros-python'
    },
    {
      id: 3,
      title: 'ROS2',
      description: 'Learn ROS2 fundamentals, nodes, topics, services, and navigation',
      link: 'https://forms.google.com/ros-ros2'
    },
    {
      id: 4,
      title: 'Raspberry',
      description: 'Master Raspberry Pi setup, GPIO programming, and robotics integration',
      link: 'https://forms.google.com/ros-raspberry'
    },
    {
      id: 5,
      title: 'Final Project',
      description: 'Build a complete robotics project using ROS2 and Raspberry Pi',
      link: 'https://forms.google.com/ros-final'
    }
  ];

  return (
    <TrackLayout
      title="ROS & Raspberry Track"
      description="Master robotics development through ROS2, Raspberry Pi, and Python programming"
      tasks={tasks}
    />
  );
};

export default ROS;