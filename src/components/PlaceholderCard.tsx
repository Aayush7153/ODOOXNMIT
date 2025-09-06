import React from 'react';
import { Plus } from 'lucide-react';

export const PlaceholderCard: React.FC = () => {
  return (
    <div className="w-full h-48 glass-card rounded-lg flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/50 hover:border-accent/50 transition-colors duration-300">
      <div className="w-12 h-12 glass-card rounded-full flex items-center justify-center mb-4">
        <Plus className="w-6 h-6 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground text-center">
        More sustainable finds coming soon...
      </p>
    </div>
  );
};