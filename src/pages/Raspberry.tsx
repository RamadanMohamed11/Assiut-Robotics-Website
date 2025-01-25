import React from 'react';
import TrackLayout from '../components/TrackLayout';

const Raspberry = () => {
  const tasks = [
    {
      id: 1,
      title: 'Task 1: Raspberry Pi Setup',
      description: 'Set up Raspberry Pi OS and basic configurations',
      link: 'https://forms.google.com/raspberry-task1'
    },
    {
      id: 2,
      title: 'Task 2: IoT Project',
      description: 'Create a simple IoT project using Raspberry Pi',
      link: 'https://forms.google.com/raspberry-task2'
    }
  ];

  return (
    <TrackLayout
      title="Raspberry Pi Track"
      description="Learn single-board computer programming and IoT development"
      tasks={tasks}
    />
  );
};

export default Raspberry;