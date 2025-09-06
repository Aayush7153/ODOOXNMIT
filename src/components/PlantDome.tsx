import React, { useEffect, useState } from 'react';

interface PlantDomeProps {
  className?: string;
  growthStage?: number;
  animationState?: 'idle' | 'transitioning' | 'active';
}

export const PlantDome: React.FC<PlantDomeProps> = ({ 
  className, 
  growthStage = 1, 
  animationState = 'idle' 
}) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);
  const [plantStage, setPlantStage] = useState<'sprout' | 'grown'>('sprout');

  useEffect(() => {
    // Generate sparkles around plant inside dome
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60, // Keep sparkles within dome area around plant
        y: 25 + Math.random() * 50, // Focus around plant area
        delay: Math.random() * 2 + i * 0.25, // Staggered timing
        size: 4 + Math.random() * 2 // Size: 4–6px
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 8000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Smart Animate: Frame A → Frame B transition
    // After Delay: 1500ms, Duration: 3000ms, Easing: Ease In & Out, Loop: Enabled
    const animationCycle = () => {
      // Frame A: Small sprout
      setPlantStage('sprout');
      
      setTimeout(() => {
        // Frame B: Taller plant
        setPlantStage('grown');
        
        setTimeout(() => {
          // Loop back to Frame A
          animationCycle();
        }, 3000); // Duration: 3000ms
      }, 1500); // After Delay: 1500ms
    };

    if (animationState === 'active') {
      animationCycle();
    }
  }, [animationState]);

  return (
    <div className={`figma-plant-container-group smart-animate-plant-dome ${animationState} ${className || ''}`}>
      {/* Glass Dome */}
      <div className="glass-dome figma-dome-shadow smart-animate-dome">
        {/* Dome Effects */}
        <div className="dome-outer-glow"></div>
        <div className="dome-reflection"></div>
        <div className="dome-highlight"></div>
        <div className="dome-inner-shadow"></div>
        
        {/* Plant Container - Center inside dome */}
        <div className="plant-container">
          {/* Soil Base - Ellipse, Fill: #5D4037, Bottom of dome, behind plant */}
          <div className="soil-base"></div>
          
          {/* PlantSprout Group - Stem only (no leaves) */}
          <div className={`plant-sprout-group ${plantStage}`}>
            {/* Stem - Stroke: #388E3C, Width: 2px */}
            <div className="plant-stem"></div>
            
            {/* Simple plant bulb at top instead of leaves */}
            <div className="plant-bulb"></div>
          </div>
        </div>
        
        {/* Sparkles - Small white cross/dot shapes, Opacity: 0.3, Size: 4–6px */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="plant-sparkle"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              '--sparkle-size': `${sparkle.size}px`
            }}
          >
            <div className="sparkle-dot"></div>
          </div>
        ))}
      </div>
      
      {/* Dome Base */}
      <div className="dome-base figma-base-positioning"></div>
    </div>
  );
};