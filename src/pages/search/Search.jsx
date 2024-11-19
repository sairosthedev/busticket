import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa'

const Search = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCheckAvailability = () => {
    if (!formData.from || !formData.to || !formData.date || !formData.time || !formData.seats) {
      alert('Please fill in all fields')
      return
    }

    if (formData.from === formData.to) {
      alert('Origin and destination cannot be the same')
      return
    }

    if (parseInt(formData.seats) <= 0) {
      alert('Please enter a valid number of seats')
      return
    }

    navigate('/search-results', { state: formData })
  }

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0px 0px 8px rgba(167, 139, 250, 0.5)" },
  }

  return (
    <div className='w-full lg:px-28 md:px-16 sm:px-7 px-4 my-[8ch]'>
      <motion.div 
        className='w-full bg-black text-white rounded-sm border border-zinc-800'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='bg-white text-black p-6'>
          <h2 className='text-2xl font-bold'>Find Your Perfect Bus Trip</h2>
          <p className='text-zinc-600'>Enter your travel details below</p>
        </div>
        <div className='p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <motion.div className='relative' whileFocus="focus" variants={inputVariants}>
            <FaMapMarkerAlt className='absolute top-1/2 left-3 transform -translate-y-1/2 text-zinc-400' />
            <select 
              name="from" 
              value={formData.from}
              onChange={handleInputChange}
              className='w-full pl-10 pr-3 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300'
            >
              <option value="">From</option>
              <option value="Harare">Harare</option>
              <option value="Bulawayo">Bulawayo</option>
              <option value="Hwange">Hwange</option>
              <option value="Victoria Falls">Victoria Falls</option>
              <option value="Harare,Zimbabwe">Harare,Zimbabwe</option>
              <option value="Cape Town,SA">Cape Town,SA</option>
            </select>
          </motion.div>
          <motion.div className='relative' whileFocus="focus" variants={inputVariants}>
            <FaMapMarkerAlt className='absolute top-1/2 left-3 transform -translate-y-1/2 text-zinc-400' />
            <select 
              name="to" 
              value={formData.to}
              onChange={handleInputChange}
              className='w-full pl-10 pr-3 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300'
            >
              <option value="">To</option>
              <option value="Harare">Harare</option>
              <option value="Bulawayo">Bulawayo</option>
              <option value="Hwange">Hwange</option>
              <option value="Victoria Falls">Victoria Falls</option>
              <option value="Harare,Zimbabwe">Harare,Zimbabwe</option>
              <option value="Cape Town,SA">Cape Town,SA</option>
            </select>
          </motion.div>
          <motion.div className='relative' whileFocus="focus" variants={inputVariants}>
            <FaCalendarAlt className='absolute top-1/2 left-3 transform -translate-y-1/2 text-zinc-400' />
            <input 
              type="date" 
              name='date' 
              value={formData.date}
              onChange={handleInputChange}
              className='w-full pl-10 pr-3 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300'
            />
          </motion.div>
          <motion.div className='relative' whileFocus="focus" variants={inputVariants}>
            <FaClock className='absolute top-1/2 left-3 transform -translate-y-1/2 text-zinc-400' />
            <input 
              type="time" 
              name='time' 
              value={formData.time}
              onChange={handleInputChange}
              className='w-full pl-10 pr-3 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300'
            />
          </motion.div>
          <motion.div className='relative' whileFocus="focus" variants={inputVariants}>
            <FaUsers className='absolute top-1/2 left-3 transform -translate-y-1/2 text-zinc-400' />
            <input 
              type="number" 
              name="seats"
              placeholder="Number of seats" 
              value={formData.seats}
              onChange={handleInputChange}
              className='w-full pl-10 pr-3 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-sm focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300'
            />
          </motion.div>
          <motion.button 
            className="w-full px-6 py-3 bg-white text-black rounded-sm hover:bg-zinc-200 transition-all duration-300"
            onClick={handleCheckAvailability}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Check Availability 
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Search