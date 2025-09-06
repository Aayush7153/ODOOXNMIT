import React from 'react';
import { PlantDome } from './PlantDome';

export const EcoLoginBackground: React.FC = () => {
  return (
    <div className="eco-login-background">
      {/* Solid Dark Green Background */}
      <div className="solid-dark-green-container">
        <div className="solid-dark-green-background"></div>
        
        {/* Plant Dome - Centered */}
        <div className="plant-dome-positioning">
          <PlantDome 
            className="enhanced-plant-scaled"
            animationState="active"
          />
        </div>
        
        {/* Ambient sparkles around the dome */}
        <div className="ambient-sparkles">
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="sparkle sparkle-4"></div>
          <div className="sparkle sparkle-5"></div>
          <div className="sparkle sparkle-6"></div>
        </div>
      </div>
    </div>
  );
};