import { NavLink, useLocation } from 'react-router-dom';
import { Home, PenLine, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import PetAvatar from '@/components/pets/PetAvatar';
import { PetType } from '@/types/emerge';

interface BottomNavProps {
  petType: PetType;
  petName: string;
}

const BottomNav = ({ petType, petName }: BottomNavProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/pet', icon: null, label: petName, isPet: true },
    { path: '/journal', icon: PenLine, label: 'Journal' },
    { path: '/wrapped', icon: Sparkles, label: 'Wrapped' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex items-end justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          if (item.isPet) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center -mt-6"
              >
                <div
                  className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
                    'bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30',
                    isActive && 'from-primary/40 to-secondary/40 scale-110 border-primary/50'
                  )}
                >
                  <PetAvatar type={petType} size="sm" animated={isActive} />
                </div>
                <span
                  className={cn(
                    'text-xs mt-1 font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          }

          const Icon = item.icon!;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center py-2 px-4"
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={cn(
                  'text-xs mt-1 transition-colors',
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
