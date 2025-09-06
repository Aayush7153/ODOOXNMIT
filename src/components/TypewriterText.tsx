import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 100, 
  delay = 0 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(startTyping, speed);
      } else {
        setIsComplete(true);
        setTimeout(() => setShowUnderline(true), 200);
      }
    };

    const delayedStart = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(delayedStart);
    };
  }, [text, speed, delay]);

  return (
    <div className="typewriter-container">
      <span className="typewriter-text">
        {displayText}
        {!isComplete && <span className="typewriter-cursor">|</span>}
      </span>
      {showUnderline && (
        <div className="glowing-underline"></div>
      )}
    </div>
  );
};