import React from 'react';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Leaf } from 'lucide-react';

interface EcoScoreProps {
  score: number;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EcoScore: React.FC<EcoScoreProps> = ({ 
  score, 
  showTooltip = true, 
  size = 'md',
  className = '' 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'excellent-eco-score';
    if (score >= 75) return 'good-eco-score';
    if (score >= 60) return 'fair-eco-score';
    return 'poor-eco-score';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const badge = (
    <Badge 
      className={`enhanced-eco-score flex items-center gap-1 ${sizeClasses[size]} ${getScoreColor(score)} ${className}`}
    >
      <Leaf className={`${iconSizes[size]} eco-leaf-icon`} />
      <span className="eco-score-number">{score}</span>
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent className="eco-score-tooltip">
          <div className="text-center">
            <p className="tooltip-title">EcoScore: {score}/100</p>
            <p className="tooltip-description">{getScoreText(score)}</p>
            <p className="tooltip-info mt-1">
              Based on sustainability factors
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};