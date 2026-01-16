import { Link } from 'react-router-dom';
import { PetState } from '@/types/emerge';
import PetAvatar from '@/components/pets/PetAvatar';
import { Heart, Zap, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PetStatusCardProps {
  pet: PetState;
}

const StatusBar = ({ value, icon: Icon, label, color }: { value: number; icon: typeof Heart; label: string; color: string }) => (
  <div className="flex items-center gap-2">
    <Icon className={cn('w-4 h-4', color)} />
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{value}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', color.replace('text-', 'bg-'))}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  </div>
);

const PetStatusCard = ({ pet }: PetStatusCardProps) => {
  const mood = pet.happiness >= 70 ? 'happy' : pet.happiness >= 40 ? 'neutral' : 'sleepy';

  return (
    <Link to="/pet" className="block">
      <div className="glass-card p-4 hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center gap-4">
          {/* Pet avatar */}
          <div className="flex-shrink-0">
            <PetAvatar type={pet.type} size="md" mood={mood} />
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{pet.name}</h3>
              <span className="text-xs text-muted-foreground">Tap to visit →</span>
            </div>
            
            <StatusBar value={pet.happiness} icon={Heart} label="Happiness" color="text-emerge-pink" />
            <StatusBar value={pet.energy} icon={Zap} label="Energy" color="text-mood-happy" />
            <StatusBar value={pet.comfort} icon={Shield} label="Comfort" color="text-emerge-lavender" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PetStatusCard;
