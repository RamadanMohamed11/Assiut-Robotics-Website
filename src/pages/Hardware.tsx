import React from 'react';
import TrackLayout from '../components/TrackLayout';

const Hardware = () => {
  const tasks = [
    {
      id: 1,
      title: 'Circuits',
      description: 'Learn circuit analysis, components, and design principles',
      link: 'https://forms.gle/hardware-circuits'
    },
    {
      id: 2,
      title: 'PCB Design',
      description: 'Learn PCB design principles, schematic capture, and board layout techniques',
      link: 'https://forms.gle/hardware-pcb'
    },
    {
      id: 3,
      title: 'Electronics',
      description: 'Master electronic components, circuit analysis, and troubleshooting',
      link: 'https://forms.gle/hardware-electronics'
    },
    {
      id: 4,
      title: 'Devices',
      description: 'Work with various electronic devices, sensors, and integration techniques',
      link: 'https://forms.gle/hardware-devices'
    },
    {
      id: 5,
      title: 'Digital Electronics',
      description: 'Study digital logic design, sequential circuits, and digital systems',
      link: 'https://forms.gle/hardware-digital'
    },
    {
      id: 6,
      title: 'Final Project',
      description: 'Design and build a complete hardware project incorporating all learned concepts',
      link: 'https://forms.gle/hardware-final'
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

export default Hardware