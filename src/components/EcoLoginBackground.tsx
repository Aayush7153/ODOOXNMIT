import React, { useEffect, useRef, useState } from 'react';
import { Droplets, Leaf, RotateCcw } from 'lucide-react';

export const EcoLoginBackground: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>();
  const idleAnimationTimer = useRef<NodeJS.Timeout>();
  const [ecoIcons, setEcoIcons] = useState<Array<{ id: number; type: string; x: number; y: number; delay: number; opacity: number }>>([]);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    // Generate eco icons for left side only
    const generateEcoIcons = () => {
      const icons = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        type: ['leaf', 'droplet', 'recycle'][Math.floor(Math.random() * 3)],
        x: Math.random() * 50, // Only left 50% of screen
        y: Math.random() * 100,
        delay: Math.random() * 8000,
        opacity: 0.1 + Math.random() * 0.2
      }));
      setEcoIcons(icons);
    };

    generateEcoIcons();
    
    // Regenerate icons periodically
    const iconInterval = setInterval(() => {
      generateEcoIcons();
    }, 15000);

    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };

    const animateBackground = () => {
      if (backgroundRef.current) {
        const { x, y } = mousePosition.current;
        
        // Update CSS custom properties for mouse response
        backgroundRef.current.style.setProperty('--mouse-x', x.toString());
        backgroundRef.current.style.setProperty('--mouse-y', y.toString());
        
        // Enhanced parallax fireflies with smoother cursor following
        const fireflies = backgroundRef.current.querySelectorAll('.firefly-orb');
        fireflies.forEach((firefly, index) => {
          const element = firefly as HTMLElement;
          const depthClass = element.classList.contains('parallax-depth-1') ? 1 : 
                           element.classList.contains('parallax-depth-2') ? 2 : 
                           element.classList.contains('parallax-depth-3') ? 3 : 4;
          
          // Enhanced depth and intensity calculations
          const depthMultiplier = [1.5, 1.0, 0.6, 0.3][depthClass - 1];
          const intensity = 0.025 + (index * 0.008);
          
          // Smooth cursor following with enhanced responsiveness
          const cursorX = x * depthMultiplier * intensity * 35;
          const cursorY = y * depthMultiplier * intensity * 35;
          
          // Add subtle idle movement when not moving cursor
          const time = Date.now() * 0.001;
          const idleX = isIdle ? Math.sin(time * 0.5 + index) * 3 : 0;
          const idleY = isIdle ? Math.cos(time * 0.3 + index) * 2 : 0;
          
          element.style.transform = `translate(${cursorX + idleX}px, ${cursorY + idleY}px)`;
          element.classList.add('enhanced-parallax-orb');
        });
        
        // Enhanced eco icons with better parallax
        const ecoIcons = backgroundRef.current.querySelectorAll('.eco-icon');
        ecoIcons.forEach((icon, index) => {
          const element = icon as HTMLElement;
          const depth = 0.08 + (index % 4) * 0.12;
          const intensity = 0.02 + (index * 0.007);
          
          const cursorX = x * depth * intensity * 25;
          const cursorY = y * depth * intensity * 25;
          
          // Gentle idle sway
          const time = Date.now() * 0.001;
          const idleX = isIdle ? Math.sin(time * 0.4 + index * 0.5) * 2 : 0;
          const idleY = isIdle ? Math.cos(time * 0.6 + index * 0.3) * 1.5 : 0;
          
          element.style.transform = `translate(${cursorX + idleX}px, ${cursorY + idleY}px)`;
        });
        
        // Enhanced ambient glows with subtle cursor response
        const ambientGlows = backgroundRef.current.querySelectorAll('.ambient-glow');
        ambientGlows.forEach((glow, index) => {
          const element = glow as HTMLElement;
          const depth = 0.04 + (index * 0.02);
          
          const cursorX = x * depth * 12;
          const cursorY = y * depth * 12;
          
          // Very subtle idle breathing
          const time = Date.now() * 0.001;
          const idleScale = 1 + (isIdle ? Math.sin(time * 0.3 + index) * 0.02 : 0);
          
          element.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(${idleScale})`;
        });
      }
      
      animationFrame.current = requestAnimationFrame(animateBackground);
    };

    // Idle animation trigger after 2 seconds of no mouse movement
    const resetIdleTimer = () => {
      setIsIdle(false);
      if (idleAnimationTimer.current) {
        clearTimeout(idleAnimationTimer.current);
      }
      idleAnimationTimer.current = setTimeout(() => {
        setIsIdle(true);
      }, 2000);
    };

    let mouseTicking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseTicking) {
        updateMousePosition(e);
        resetIdleTimer(); // Reset idle state on mouse movement
        mouseTicking = true;
        requestAnimationFrame(() => {
          mouseTicking = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrame.current = requestAnimationFrame(animateBackground);
    resetIdleTimer(); // Start idle timer

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(iconInterval);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (idleAnimationTimer.current) {
        clearTimeout(idleAnimationTimer.current);
      }
    };
  }, []);

  return (
    <div ref={backgroundRef} className="eco-login-background">
      {/* Left Side Dynamic Background */}
      <div className="left-dynamic-section">
        {/* Smooth Green Gradient */}
        <div className="green-gradient-overlay"></div>
        
        {/* Floating Firefly Orbs with Enhanced Parallax */}
        <div className="fireflies-container">
          {Array.from({ length: 18 }, (_, i) => (
            <div key={i} className={`firefly-orb firefly-orb-${i + 1} parallax-depth-${(i % 3) + 1}`}>
              <div className="orb-glow"></div>
              <div className="orb-core"></div>
              <div className="orb-trail"></div>
            </div>
          ))}
        </div>
        
        {/* Additional Eco Particles */}
        <div className="eco-particles-container">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={`eco-particle eco-particle-${i + 1} parallax-depth-${(i % 4) + 1}`}>
              <div className="particle-glow"></div>
            </div>
          ))}
        </div>
        
        {/* Eco Icons */}
        <div className="eco-icons-container">
          {ecoIcons.map((icon) => (
            <div
              key={icon.id}
              className={`eco-icon eco-icon-${icon.type}`}
              style={{
                left: `${icon.x}%`,
                top: `${icon.y}%`,
                animationDelay: `${icon.delay}ms`,
                opacity: icon.opacity
              }}
            >
              {icon.type === 'leaf' && <Leaf size={16} />}
              {icon.type === 'droplet' && <Droplets size={14} />}
              {icon.type === 'recycle' && <RotateCcw size={15} />}
            </div>
          ))}
        </div>
        
        {/* Ambient Glow Effects */}
        <div className="ambient-glow-effects">
          <div className="ambient-glow ambient-glow-1"></div>
          <div className="ambient-glow ambient-glow-2"></div>
          <div className="ambient-glow ambient-glow-3"></div>
        </div>
      </div>
      
      {/* Right Side Static Background */}
      <div className="right-static-section">
        <div className="static-gradient-overlay"></div>
      </div>
    </div>
  );
};