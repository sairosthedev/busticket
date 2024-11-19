import React, { useState } from 'react';
import { FaBus, FaSearch, FaMapMarkerAlt, FaClock, FaExclamationCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TripTracker = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [tripStatus, setTripStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!trackingNumber.trim()) {
        throw new Error('Please enter a valid booking reference');
      }

      // Mock data - replace with actual API call
      setTripStatus({
        status: 'On Time',
        location: 'Bulawayo',
        nextStop: 'Harare',
        estimatedArrival: '2:30 PM',
        progress: 65,
        stops: [
          { name: 'Bulawayo', passed: true },
          { name: 'Gweru', passed: true },
          { name: 'Kwekwe', passed: false },
          { name: 'Kadoma', passed: false },
          { name: 'Harare', passed: false },
        ],
        updates: [
          { time: '08:00 AM', message: 'Bus departed from Bulawayo' },
          { time: '10:30 AM', message: 'Arrived at Gweru' },
          { time: '11:00 AM', message: 'Departed from Gweru' },
        ]
      });
    } catch (err) {
      setError(err.message);
      setTripStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Track Your Trip</h2>
      
      <form onSubmit={handleTrack} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter your booking reference"
            className="w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-violet-600 dark:bg-neutral-800 dark:border-neutral-700"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-violet-600 border-t-transparent rounded-full" />
            ) : (
              <FaSearch className="text-violet-600" />
            )}
          </button>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-red-500 text-sm flex items-center gap-1"
          >
            <FaExclamationCircle /> {error}
          </motion.p>
        )}
      </form>

      {tripStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Status Card */}
          <div className="flex items-center justify-between p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaBus className="text-2xl text-violet-600" />
              <div>
                <p className="font-semibold">Status: {tripStatus.status}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current Location: {tripStatus.location}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">Next Stop</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tripStatus.nextStop}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-violet-600 transition-all duration-500"
                style={{ width: `${tripStatus.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Bulawayo</span>
              <span>Harare</span>
            </div>
          </div>

          {/* Stops Timeline */}
          <div className="space-y-3">
            <h3 className="font-semibold">Route Stops</h3>
            <div className="space-y-2">
              {tripStatus.stops.map((stop, index) => (
                <div 
                  key={stop.name}
                  className={`flex items-center space-x-2 ${
                    stop.passed ? 'text-violet-600' : 'text-gray-400'
                  }`}
                >
                  <FaMapMarkerAlt />
                  <span>{stop.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Journey Updates */}
          <div className="space-y-3">
            <h3 className="font-semibold">Journey Updates</h3>
            <div className="space-y-2">
              {tripStatus.updates.map((update, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <FaClock className="mt-1 text-violet-600" />
                  <div>
                    <span className="font-medium">{update.time}</span>
                    <p className="text-gray-600 dark:text-gray-400">{update.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Estimated Arrival: {tripStatus.estimatedArrival}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TripTracker; 