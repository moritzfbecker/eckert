import React from 'react';
import clsx from 'clsx';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Container Component
 *
 * Provides consistent max-width and padding for content
 */
export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  size = 'lg',
}) => {
  const sizeClasses = {
    sm: 'max-w-4xl',      // 896px - Reading width
    md: 'max-w-5xl',      // 1024px - Narrow content
    lg: 'max-w-7xl',      // 1280px - Standard content
    xl: 'max-w-[1440px]', // 1440px - Wide content
    full: 'max-w-full',   // No max-width
  };

  return (
    <div
      className={clsx(
        'mx-auto',
        'px-6 md:px-8 lg:px-12',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
};
