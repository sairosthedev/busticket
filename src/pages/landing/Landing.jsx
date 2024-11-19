import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBus, FaRoute, FaClock, FaShieldAlt, FaArrowRight, FaCheck } from 'react-icons/fa';
import Bus2 from "../../assets/bus5.png";
import BgImage1 from "../../assets/bg1.jpg";
import BgImage2 from "../../assets/bg2.jpg";
import BgImage3 from "../../assets/bg3.jpg";

const Landing = () => {
  const features = [
    {
      icon: FaBus,
      title: 'Modern Fleet',
      description: 'Experience comfort with our modern bus fleet'
    },
    {
      icon: FaRoute,
      title: 'Multiple Routes',
      description: 'Connecting major cities with convenient routes'
    },
    {
      icon: FaClock,
      title: 'Real-time Tracking',
      description: 'Track your bus location in real-time'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure Booking',
      description: 'Safe and secure online booking system'
    }
  ];

  const benefits = [
    'Easy online booking system',
    'Real-time bus tracking',
    '24/7 Customer support',
    'Comfortable seating',
    'Professional drivers',
    'Regular sanitization'
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Images with Parallax Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${BgImage1})`,
                filter: 'brightness(0.3)'
              }}
            />
          </motion.div>
          
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          {/* Animated Overlay Pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-block">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 text-violet-400"
                >
                  🚀 The Future of Bus Travel
                </motion.div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold">
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">
                  MS Coaches
                </span>
              </h1>

              <p className="text-xl text-gray-300">
                Your trusted partner for comfortable and reliable bus travel across the country.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white px-8 py-3 rounded-sm hover:opacity-90 transition duration-300"
                >
                  Get Started
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-3 rounded-sm hover:bg-white/5 transition duration-300"
                >
                  Create Account
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <FaCheck className="text-violet-500" />
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block relative"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <img 
                  src={Bus2} 
                  alt="Modern Bus" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </motion.div>
              
              {/* Decorative Elements */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute top-1/4 right-1/4 w-32 h-32 bg-violet-500 rounded-full blur-[100px]"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-violet-400 rounded-full blur-[120px]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section with Different Background */}
      <div className="relative py-32">
        {/* Background for Features Section */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${BgImage2})`,
              filter: 'brightness(0.1)'
            }}
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl font-bold">
              Why Choose{' '}
              <span className="text-violet-500">MS Coaches</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the perfect blend of comfort, reliability, and modern technology
              with our premium bus travel services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-black/50 p-8 rounded-sm border border-zinc-800 hover:border-violet-500/50 transition-colors duration-300"
              >
                <div className="mb-4 p-3 w-fit rounded-sm bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors duration-300">
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Section with Third Background */}
      <div className="relative py-32">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${BgImage3})`,
              filter: 'brightness(0.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Experience Premium Bus Travel?
            </h2>
            <p className="text-gray-400 mb-8">
              Join thousands of satisfied travelers who choose MS Coaches for their journey.
              Book your next trip today and experience the difference.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="bg-violet-600 text-white px-8 py-3 rounded-sm hover:bg-violet-700 transition-colors duration-300"
              >
                Book Now
              </Link>
              <Link
                to="/routes"
                className="border border-violet-600 text-violet-400 px-8 py-3 rounded-sm hover:bg-violet-600/10 transition-colors duration-300"
              >
                View Routes
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing; 