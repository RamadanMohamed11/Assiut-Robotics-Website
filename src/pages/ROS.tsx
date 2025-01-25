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
      title: 'Devices',
      description: 'Work with robotic devices, sensors, and actuators',
      link: 'https://forms.google.com/ros-devices'
    },
    {
      id: 4,
      title: 'Electronics',
      description: 'Study electronics fundamentals for robotics applications',
      link: 'https://forms.google.com/ros-electronics'
    },
    {
      id: 5,
      title: 'Digital Systems',
      description: 'Learn digital systems and interfacing for robotics',
      link: 'https://forms.google.com/ros-digital'
    },
    {
      id: 6,
      title: 'Final Project',
      description: 'Build a complete robotics project using ROS and Raspberry Pi',
      link: 'https://forms.google.com/ros-final'
    }
  ];

  return (
    <TrackLayout
      title="ROS & Raspberry Pi Track"
      description="Master robotics development through ROS, Python programming, and hardware integration"
      tasks={tasks}
    />
  );
};

export default ROS;