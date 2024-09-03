import React from 'react';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ className = '', src, alt = 'Avatar' }) => (
  <div className={`rounded-full overflow-hidden ${className}`}>
    <img src={src || '/fallback_profile.jpg'} alt={alt} className="object-cover" />
  </div>
);
