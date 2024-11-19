import React from 'react';
import { FaWifi, FaPlug, FaToilet, FaLuggageCart, FaSuitcase, FaSnowflake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      icon: FaWifi,
      title: 'Free Wi-Fi',
      description: 'Stay connected throughout your journey with our complimentary Wi-Fi service'
    },
    {
      icon: FaPlug,
      title: 'Power Outlets',
      description: 'Keep your devices charged with convenient power outlets at every seat'
    },
    {
      icon: FaToilet,
      title: 'Clean Restrooms',
      description: 'Access to clean and well-maintained restrooms on board'
    },
    {
      icon: FaLuggageCart,
      title: 'Extra Luggage',
      description: 'Generous luggage allowance for your convenience'
    },
    {
      icon: FaSuitcase,
      title: 'Storage Space',
      description: 'Ample storage space for your carry-on items'
    },
    {
      icon: FaSnowflake,
      title: 'Air Conditioning',
      description: 'Climate controlled environment for your comfort'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <service.icon className="text-4xl text-violet-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services; 