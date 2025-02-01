import React from 'react';
import TrackLayout from '../components/TrackLayout';

const ROS = () => {
  const tasks = [
    {
      id: 'linux',
      title: 'Linux Commands',
      description: 'Master essential Linux commands, shell scripting, and system administration',
    },
    {
      id: 'python',
      title: 'Python Programming',
      description: 'Learn Python programming for robotics and ROS applications',
    },
    {
      id: 'ros2',
      title: 'ROS2',
      description: 'Learn ROS2 fundamentals, nodes, topics, services, and navigation',
    },
    {
      id: 'raspberry',
      title: 'Raspberry',
      description: 'Master Raspberry Pi setup, GPIO programming, and robotics integration',
    },
    {
      id: 'final',
      title: 'Final Project',
      description: 'Build a complete robotics project using ROS2 and Raspberry Pi',
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