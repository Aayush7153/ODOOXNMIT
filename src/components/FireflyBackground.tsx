import React, { useEffect, useRef } from 'react';

export const FireflyBackground: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const scrollPosition = useRef(0);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };

    const updateScrollPosition = () => {
      scrollPosition.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };

    const animateBackground = () => {
      if (backgroundRef.current) {
        const { x, y } = mousePosition.current;
        const scrollProgress = scrollPosition.current;
        
        backgroundRef.current.style.setProperty('--mouse-x', x.toString());
        backgroundRef.current.style.setProperty('--mouse-y', y.toString());
        backgroundRef.current.style.setProperty('--scroll-progress', scrollProgress.toString());
        
        // Animate fireflies based on cursor movement
        const fireflies = backgroundRef.current.querySelectorAll('.firefly');
        fireflies.forEach((firefly, index) => {
          const element = firefly as HTMLElement;
          const intensity = 0.02 + (index * 0.005);
          
          const cursorX = x * intensity * 30;
          const cursorY = y * intensity * 30;
          const scrollX = scrollProgress * intensity * 50;
          const scrollY = scrollProgress * intensity * -80;
          
          element.style.transform = `translate(${cursorX + scrollX}px, ${cursorY + scrollY}px)`;
        });
      }
      
      animationFrame.current = requestAnimationFrame(animateBackground);
    };

    let mouseTicking = false;
    let scrollTicking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseTicking) {
        updateMousePosition(e);
        mouseTicking = true;
        requestAnimationFrame(() => {
          mouseTicking = false;
        });
      }
    };

    const handleScroll = () => {
      if (!scrollTicking) {
        updateScrollPosition();
        scrollTicking = true;
        requestAnimationFrame(() => {
          scrollTicking = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrame.current = requestAnimationFrame(animateBackground);

    updateScrollPosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div ref={backgroundRef} className="firefly-background">
      {/* Dark Green Gradient Background */}
      <div className="gradient-background"></div>
      
      {/* Firefly Particles */}
      <div className="fireflies-container">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className={`firefly firefly-${i + 1}`}>
            <div className="firefly-glow"></div>
            <div className="firefly-core"></div>
          </div>
        ))}
      </div>
      
      {/* Ambient Glow Effects */}
      <div className="ambient-glow ambient-glow-1"></div>
      <div className="ambient-glow ambient-glow-2"></div>
      <div className="ambient-glow ambient-glow-3"></div>
    </div>
  );
};