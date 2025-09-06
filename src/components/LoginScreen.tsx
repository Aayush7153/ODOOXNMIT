import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AnimatedLogo } from './AnimatedLogo';
import { ThemeToggle } from './ThemeToggle';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, CheckCircle, AlertCircle, Sparkles, Heart, Leaf, Recycle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js'
import { supabase } from '../supabase-client';
interface LoginScreenProps {
  onLogin: () => void;
  isSignup: boolean;
  setIsSignup: (value: boolean) => void;
}

interface FormField {
  value: string;
  focused: boolean;
  valid: boolean;
  error?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, isSignup, setIsSignup }) => {
  const [email, setEmail] = useState<FormField>({ value: '', focused: false, valid: true });
  const [password, setPassword] = useState<FormField>({ value: '', focused: false, valid: true });
  const [name, setName] = useState<FormField>({ value: '', focused: false, valid: true });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Form entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setAnimateForm(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Form mode transition animation
  useEffect(() => {
    setAnimateForm(false);
    const timer = setTimeout(() => setAnimateForm(true), 150);
    return () => clearTimeout(timer);
  }, [isSignup]);

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(emailValue);
    return {
      valid: isValid,
      error: isValid ? undefined : 'Please enter a valid email address'
    };
  };

  const validatePassword = (passwordValue: string) => {
    const isValid = passwordValue.length >= 6;
    return {
      valid: isValid,
      error: isValid ? undefined : 'Password must be at least 6 characters'
    };
  };

  const validateName = (nameValue: string) => {
    const isValid = nameValue.trim().length >= 2;
    return {
      valid: isValid,
      error: isValid ? undefined : 'Name must be at least 2 characters'
    };
  };

  const handleEmailChange = (value: string) => {
    const validation = validateEmail(value);
    setEmail(prev => ({ ...prev, value, ...validation }));
  };

  const handlePasswordChange = (value: string) => {
    const validation = validatePassword(value);
    setPassword(prev => ({ ...prev, value, ...validation }));
  };

  const handleNameChange = (value: string) => {
    const validation = validateName(value);
    setName(prev => ({ ...prev, value, ...validation }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const emailValidation = validateEmail(email.value);
    const passwordValidation = validatePassword(password.value);
    const nameValidation = isSignup ? validateName(name.value) : { valid: true };

    setEmail(prev => ({ ...prev, ...emailValidation }));
    setPassword(prev => ({ ...prev, ...passwordValidation }));
    setName(prev => ({ ...prev, ...nameValidation }));

    if (!emailValidation.valid || !passwordValidation.valid || (isSignup && !nameValidation.valid)) {
      return;
    }
    setIsLoading(true);
    if (isSignup) {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            first_name: name.value,
          }
        }
      });
      if (signUpError) {
        console.error("Error signing up:", signUpError.message);
        alert("Error signing up: " + signUpError.message);
        return;
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });
      if (signInError) {
        console.error("Error signing in:", signInError.message);
        alert("Error signing in: " + signInError.message);
        return;
      }
    }
    

    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsSuccess(true);

    // Success animation and then proceed
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  const FloatingLabel = ({ 
    label, 
    htmlFor, 
    focused, 
    hasValue 
  }: { 
    label: string; 
    htmlFor: string; 
    focused: boolean; 
    hasValue: boolean; 
  }) => (
    <Label 
      htmlFor={htmlFor}
      className={`floating-label ${focused || hasValue ? 'floating-label-focused' : ''}`}
    >
      {label}
    </Label>
  );

  return (
    <div className="interactive-login-container min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Interactive Background Elements */}
      <div 
        className="interactive-cursor-glow"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
        }}
      />

      {/* Floating Particles */}
      <div className="floating-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`floating-particle floating-particle-${i + 1}`}
          >
            <Sparkles className="w-4 h-4 text-primary/60" />
          </div>
        ))}
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Split Screen Layout */}
      <div className="w-full max-w-6xl flex items-center justify-center gap-12">
        {/* Left Side - Enhanced Eco Content with Icons */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div className="eco-content-layout max-w-2xl w-full">
            {/* Icon Feature Grid */}
            <div className="eco-feature-grid mb-12">
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                <div className="eco-feature-card">
                  <div className="eco-feature-icon">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <div className="eco-feature-text">
                    <h4 className="font-semibold text-white mb-1">Sustainable Living</h4>
                    <p className="text-white/70 text-sm">Eco-friendly choices</p>
                  </div>
                </div>
                
                <div className="eco-feature-card">
                  <div className="eco-feature-icon">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <div className="eco-feature-text">
                    <h4 className="font-semibold text-white mb-1">Green Growth</h4>
                    <p className="text-white/70 text-sm">Growing together</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center interactive-left-content">
              <div className="mb-8 animate-float">
                <Heart className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse-gentle" />
              </div>
              <h2 className="font-heading text-4xl text-white mb-6 animate-text-glow">
                Grow with <span className="text-primary animate-color-shift">EcoFinds</span>
              </h2>
              <p className="text-white/80 text-lg max-w-lg mx-auto leading-relaxed animate-fade-in-up mb-8">
                Every purchase plants seeds for a sustainable future. Join our community of eco-conscious consumers and make a difference.
              </p>
              
              {/* Interactive Stats */}
              <div className="flex justify-center gap-6 mb-10">
                <div className="interactive-stat">
                  <div className="stat-number">10k+</div>
                  <div className="stat-label">Happy Users</div>
                </div>
                <div className="interactive-stat">
                  <div className="stat-number">50k+</div>
                  <div className="stat-label">Items Saved</div>
                </div>
                <div className="interactive-stat">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Eco Score</div>
                </div>
              </div>
            </div>

            {/* Bottom Feature Grid */}
            <div className="eco-bottom-features">
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="eco-feature-card">
                  <div className="eco-feature-icon">
                    <Recycle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="eco-feature-text">
                    <h4 className="font-semibold text-white text-sm mb-1">Recycle & Reuse</h4>
                  </div>
                </div>
                
                <div className="eco-feature-card">
                  <div className="eco-feature-icon">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="eco-feature-text">
                    <h4 className="font-semibold text-white text-sm mb-1">Clean Energy</h4>
                  </div>
                </div>
                
                <div className="eco-feature-card">
                  <div className="eco-feature-icon">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <div className="eco-feature-text">
                    <h4 className="font-semibold text-white text-sm mb-1">Eco Impact</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Interactive Login Card */}
        <div className={`w-full max-w-md interactive-form-wrapper ${animateForm ? 'form-enter' : 'form-exit'}`}>
          {/* Mobile Eco Header - Visible only on mobile */}
          <div className="mobile-eco-header lg:hidden mb-6">
            <div className="mobile-eco-icons flex justify-center gap-4">
              <div className="mobile-eco-icon">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <div className="mobile-eco-icon">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="mobile-eco-icon">
                <Recycle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="mobile-eco-text text-center mt-4">
              <h3 className="text-white font-heading text-lg mb-2">
                Join the <span className="text-primary">Eco Movement</span>
              </h3>
              <p className="text-white/70 text-sm">
                Sustainable marketplace for a better tomorrow
              </p>
            </div>
          </div>

          <Card className="interactive-login-card glass-card hover-lift">
            <CardContent className="p-8">
              {/* Logo and Title */}
              <div className="text-center mb-8">
                <div className="interactive-logo-wrapper">
                  <AnimatedLogo />
                </div>
                <h1 className="font-heading text-3xl mt-4 mb-2 animate-title-entrance">
                  Welcome to <span className="text-primary animate-gradient-text">EcoFinds</span>
                </h1>
                <p className="text-muted-foreground transition-all duration-500 animate-subtitle-entrance">
                  {isSignup ? 'Join the sustainable marketplace' : 'Sign in to your account'}
                </p>
              </div>

              {/* Interactive Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success State */}
                {isSuccess && (
                  <div className="success-animation flex items-center justify-center py-4">
                    <CheckCircle className="w-12 h-12 text-green-500 animate-success-bounce" />
                    <span className="ml-3 text-green-500 font-medium">Welcome to EcoFinds!</span>
                  </div>
                )}

                {/* Name Field (Signup only) */}
                {isSignup && (
                  <div className={`form-field-wrapper ${name.focused ? 'field-focused' : ''} ${!name.valid ? 'field-error' : ''}`}>
                    <div className="relative">
                      <User className="field-icon w-5 h-5" />
                      <Input
                        id="name"
                        type="text"
                        value={name.value}
                        onChange={(e) => handleNameChange(e.target.value)}
                        onFocus={() => setName(prev => ({ ...prev, focused: true }))}
                        onBlur={() => setName(prev => ({ ...prev, focused: false }))}
                        className="interactive-input"
                        placeholder=" "
                      />
                      <FloatingLabel 
                        label="Full Name" 
                        htmlFor="name" 
                        focused={name.focused} 
                        hasValue={!!name.value} 
                      />
                    </div>
                    {!name.valid && name.error && (
                      <div className="field-error-message animate-error-slide">
                        <AlertCircle className="w-4 h-4" />
                        <span>{name.error}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Email Field */}
                <div className={`form-field-wrapper ${email.focused ? 'field-focused' : ''} ${!email.valid ? 'field-error' : ''}`}>
                  <div className="relative">
                    <Mail className="field-icon w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      value={email.value}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onFocus={() => setEmail(prev => ({ ...prev, focused: true }))}
                      onBlur={() => setEmail(prev => ({ ...prev, focused: false }))}
                      className="interactive-input"
                      placeholder=" "
                    />
                    <FloatingLabel 
                      label="Email Address" 
                      htmlFor="email" 
                      focused={email.focused} 
                      hasValue={!!email.value} 
                    />
                  </div>
                  {!email.valid && email.error && (
                    <div className="field-error-message animate-error-slide">
                      <AlertCircle className="w-4 h-4" />
                      <span>{email.error}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className={`form-field-wrapper ${password.focused ? 'field-focused' : ''} ${!password.valid ? 'field-error' : ''}`}>
                  <div className="relative">
                    <Lock className="field-icon w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password.value}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      onFocus={() => setPassword(prev => ({ ...prev, focused: true }))}
                      onBlur={() => setPassword(prev => ({ ...prev, focused: false }))}
                      className="interactive-input pr-12"
                      placeholder=" "
                    />
                    <FloatingLabel 
                      label="Password" 
                      htmlFor="password" 
                      focused={password.focused} 
                      hasValue={!!password.value} 
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="password-toggle-btn absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {!password.valid && password.error && (
                    <div className="field-error-message animate-error-slide">
                      <AlertCircle className="w-4 h-4" />
                      <span>{password.error}</span>
                    </div>
                  )}
                </div>

                {/* Interactive Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isLoading || isSuccess}
                  className="interactive-submit-btn w-full h-14 relative overflow-hidden"
                >
                  <span className={`submit-btn-content ${isLoading ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}>
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="loading-spinner mr-2" />
                        <span>Processing...</span>
                      </div>
                    ) : isSuccess ? (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>Success!</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
                        <ArrowRight className="w-5 h-5 ml-2 arrow-icon" />
                      </div>
                    )}
                  </span>
                  <div className="submit-btn-ripple" />
                </Button>
              </form>

              {/* Interactive Toggle */}
              <div className="text-center mt-6">
                <p className="text-muted-foreground transition-colors duration-300">
                  {isSignup ? 'Already have an account?' : "Don't have an account?"}
                </p>
                <Button 
                  variant="link" 
                  onClick={() => setIsSignup(!isSignup)}
                  className="interactive-toggle-btn text-primary hover:text-accent relative overflow-hidden"
                >
                  <span className="toggle-btn-text">
                    {isSignup ? 'Sign In' : 'Sign Up'}
                  </span>
                  <div className="toggle-btn-underline" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};