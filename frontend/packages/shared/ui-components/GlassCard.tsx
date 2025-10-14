import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  gradient?: boolean;
}

/**
 * Glass Card Component (Porsche-inspired Glassmorphism)
 *
 * Perfect for modern, premium card designs
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  className,
  children,
  hover = true,
  gradient = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={hover ? { scale: 1.02 } : {}}
      className={clsx(
        'bg-white/5',
        'backdrop-blur-md',
        'border border-white/10',
        'rounded-lg',
        'p-8',
        hover && 'hover:bg-white/10 hover:border-white/20',
        gradient && 'hover:shadow-apple-glow',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
