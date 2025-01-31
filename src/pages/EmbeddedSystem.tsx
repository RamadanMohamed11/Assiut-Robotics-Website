import React from 'react';
import TrackLayout from '../components/TrackLayout';

const EmbeddedSystem = () => {
  const tasks = [
    {
      id: 1,
      title: 'Circuits',
      description: 'Learn circuit analysis, components, and design principles',
      link: 'https://forms.gle/embedded-circuits'
    },
    {
      id: 2,
      title: 'C Programming',
      description: 'Learn C programming fundamentals, pointers, memory management, and embedded concepts',
      link: 'https://forms.gle/embedded-c'
    },
    {
      id: 3,
      title: 'Electronics',
      description: 'Study electronic components, circuit analysis, and basic electronics principles',
      link: 'https://forms.gle/embedded-electronics'
    },
    {
      id: 4,
      title: 'Arduino',
      description: 'Master Arduino programming, sensors, actuators, and real-time applications',
      link: 'https://forms.gle/embedded-arduino'
    },
    {
      id: 5,
      title: 'Embedded System (AVR)',
      description: 'Learn AVR microcontroller programming, peripherals, and bare-metal development',
      link: 'https://forms.gle/embedded-avr'
    },
    {
      id: 6,
      title: 'Devices',
      description: 'Work with various electronic devices, sensors, and communication protocols',
      link: 'https://forms.gle/embedded-devices'
    },
    {
      id: 7,
      title: 'Digital Electronics',
      description: 'Learn digital logic, combinational and sequential circuits',
      link: 'https://forms.gle/embedded-digital'
    },
    {
      id: 8,
      title: 'Final Project',
      description: 'Develop a complete embedded system project integrating all learned concepts',
      link: 'https://forms.gle/embedded-final'
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

export default EmbeddedSystem