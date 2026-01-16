import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Heart, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('student@emerge.app');
  const [password, setPassword] = useState('demo123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Logo and title */}
      <div className="text-center mb-8 animate-fade-in z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4">
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-2">EMERGE</h1>
        <p className="text-muted-foreground">Your emotional wellness companion</p>
      </div>

      {/* Login card */}
      <div className="w-full max-w-sm glass-card p-8 animate-fade-up z-10" style={{ animationDelay: '0.2s' }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/80">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted/50 border-border/50 focus:border-primary"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground/80">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted/50 border-border/50 focus:border-primary"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="border-primary data-[state=checked]:bg-primary"
            />
            <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
              Remember me
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold py-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Demo mode — just click Sign In ✨
          </p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex items-center gap-6 mt-8 text-muted-foreground animate-fade-in z-10" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4 text-primary" />
          <span>Safe & Private</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Heart className="w-4 h-4 text-accent" />
          <span>No Judgement</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
