import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  hover = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02, boxShadow: '0 0 25px rgba(236,72,153,0.3)' } : {}}
      className={clsx(
        'bg-black text-white rounded-lg p-6 shadow-subtle',
        'hover:shadow-elevated',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
