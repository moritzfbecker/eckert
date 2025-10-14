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
        <label className="block text-sm font-medium text-black mb-2">
          {label}
        </label>
      )}

      <input
        className={clsx(
          'w-full px-4 py-3',
          'bg-white',
          'border border-black/20',
          'rounded-md',
          'text-black placeholder-black/40',
          'focus:bg-white',
          'focus:border-black/40',
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
        <p className="mt-2 text-sm text-black">
          {helperText}
        </p>
      )}
    </div>
  );
};
