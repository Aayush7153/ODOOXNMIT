import { Leaf, Info } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface EcoScoreProps {
  score: number;
  className?: string;
  showTooltip?: boolean;
  variant?: 'default' | 'overlay';
}

export function EcoScore({ score, className = "", showTooltip = true, variant = 'default' }: EcoScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };

  const getScoreBackground = (score: number, variant: string) => {
    if (variant === 'overlay') {
      if (score >= 80) return "eco-score-overlay border-green-400 text-green-100";
      if (score >= 60) return "eco-score-overlay border-yellow-400 text-yellow-100";
      return "eco-score-overlay border-orange-400 text-orange-100";
    }
    if (score >= 80) return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700";
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700";
    return "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700";
  };

  const getImpactMessage = (score: number) => {
    if (score >= 80) return "Excellent sustainability impact! This item significantly reduces environmental footprint.";
    if (score >= 60) return "Good environmental choice. This item has positive sustainability benefits.";
    return "Moderate impact. Better than buying new, but consider higher-rated alternatives.";
  };

  const badge = (
    <Badge 
      variant="outline" 
      className={`${getScoreBackground(score, variant)} ${variant === 'overlay' ? '' : getScoreColor(score)} font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${className}`}
    >
      <Leaf className="w-3.5 h-3.5 mr-1.5" />
      {score}
    </Badge>
  );

  if (!showTooltip) return badge;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-xs glass-card border-border/50 p-3"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">EcoScore Breakdown</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {getImpactMessage(score)}
            </p>
            <div className="text-xs text-muted-foreground">
              • Condition: {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Fair"}
              <br />
              • CO₂ Saved: ~{(score * 0.05).toFixed(1)}kg
              <br />
              • Water Saved: ~{(score * 2).toFixed(0)}L
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}