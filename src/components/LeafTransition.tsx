import React, { useEffect, useState } from 'react';

interface LeafTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export const LeafTransition: React.FC<LeafTransitionProps> = ({ isActive, onComplete }) => {
  const [leaves, setLeaves] = useState<Array<{ id: number; delay: number; direction: number; size: number }>>([]);

  useEffect(() => {
    if (isActive) {
      // Generate random leaves
      const newLeaves = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        delay: Math.random() * 1000,
        direction: Math.random() > 0.5 ? 1 : -1,
        size: 0.8 + Math.random() * 0.6
      }));
      
      setLeaves(newLeaves);
      
      // Complete transition after animation
      const timer = setTimeout(() => {
        onComplete();
        setLeaves([]);
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="leaf-transition-overlay">
      <div className="transition-background"></div>
      
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="transition-leaf"
          style={{
            animationDelay: `${leaf.delay}ms`,
            '--direction': leaf.direction,
            '--size': leaf.size,
            left: `${Math.random() * 100}%`
          } as React.CSSProperties}
        >
          <div className="leaf-shape">
            <div className="leaf-vein"></div>
          </div>
        </div>
      ))}
      
      <div className="transition-fade"></div>
    </div>
  );
};