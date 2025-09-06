import { useEffect, useState } from 'react';

interface AmbientDotProps {
  delay?: number;
  duration?: number;
  startPosition?: { x: number; y: number };
  size?: number;
  opacity?: number;
  animationState?: 'idle' | 'active';
}

export function AmbientDot({ 
  delay = 1000, 
  duration = 2000, 
  startPosition = { x: 70, y: 20 },
  size = 3,
  opacity = 0.3,
  animationState = 'active'
}: AmbientDotProps) {
  useEffect(() => {
    // Smart Animate initialization for ambient dots
    const dotElement = document.querySelector('.smart-animate-dot');
    if (dotElement) {
      (dotElement as HTMLElement).style.setProperty('--smart-animate-delay', `${delay}ms`);
      (dotElement as HTMLElement).style.setProperty('--smart-animate-duration', `${duration}ms`);
    }
  }, [delay, duration]);

  return (
    <div 
      className={`ambient-dot smart-animate-dot figma-smart-animate ${animationState === 'active' ? 'smart-animate-active' : ''}`}
      style={{
        '--start-x': `${startPosition.x}%`,
        '--start-y': `${startPosition.y}%`,
        '--animation-delay': `${delay}ms`,
        '--animation-duration': `${duration}ms`,
        '--dot-size': `${size}px`,
        '--dot-opacity': opacity
      } as React.CSSProperties}
    >
      <div className="dot-glow-floating"></div>
      <div className="dot-core-floating"></div>
    </div>
  );
}