import React, { useEffect, useState, useRef } from 'react';

export const PlantDome: React.FC = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [growthStage, setGrowthStage] = useState<'sprout' | 'growing' | 'full'>('sprout');
  const domeRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Generate sparkle positions around the dome periphery
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80, // Keep sparkles within dome area
        y: 10 + Math.random() * 80,
        delay: Math.random() * 2 + i * 0.3 // Staggered timing
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 4000);

    // Plant Growth Animation Timeline
    const growthTimeline = () => {
      // Stage 1: Small sprout (initial)
      setGrowthStage('sprout');
      
      // Stage 2: Growing phase after 1500ms
      setTimeout(() => {
        setGrowthStage('growing');
      }, 1500);
      
      // Stage 3: Full plant after 3000ms total
      setTimeout(() => {
        setGrowthStage('full');
      }, 4500);
      
      // Optional: Loop back to sprout after full cycle (12 seconds total)
      setTimeout(() => {
        growthTimeline(); // Restart the cycle
      }, 12000);
    };

    // Start the growth animation after a brief delay
    setTimeout(growthTimeline, 1000);
    

    // Enhanced cursor-responsive dome effects
    const handleMouseMove = (e: MouseEvent) => {
      if (domeRef.current) {
        const rect = domeRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from dome center
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        
        mousePosition.current = { x: deltaX, y: deltaY };
        
        // Apply subtle parallax to dome elements
        const dome = domeRef.current;
        const reflection = dome.querySelector('.dome-reflection') as HTMLElement;
        const highlight = dome.querySelector('.dome-highlight') as HTMLElement;
        const plant = dome.querySelector('.plant') as HTMLElement;
        
        if (reflection) {
          reflection.style.transform = `translate(${deltaX * 5}px, ${deltaY * 3}px)`;
        }
        
        if (highlight) {
          highlight.style.transform = `translate(${deltaX * 8}px, ${deltaY * 6}px)`;
        }
        
        if (plant) {
          plant.style.transform = `translate(${deltaX * 2}px, ${deltaY * 1}px)`;
        }
        
        // Enhanced leaf swaying based on cursor position
        const leaves = dome.querySelectorAll('.leaf');
        leaves.forEach((leaf, index) => {
          const element = leaf as HTMLElement;
          const swayX = deltaX * (2 + index * 0.5);
          const swayY = deltaY * (1 + index * 0.3);
          element.style.setProperty('--cursor-sway-x', `${swayX}deg`);
          element.style.setProperty('--cursor-sway-y', `${swayY}deg`);
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="figma-plant-container-group">
      {/* PlantContainer - Grouped with 125% Scale */}
      {/* Glass Dome with Enhanced Inner Shadow */}
      <div ref={domeRef} className="glass-dome cursor-responsive-dome figma-dome-shadow">
        <div className="dome-reflection"></div>
        <div className="dome-highlight"></div>
        <div className="dome-inner-shadow"></div>
        
        {/* Plant Inside */}
        <div className="plant-container">
          {/* Soil Base */}
          <div className="soil"></div>
          
          {/* Animated Growing Plant */}
          <div className={`plant plant-growth-stage-${growthStage}`}>
            {/* Enhanced Main Stem with Growth Animation */}
            <div className={`main-stem gentle-stem-sway ${growthStage === 'sprout' ? 'stem-small' : growthStage === 'growing' ? 'stem-medium' : 'stem-full'}`}></div>
            
            {/* Progressive Leaves - Enhanced Organic Swaying */}
            {growthStage !== 'sprout' && (
              <>
                <div className="leaf leaf-1 organic-sway plant-growth-leaf">
                  <div className="leaf-detail"></div>
                  <div className="leaf-shimmer"></div>
                </div>
                <div className="leaf leaf-2 organic-sway plant-growth-leaf">
                  <div className="leaf-detail"></div>
                  <div className="leaf-shimmer"></div>
                </div>
              </>
            )}
            
            {growthStage === 'full' && (
              <>
                <div className="leaf leaf-3 organic-sway plant-growth-leaf-extra">
                  <div className="leaf-detail"></div>
                  <div className="leaf-shimmer"></div>
                </div>
                <div className="leaf leaf-4 organic-sway plant-growth-leaf-extra">
                  <div className="leaf-detail"></div>
                  <div className="leaf-shimmer"></div>
                </div>
                <div className="leaf leaf-5 organic-sway plant-growth-leaf-extra">
                  <div className="leaf-detail"></div>
                  <div className="leaf-shimmer"></div>
                </div>
                <div className="leaf leaf-6 organic-sway plant-growth-leaf-extra">
                  <div className="leaf-detail"></div>
                  <div className="leaf-shimmer"></div>
                </div>
                
                {/* Small Branches - Only appear in full stage */}
                <div className="branch branch-1 plant-growth-branch"></div>
                <div className="branch branch-2 plant-growth-branch"></div>
              </>
            )}
          </div>
          
          {/* Roots (visible through soil) */}
          <div className="roots">
            <div className="root root-1"></div>
            <div className="root root-2"></div>
            <div className="root root-3"></div>
          </div>
        </div>
        
        {/* Enhanced Twinkling Stars with More Variation */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="enhanced-sparkle twinkling-star"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              '--twinkle-duration': `${2 + Math.random() * 2}s`
            }}
          >
            <div className="sparkle-star enhanced-star"></div>
          </div>
        ))}
        
        {/* Additional Floating Green Particles */}
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="floating-eco-particle"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.8}s`,
              '--particle-duration': `${4 + i}s`
            }}
          >
            <div className="eco-particle-glow"></div>
          </div>
        ))}
      </div>
      
      {/* Dome Base - Aligned Horizontally to Parent, Flush Beneath Dome */}
      <div className="dome-base figma-base-positioning"></div>
    </div>
  );
};