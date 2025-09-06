import React, { useEffect, useRef } from 'react';

export const CursorSensitiveBackground: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const scrollPosition = useRef(0);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1, // Normalize to -1 to 1
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
        
        // Update CSS custom properties for cursor-sensitive and scroll-responsive animations
        backgroundRef.current.style.setProperty('--mouse-x', x.toString());
        backgroundRef.current.style.setProperty('--mouse-y', y.toString());
        backgroundRef.current.style.setProperty('--scroll-progress', scrollProgress.toString());
        
        // Subtle parallax effect for different layers
        const layers = backgroundRef.current.querySelectorAll('.cursor-responsive');
        layers.forEach((layer, index) => {
          const element = layer as HTMLElement;
          const intensity = (index + 1) * 0.08; // Reduced intensity for more subtle effect
          
          const translateX = x * intensity * 15; // Reduced movement
          const translateY = y * intensity * 15;
          
          // Add scroll-based movement
          const scrollX = scrollProgress * intensity * 30;
          const scrollY = scrollProgress * intensity * -50; // Negative for upward movement
          
          element.style.transform = `translate(${translateX + scrollX}px, ${translateY + scrollY}px)`;
        });

        // Handle nature elements separately for more complex movements
        const natureElements = backgroundRef.current.querySelectorAll('.nature-element');
        natureElements.forEach((element, index) => {
          const el = element as HTMLElement;
          const baseIntensity = 0.05 + (index * 0.02);
          
          // Cursor response
          const cursorX = x * baseIntensity * 25;
          const cursorY = y * baseIntensity * 25;
          
          // Scroll response with different patterns
          const scrollPattern = Math.sin(scrollProgress * Math.PI * 2 + index * 0.5);
          const scrollX = scrollProgress * baseIntensity * 40 + scrollPattern * 10;
          const scrollY = scrollProgress * baseIntensity * -60 + Math.cos(scrollProgress * Math.PI + index) * 15;
          
          // Rotation based on cursor and scroll
          const rotation = (x * 30 + scrollProgress * 180 + index * 45) % 360;
          
          el.style.transform = `translate(${cursorX + scrollX}px, ${cursorY + scrollY}px) rotate(${rotation}deg)`;
        });
      }
      
      animationFrame.current = requestAnimationFrame(animateBackground);
    };

    // Throttled event handlers for performance
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

    // Initial setup
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
    <div ref={backgroundRef} className="cursor-sensitive-background">
      {/* Cursor-responsive gradient overlay */}
      <div className="cursor-responsive-gradient" />
      
      {/* Floating Orbs with cursor response */}
      <div className="cursor-responsive floating-orb floating-orb-1 cursor-orb-1"></div>
      <div className="cursor-responsive floating-orb floating-orb-2 cursor-orb-2"></div>
      <div className="cursor-responsive floating-orb floating-orb-3 cursor-orb-3"></div>
      
      {/* Organic Shapes with cursor response */}
      <div className="cursor-responsive organic-shape organic-shape-1 cursor-shape-1"></div>
      <div className="cursor-responsive organic-shape organic-shape-2 cursor-shape-2"></div>
      
      {/* Interactive particles that follow cursor */}
      <div className="cursor-particles">
        <div className="cursor-responsive cursor-particle cursor-particle-1"></div>
        <div className="cursor-responsive cursor-particle cursor-particle-2"></div>
        <div className="cursor-responsive cursor-particle cursor-particle-3"></div>
        <div className="cursor-responsive cursor-particle cursor-particle-4"></div>
        <div className="cursor-responsive cursor-particle cursor-particle-5"></div>
        <div className="cursor-responsive cursor-particle cursor-particle-6"></div>
        <div className="cursor-responsive cursor-particle cursor-particle-7"></div>
        <div className="cursor-responsive cursor-particle cursor-particle-8"></div>
      </div>
      
      {/* Nature Elements - Floating Leaves */}
      <div className="nature-elements">
        <div className="nature-element leaf leaf-1"></div>
        <div className="nature-element leaf leaf-2"></div>
        <div className="nature-element leaf leaf-3"></div>
        <div className="nature-element leaf leaf-4"></div>
        <div className="nature-element leaf leaf-5"></div>
        <div className="nature-element leaf leaf-6"></div>
      </div>
      
      {/* Flower Petals */}
      <div className="nature-elements">
        <div className="nature-element petal petal-1"></div>
        <div className="nature-element petal petal-2"></div>
        <div className="nature-element petal petal-3"></div>
        <div className="nature-element petal petal-4"></div>
        <div className="nature-element petal petal-5"></div>
      </div>
      
      {/* Seeds and Small Organic Particles */}
      <div className="nature-elements">
        <div className="nature-element seed seed-1"></div>
        <div className="nature-element seed seed-2"></div>
        <div className="nature-element seed seed-3"></div>
        <div className="nature-element seed seed-4"></div>
        <div className="nature-element seed seed-5"></div>
        <div className="nature-element seed seed-6"></div>
        <div className="nature-element seed seed-7"></div>
        <div className="nature-element seed seed-8"></div>
      </div>
      
      {/* Floating Spores/Pollen */}
      <div className="nature-elements">
        <div className="nature-element spore spore-1"></div>
        <div className="nature-element spore spore-2"></div>
        <div className="nature-element spore spore-3"></div>
        <div className="nature-element spore spore-4"></div>
        <div className="nature-element spore spore-5"></div>
        <div className="nature-element spore spore-6"></div>
        <div className="nature-element spore spore-7"></div>
        <div className="nature-element spore spore-8"></div>
        <div className="nature-element spore spore-9"></div>
        <div className="nature-element spore spore-10"></div>
      </div>
      
      {/* Ambient light effect that follows cursor */}
      <div className="cursor-light-effect cursor-responsive"></div>
    </div>
  );
};