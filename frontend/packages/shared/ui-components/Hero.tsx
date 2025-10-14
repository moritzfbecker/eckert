import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface HeroProps {
  className?: string;
  children: React.ReactNode;
  gradient?: boolean;
}

/**
 * Hero Section Component
 *
 * Full-screen hero section with optional gradient background
 */
export const Hero: React.FC<HeroProps> = ({
  className,
  children,
  gradient = true,
}) => {
  return (
    <section
      className={clsx(
        'relative',
        'min-h-screen',
        'flex items-center',
        'px-6 md:px-12 lg:px-24',
        'py-20 md:py-32',
        'overflow-hidden',
        className
      )}
    >
      {/* Background Gradient (subtle) */}
      {gradient && (
        <div className="
          absolute inset-0
          bg-subtle-gradient
          opacity-30
        " />
      )}

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
};

/**
 * Hero Title Component
 */
export const HeroTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={clsx(
      'text-5xl md:text-6xl lg:text-7xl',
      'font-bold leading-tight',
      'text-black',
      'mb-6',
      className
    )}
  >
    {children}
  </motion.h1>
);

/**
 * Hero Subtitle Component
 */
export const HeroSubtitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className={clsx(
      'text-xl md:text-2xl',
      'text-black',
      'mb-12',
      'max-w-2xl',
      className
    )}
  >
    {children}
  </motion.p>
);

/**
 * Hero Actions Component
 */
export const HeroActions: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className={clsx(
      'flex flex-col sm:flex-row gap-4',
      className
    )}
  >
    {children}
  </motion.div>
);
