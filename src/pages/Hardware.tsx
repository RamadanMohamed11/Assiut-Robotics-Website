import React from 'react';
import TrackLayout from '../components/TrackLayout';

const Hardware = () => {
  const tasks = [
    {
      id: 1,
      title: 'PCB Design',
      description: 'Learn PCB design principles, schematic capture, and board layout techniques',
      link: 'https://forms.google.com/hardware-pcb'
    },
    {
      id: 2,
      title: 'Electronics',
      description: 'Master electronic components, circuit analysis, and troubleshooting',
      link: 'https://forms.google.com/hardware-electronics'
    },
    {
      id: 3,
      title: 'Devices',
      description: 'Work with various electronic devices, sensors, and integration techniques',
      link: 'https://forms.google.com/hardware-devices'
    },
    {
      id: 4,
      title: 'Digital Electronics',
      description: 'Study digital logic design, sequential circuits, and digital systems',
      link: 'https://forms.google.com/hardware-digital'
    },
    {
      id: 5,
      title: 'Final Project',
      description: 'Design and build a complete hardware project incorporating all learned concepts',
      link: 'https://forms.google.com/hardware-final'
    }
  ];

  return (
    <TrackLayout
      title="Hardware Track"
      description="Master hardware design through comprehensive training in PCB design, electronics, and digital systems"
      tasks={tasks}
    />
  );
};

export default Hardware;