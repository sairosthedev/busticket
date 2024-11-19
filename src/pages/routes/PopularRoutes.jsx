import React from 'react';
import { FaMapMarkerAlt, FaRoute, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PopularRoutes = () => {
  const popularRoutes = [
    { from: 'Harare', to: 'Bulawayo', price: 50, duration: '5h 30m' },
    { from: 'Victoria Falls', to: 'Harare', price: 80, duration: '8h' },
    { from: 'Harare', to: 'Cape Town', price: 200, duration: '24h' },
    // Add more routes
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Popular Routes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutes.map((route, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-violet-600" />
                  <span>{route.from}</span>
                </div>
                <FaRoute className="text-violet-600" />
                <div className="flex items-center space-x-2">
                  <span>{route.to}</span>
                  <FaMapMarkerAlt className="text-violet-600" />
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-violet-600" />
                  <span>{route.duration}</span>
                </div>
                <span className="text-xl font-bold">${route.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularRoutes; 