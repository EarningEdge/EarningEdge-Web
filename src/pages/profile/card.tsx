import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={` z-10 relative bg-darkBg rounded-lg shadow ${className} border-darkStroke border-[0.4px] overflow-hidden`}>
    {children}
    </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-4  ${className} text-white text-light`}>{children}</div>
);

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}  text-white overflow-hidden`}>{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-light ${className}  text-white`}>{children}</h3>
);
