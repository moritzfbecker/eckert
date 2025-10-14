import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}

      <input
        className={clsx(
          'w-full px-4 py-3',
          'bg-white/5 backdrop-blur-sm',
          'border border-white/20',
          'rounded-md',
          'text-white placeholder-gray-500',
          'focus:bg-white/10',
          'focus:border-white/40',
          'focus:outline-none',
          'focus:ring-2 focus:ring-pink-500/50',
          'transition-all duration-300',
          error && 'border-red-500 focus:ring-red-500/50',
          props.disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
