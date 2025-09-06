import { useEffect } from 'react';

interface FloatingLeafProps {
  delay?: number;
  duration?: number;
  startPosition?: { x: number; y: number };
  intensity?: 'low' | 'medium' | 'high';
  animationState?: 'idle' | 'active';
  size?: number;
}

export function FloatingLeaf({ 
  delay = 1000, 
  duration = 2000, 
  startPosition = { x: 30, y: 40 },
  intensity = 'medium',
  animationState = 'active',
  size = 20
}: FloatingLeafProps) {
  useEffect(() => {
    // Smart Animate initialization for floating leaves
    const leafElement = document.querySelector('.smart-animate-floating-leaf');
    if (leafElement) {
      (leafElement as HTMLElement).style.setProperty('--smart-animate-delay', `${delay}ms`);
      (leafElement as HTMLElement).style.setProperty('--smart-animate-duration', `${duration}ms`);
    }
  }, [delay, duration]);

  const intensityClasses = {
    low: 'opacity-40 scale-75',
    medium: 'opacity-60 scale-100',
    high: 'opacity-80 scale-125'
  };

  return (
    <div 
      className={`floating-leaf smart-animate-floating-leaf figma-smart-animate ${animationState === 'active' ? 'smart-animate-active' : ''}`}
      style={{
        '--start-x': `${startPosition.x}%`,
        '--start-y': `${startPosition.y}%`,
        '--animation-delay': `${delay}ms`,
        '--animation-duration': `${duration}ms`
      } as React.CSSProperties}
    >
      <div className={`leaf-shape-floating ${intensityClasses[intensity]}`}>
        {/* Minimalist Leaf Icon Container - 48x48px with 12px radius */}
        <div 
          className="leaf-icon-floating"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0C2500', // Dark green background
            borderRadius: '12px', // 12px corner radius
            position: 'relative',
            boxShadow: '0 2px 8px rgba(12, 37, 0, 0.4)'
          }}
        >
          {/* Minimalist Leaf Symbol - Tilted Right */}
          <div 
            className="leaf-symbol-minimalist"
            style={{
              width: `${size * 0.5}px`, // Half the container size
              height: `${size * 0.33}px`, // Proportional height
              backgroundColor: '#3CB44A', // Light green fill
              borderRadius: '0 100% 0 100%', // Classic leaf shape
              transform: 'rotate(15deg)', // Tilted right
              position: 'relative',
              filter: 'drop-shadow(0 1px 2px rgba(12, 37, 0, 0.3))'
            }}
          >
            {/* Leaf Vein Detail */}
            <div 
              className="leaf-vein-detail"
              style={{
                position: 'absolute',
                top: '50%',
                left: '15%',
                width: '70%',
                height: '1px',
                backgroundColor: '#0C2500', // Dark green vein
                transform: 'translateY(-50%)',
                opacity: 0.6
              }}
            />
            
            {/* Subtle Highlight */}
            <div 
              className="leaf-highlight"
              style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '40%',
                height: '40%',
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.3), transparent)',
                borderRadius: '0 100% 0 100%',
                filter: 'blur(1px)'
              }}
            />
          </div>
        </div>
        
        {/* Floating Glow Effect */}
        <div 
          className="leaf-glow-floating"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${size * 1.5}px`,
            height: `${size * 1.5}px`,
            background: 'radial-gradient(circle, rgba(60, 180, 74, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(4px)',
            animation: 'leafGlowFloating 2s ease-in-out infinite',
            zIndex: -1
          }}
        />
      </div>
    </div>
  );
}