import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'solid',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'flex items-center justify-center rounded focus:outline-none';
  const variantStyles =
    variant === 'outline' ? 'border border-gray-300 text-gray-700' : 'bg-blue-600 text-white';
  const sizeStyles = size === 'sm' ? 'px-2 py-1 text-sm' : size === 'lg' ? 'px-4 py-2 text-lg' : 'px-3 py-2';

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}>
      {children}
    </button>
  );
};
