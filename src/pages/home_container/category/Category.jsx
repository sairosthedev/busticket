import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Bus1 from "../../../assets/bus1.png"
import Bus2 from "../../../assets/bus.png"
import Bus3 from "../../../assets/bus3.png"

const CategoryItem = ({ image, title, link }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className='relative overflow-hidden rounded-lg shadow-xl transition-shadow hover:shadow-2xl'
    role="article"
  >
    <Link 
      to={link} 
      className='block focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2'
      aria-label={`View ${title} category`}
    >
      <motion.div
        className="relative h-80 bg-gradient-to-b from-zinc-800 to-zinc-900 p-8"
        initial={{ opacity: 0.9 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.img 
          src={image} 
          alt={`${title} transportation`} 
          className="w-full h-full object-contain drop-shadow-xl"
          initial={{ y: 0 }}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          loading="lazy"
        />
      </motion.div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-white text-center px-4 drop-shadow-lg">
          {title}
        </h2>
      </motion.div>
    </Link>
  </motion.div>
)

const Category = () => {
  const categories = [
    { 
      image: Bus1, 
      title: "Luxury Bus", 
      link: "/bus/luxury",
    },
    { 
      image: Bus2, 
      title: "City Shuttle", 
      link: "/bus/cityshuttle",
    },
    { 
      image: Bus3, 
      title: "Tour Bus", 
      link: "/bus/tour",
    },
  ]

  return (
    <section 
      className='w-full lg:px-28 md:px-16 sm:px-7 px-4 py-16'
      aria-label="Bus Categories"
    >
      <motion.div 
        className="w-full flex flex-col sm:flex-row items-center justify-between mb-12 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100">
          Explore Our <span className="text-violet-600 dark:text-violet-400">Categories</span>
        </h1>
        <Link 
          to="/bus" 
          className='group text-violet-600 hover:text-violet-700 dark:text-violet-400 
                     dark:hover:text-violet-300 transition duration-300 text-lg font-semibold
                     flex items-center gap-2'
          aria-label="View all bus categories"
        >
          View All 
          <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        {categories.map((category, index) => (
          <CategoryItem 
            key={category.title} 
            {...category} 
          />
        ))}
      </motion.div>
    </section>
  )
}

export default Category