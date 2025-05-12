import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ 
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        opacity: { duration: 0.3 }
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 