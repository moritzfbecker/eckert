import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'darker';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

/**
 * Section Component
 *
 * Provides consistent section spacing and backgrounds
 */
export const Section: React.FC<SectionProps> = ({
  className,
  children,
  variant = 'default',
  spacing = 'md',
  animate = true,
}) => {
  const variantClasses = {
    default: 'bg-eckert-black',
    dark: 'bg-gray-950',
    darker: 'bg-gray-900',
  };

  const spacingClasses = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
    xl: 'py-24 md:py-40',
  };

  const Component = animate ? motion.section : 'section';
  const animationProps = animate
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.6 },
        viewport: { once: true, amount: 0.1 },
      }
    : {};

  return (
    <Component
      className={clsx(
        'w-full',
        variantClasses[variant],
        spacingClasses[spacing],
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  );
};
