import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaFilm } from 'react-icons/fa';

const MediaCard = ({ 
  id, 
  title, 
  imagePath, 
  year, 
  rating, 
  type = 'movie', // 'movie' or 'series'
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <Link 
        to={`/${type}/${id}`} 
        className={`bg-[#181828] rounded-xl overflow-hidden shadow-lg flex flex-col ${className}`}
      >
        {imagePath ? (
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.img
              src={`https://image.tmdb.org/t/p/w500${imagePath}`}
              alt={title}
              className="w-full h-72 object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ) : (
          <div className="w-full h-72 bg-gray-800 flex items-center justify-center text-gray-400">
            <FaFilm size={48} />
          </div>
        )}
        <motion.div 
          className="p-4 flex-1 flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <h2 className="text-lg font-semibold text-white mb-1 line-clamp-2">{title}</h2>
            <div className="text-gray-400 text-sm mb-2">{year || 'N/A'}</div>
          </div>
          <motion.div 
            className="mt-auto text-yellow-400 font-bold flex items-center gap-1"
            whileHover={{ scale: 1.1 }}
          >
            <FaStar /> {rating?.toFixed(1)}
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default MediaCard; 