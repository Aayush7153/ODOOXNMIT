import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { AnimatedLogo } from "./AnimatedLogo";
import { PlantDome } from "./PlantDome";
import { TypewriterText } from "./TypewriterText";
import { LeafTransition } from "./LeafTransition";

interface LoginScreenProps {
  onLogin: () => void;
  isSignup: boolean;
  setIsSignup: (value: boolean) => void;
}

export function LoginScreen({ onLogin, isSignup, setIsSignup }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [cardMounted, setCardMounted] = useState(false);

  useEffect(() => {
    // Trigger card slide-in animation
    const timer = setTimeout(() => setCardMounted(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Show leaf transition after a brief loading period
    setTimeout(() => {
      setShowTransition(true);
    }, 1000);
  };

  const handleTransitionComplete = () => {
    setIsLoading(false);
    setShowTransition(false);
    onLogin();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Auto Layout with Figma Specifications */}
          <div className="hidden lg:block relative z-10 h-full">
            {/* Radial Gradient Background Layer */}
            <div className="absolute inset-0 radial-gradient-bg"></div>
            
            {/* Auto Layout Container - Vertical Direction, 24px Spacing, 40px Padding, Center Alignment */}
            <div className="figma-auto-layout-container">
              {/* Perfectly Centered Plant Dome Container (PlantContainer Group) */}
              <div className="figma-plant-container-group">
                <PlantDome />
              </div>
              
              {/* Enhanced Typography with Figma Specifications */}
              <div className="figma-typography-container">
                <h2 className="figma-sustainable-text">
                  Sustainable Shopping
                </h2>
                <p className="figma-tagline-text">
                  Give preloved items a second life while reducing environmental impact
                </p>
              </div>
            </div>
            
            {/* Floating Leaf Animation Container */}
            <div className="floating-leaves-container">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={`floating-leaf-${i}`}
                  className="floating-leaf"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 15}%`,
                    animationDelay: `${1000 + i * 500}ms`,
                    '--leaf-index': i
                  }}
                >
                  <div className="leaf-shape">
                    <div className="leaf-vein"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Ambient Green Particles */}
            <div className="ambient-particles-container">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={`ambient-particle-${i}`}
                  className="ambient-green-dot"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${500 + i * 300}ms`,
                    '--particle-size': `${2 + Math.random() * 3}px`
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Right Side - Enhanced Login Form with Prominent Visual Dominance */}
          <div className="w-full max-w-lg mx-auto relative z-20 login-card-container-enhanced">
            {/* Enhanced Glowing Green Aura with #4CAF50 */}
            <div className="prominent-login-aura"></div>
            
            <Card className="prominent-login-card smart-animate-hover organic-idle-pulse">
              <CardHeader className="space-y-6 text-center">
                {/* Static Logo */}
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-accent to-primary dark:from-primary dark:to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path 
                      d="M12 2L13.5 8.5L20 7L14 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L10 12L4 7L10.5 8.5L12 2Z" 
                      fill="currentColor"
                    />
                  </svg>
                </div>
                
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold font-heading text-foreground">
                    EcoFinds
                  </h1>
                  <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                    {isSignup 
                      ? "Join the sustainable marketplace revolution"
                      : "Welcome back to your eco-journey"
                    }
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-7 pt-2">
                <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label={isSignup ? "Sign up form" : "Sign in form"}>
                  {isSignup && (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                      <div className="enhanced-input-container">
                        <Input 
                          id="name" 
                          type="text" 
                          placeholder="Enter your full name"
                          className="h-14 rounded-2xl glass-card border-border/50 enhanced-input-field transition-all duration-200 ease-in-out relative z-10 px-4"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                    <div className="enhanced-input-container">
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email"
                        className="h-14 rounded-2xl glass-card border-border/50 enhanced-input-field transition-all duration-200 ease-in-out relative z-10 px-4"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                    <div className="enhanced-input-container">
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password"
                        className="h-14 rounded-2xl glass-card border-border/50 enhanced-input-field transition-all duration-200 ease-in-out relative z-10 px-4"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-14 rounded-2xl enhanced-button gradient-button text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 relative mt-2"
                  >
                    <span className="relative z-10">
                      {isLoading ? (
                        <>
                          <div className="loading-leaf"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          {isSignup ? "Create Account" : "Sign In"}
                        </>
                      )}
                    </span>
                  </Button>
                </form>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignup(!isSignup)}
                    className="text-muted-foreground hover:text-accent dark:hover:text-primary transition-all duration-300 font-medium hover:scale-105"
                  >
                    {isSignup 
                      ? "Already have an account? Sign in" 
                      : "Don't have an account? Sign up"
                    }
                  </button>
                </div>
              </CardContent>
            </Card>
            
            {/* Mobile Tagline */}
            <div className="lg:hidden mt-8 text-center">
              <div className="inline-flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-accent dark:bg-primary rounded-full animate-pulse"></div>
                <span>Sustainable • Secure • Simple</span>
                <div className="w-2 h-2 bg-accent dark:bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaf Transition Overlay */}
      <LeafTransition 
        isActive={showTransition} 
        onComplete={handleTransitionComplete} 
      />
    </div>
  );
}