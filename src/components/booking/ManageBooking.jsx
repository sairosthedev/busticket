import React, { useState } from 'react';
import { FaTicketAlt, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { supabase } from '../../url/supabaseClient';

const ManageBooking = () => {
  const [bookingReference, setBookingReference] = useState('');
  const [booking, setBooking] = useState(null);

  const handleFetchBooking = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*, buses(*)')
        .eq('reference', bookingReference)
        .single();

      if (error) throw error;
      setBooking(data);
    } catch (error) {
      console.error('Error fetching booking:', error);
      alert('Booking not found');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Manage My Booking</h2>
      
      <form onSubmit={handleFetchBooking} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={bookingReference}
            onChange={(e) => setBookingReference(e.target.value)}
            placeholder="Enter booking reference"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-violet-600"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-violet-600"
          >
            <FaTicketAlt />
          </button>
        </div>
      </form>

      {booking && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg mb-2">Booking Details</h3>
            <p>Reference: {booking.reference}</p>
            <p>Status: {booking.status}</p>
            <p>Total Price: ${booking.total_price}</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg mb-2">Journey Details</h3>
            <p>From: {booking.buses.origin}</p>
            <p>To: {booking.buses.destination}</p>
            <p>Date: {new Date(booking.buses.departure_time).toLocaleDateString()}</p>
            <p>Time: {new Date(booking.buses.departure_time).toLocaleTimeString()}</p>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="flex items-center space-x-2 text-violet-600 hover:text-violet-700">
              <FaPencilAlt />
              <span>Modify</span>
            </button>
            <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
              <FaTimes />
              <span>Cancel</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ManageBooking; 