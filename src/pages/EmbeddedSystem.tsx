import React from 'react';
import TrackLayout from '../components/TrackLayout';

const EmbeddedSystem = () => {
  const tasks = [
    {
      id: 1,
      title: 'C Programming',
      description: 'Learn C programming fundamentals, pointers, memory management, and embedded concepts',
      link: 'https://forms.google.com/embedded-c'
    },
    {
      id: 2,
      title: 'Electronics',
      description: 'Study electronic components, circuit analysis, and basic electronics principles',
      link: 'https://forms.google.com/embedded-electronics'
    },
    {
      id: 3,
      title: 'Arduino',
      description: 'Master Arduino programming, sensors, actuators, and real-time applications',
      link: 'https://forms.google.com/embedded-arduino'
    },
    {
      id: 4,
      title: 'Devices',
      description: 'Work with various electronic devices, sensors, and communication protocols',
      link: 'https://forms.google.com/embedded-devices'
    },
    {
      id: 5,
      title: 'Digital Electronics',
      description: 'Learn digital logic, combinational and sequential circuits',
      link: 'https://forms.google.com/embedded-digital'
    },
    {
      id: 6,
      title: 'Final Project',
      description: 'Develop a complete embedded system project integrating all learned concepts',
      link: 'https://forms.google.com/embedded-final'
    }
  ];

  return (
    <TrackLayout
      title="Embedded Systems Track"
      description="Master embedded systems development through comprehensive training in C programming, electronics, and microcontroller applications"
      tasks={tasks}
    />
  );
};

export default EmbeddedSystem;