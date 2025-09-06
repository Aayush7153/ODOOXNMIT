import React, { useState, useEffect } from 'react';

export const AnimatedLogo: React.FC = () => {
  const [animationState, setAnimationState] = useState('seed');

  useEffect(() => {
    const animationSequence = () => {
      setAnimationState('seed');
      
      setTimeout(() => setAnimationState('growing'), 500);
      setTimeout(() => setAnimationState('leaf'), 1500);
      setTimeout(() => setAnimationState('bounce'), 2000);
      setTimeout(() => setAnimationState('glow'), 2500);
      setTimeout(() => setAnimationState('complete'), 3500);
    };

    // Start animation immediately
    animationSequence();
    
    // Repeat every 6 seconds
    const interval = setInterval(animationSequence, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animated-logo-container">
      <div className={`logo-icon ${animationState}`}>
        {/* Seed Stage */}
        <div className="seed-stage">
          <div className="seed"></div>
        </div>
        
        {/* Growing Stage */}
        <div className="growing-stage">
          <div className="stem"></div>
          <div className="small-leaf"></div>
        </div>
        
        {/* Full Leaf Stage */}
        <div className="leaf-stage">
          <div className="full-stem"></div>
          <div className="full-leaf">
            <div className="leaf-vein"></div>
            <div className="leaf-vein leaf-vein-2"></div>
            <div className="leaf-vein leaf-vein-3"></div>
          </div>
        </div>
        
        {/* Glowing Aura */}
        <div className="glow-aura"></div>
      </div>
      
      <div className="logo-text">
        <span className="eco">Eco</span>
        <span className="finds">Finds</span>
      </div>
    </div>
  );
};