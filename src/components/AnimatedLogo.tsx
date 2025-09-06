import React, { useState, useEffect } from 'react';

export const AnimatedLogo: React.FC = () => {
  const [stage, setStage] = useState<'seed' | 'growing' | 'leaf' | 'bounce' | 'glow' | 'complete'>('seed');

  useEffect(() => {
    const sequence = [
      { stage: 'seed', duration: 1000 },
      { stage: 'growing', duration: 1000 },
      { stage: 'leaf', duration: 800 },
      { stage: 'bounce', duration: 600 },
      { stage: 'glow', duration: 1000 },
      { stage: 'complete', duration: 0 }
    ];

    let totalDelay = 0;
    sequence.forEach(({ stage, duration }) => {
      setTimeout(() => {
        setStage(stage as any);
      }, totalDelay);
      totalDelay += duration;
    });
  }, []);

  return (
    <div className="animated-logo-container">
      <div className={`logo-icon ${stage}`}>
        {/* Seed stage */}
        <div className="seed-stage">
          <div className="seed"></div>
        </div>

        {/* Growing stage */}
        <div className="growing-stage">
          <div className="stem"></div>
          <div className="small-leaf"></div>
        </div>

        {/* Full leaf stage */}
        <div className="leaf-stage">
          <div className="full-stem"></div>
          <div className="full-leaf">
            <div className="leaf-vein"></div>
            <div className="leaf-vein leaf-vein-2"></div>
            <div className="leaf-vein leaf-vein-3"></div>
          </div>
        </div>

        {/* Glow aura */}
        <div className="glow-aura"></div>
      </div>

      <div className="logo-text">
        <span className="eco">Eco</span>
        <span className="finds">Finds</span>
      </div>
    </div>
  );
};