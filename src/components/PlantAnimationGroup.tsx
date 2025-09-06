import { useEffect, useState, useRef } from 'react';
import { PlantDome } from './PlantDome';
// Removed FloatingLeaf imports - all leaf vector layers deleted
import { AmbientDot } from './AmbientDot';

interface PlantAnimationGroupProps {
  variant?: 'sprout' | 'grown';
  autoAnimate?: boolean;
  constraints?: 'center' | 'scale' | 'both';
  lockPosition?: boolean;
}

export function PlantAnimationGroup({ 
  variant = 'sprout',
  autoAnimate = true,
  constraints = 'both',
  lockPosition = true
}: PlantAnimationGroupProps) {
  const [currentVariant, setCurrentVariant] = useState<'sprout' | 'grown'>(variant);
  const [animationState, setAnimationState] = useState<'idle' | 'transitioning' | 'active'>('idle');
  const groupRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (autoAnimate) {
      // Figma Smart Animate: After Delay 1500ms → Sprout to Grown
      const initialDelay = setTimeout(() => {
        startPlantGrowthAnimation();
      }, 1500);

      return () => clearTimeout(initialDelay);
    }
  }, [autoAnimate]);

  const startPlantGrowthAnimation = () => {
    setAnimationState('transitioning');
    
    // Frame A → Frame B transition with Smart Animate
    setTimeout(() => {
      setCurrentVariant('grown');
      setAnimationState('active');
      
      // Duration: 3000ms, Easing: Ease In & Out, Loop: Enabled
      setTimeout(() => {
        // Loop back to sprout
        setCurrentVariant('sprout');
        setTimeout(() => {
          startPlantGrowthAnimation(); // Loop enabled
        }, 1000);
      }, 3000);
    }, 100);
  };

  useEffect(() => {
    // Apply Figma constraints and positioning
    if (groupRef.current && lockPosition) {
      const group = groupRef.current;
      
      // Lock position: Enabled
      group.style.position = 'relative';
      
      // Set constraints: Center, Scale
      if (constraints === 'center' || constraints === 'both') {
        group.style.display = 'flex';
        group.style.alignItems = 'center';
        group.style.justifyContent = 'center';
      }
      
      if (constraints === 'scale' || constraints === 'both') {
        group.style.transformOrigin = 'center';
      }
    }
  }, [constraints, lockPosition]);

  return (
    <div 
      ref={groupRef}
      className={`plant-animation-group figma-interactive-component-set ${animationState} variant-${currentVariant}`}
      style={{
        '--plant-variant': currentVariant,
        '--animation-state': animationState
      } as React.CSSProperties}
    >
      {/* Plant + Dome + Base */}
      <div className="plant-dome-base-container">
        <PlantDome 
          growthStage={currentVariant === 'sprout' ? 1 : 3}
          animationState={animationState}
        />
      </div>

      {/* Floating Elements Container - Only AmbientDots remain */}
      <div className="floating-elements-container">
        {/* All FloatingLeaf components removed - leaf vector layers deleted */}

        {/* AmbientDot Components - Keep for subtle ambient effects */}
        <AmbientDot 
          delay={1000}
          duration={2000}
          startPosition={{ x: 15, y: 50 }}
          size={2}
          opacity={0.3}
          animationState={animationState === 'active' ? 'active' : 'idle'}
        />
        <AmbientDot 
          delay={1250}
          duration={2000}
          startPosition={{ x: 85, y: 35 }}
          size={3}
          opacity={0.4}
          animationState={animationState === 'active' ? 'active' : 'idle'}
        />
        <AmbientDot 
          delay={1500}
          duration={2000}
          startPosition={{ x: 60, y: 75 }}
          size={4}
          opacity={0.5}
          animationState={animationState === 'active' ? 'active' : 'idle'}
        />
        <AmbientDot 
          delay={1750}
          duration={2000}
          startPosition={{ x: 30, y: 15 }}
          size={2}
          opacity={0.3}
          animationState={animationState === 'active' ? 'active' : 'idle'}
        />
        <AmbientDot 
          delay={1100}
          duration={2000}
          startPosition={{ x: 70, y: 90 }}
          size={3}
          opacity={0.4}
          animationState={animationState === 'active' ? 'active' : 'idle'}
        />
      </div>
    </div>
  );
}