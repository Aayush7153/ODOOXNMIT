import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';

interface InteractiveHeartProps {
  initialState?: boolean;
  onToggle?: (isFavorited: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const InteractiveHeart: React.FC<InteractiveHeartProps> = ({
  initialState = false,
  onToggle,
  size = 'md',
  className = ''
}) => {
  const [isFavorited, setIsFavorited] = useState(initialState);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isFavorited;
    setIsFavorited(newState);
    onToggle?.(newState);
  };

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${sizeClasses[size]} glass-card hover:bg-white/20 transition-all duration-200 ${className}`}
      onClick={handleClick}
    >
      <Heart 
        className={`${iconSizes[size]} transition-colors duration-200 ${
          isFavorited 
            ? 'text-red-500 fill-red-500' 
            : 'text-white hover:text-red-300'
        }`} 
      />
    </Button>
  );
};