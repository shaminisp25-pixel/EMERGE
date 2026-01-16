import { PetType } from '@/types/emerge';
import { cn } from '@/lib/utils';

interface PetAvatarProps {
  type: PetType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'neutral' | 'sleepy' | 'excited';
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-20 h-20',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48',
};

// SVG pet designs - simple, cute, expressive
const PetSVG = ({ type, mood = 'happy' }: { type: PetType; mood?: string }) => {
  const eyeStyle = mood === 'sleepy' ? 'scaleY(0.3)' : 'scaleY(1)';
  const mouthCurve = mood === 'happy' || mood === 'excited' ? 'M 35 55 Q 50 65 65 55' : 'M 35 55 Q 50 55 65 55';
  
  const baseColors: Record<PetType, { primary: string; secondary: string; accent: string }> = {
    dog: { primary: '#D4A574', secondary: '#C49A6C', accent: '#8B6914' },
    cat: { primary: '#FFB347', secondary: '#FFA07A', accent: '#FF6B35' },
    rabbit: { primary: '#F5F5F5', secondary: '#FFE4E1', accent: '#FFB6C1' },
    hamster: { primary: '#DEB887', secondary: '#D2B48C', accent: '#8B4513' },
    'guinea-pig': { primary: '#CD853F', secondary: '#D2691E', accent: '#8B4513' },
    bird: { primary: '#87CEEB', secondary: '#4169E1', accent: '#FFD700' },
    fish: { primary: '#FF6B6B', secondary: '#FFA07A', accent: '#FFD700' },
    turtle: { primary: '#90EE90', secondary: '#228B22', accent: '#8B4513' },
    ferret: { primary: '#DEB887', secondary: '#F5F5DC', accent: '#8B4513' },
    hedgehog: { primary: '#A0522D', secondary: '#DEB887', accent: '#2F4F4F' },
    lion: { primary: '#FFD700', secondary: '#DAA520', accent: '#8B4513' },
    cow: { primary: '#FFFFFF', secondary: '#2F2F2F', accent: '#FFB6C1' },
    hen: { primary: '#CD853F', secondary: '#FFFFFF', accent: '#FF4500' },
    snake: { primary: '#90EE90', secondary: '#228B22', accent: '#FFD700' },
  };

  const colors = baseColors[type];

  // Different pet shapes
  const renderPet = () => {
    switch (type) {
      case 'dog':
        return (
          <g>
            {/* Ears */}
            <ellipse cx="25" cy="25" rx="15" ry="20" fill={colors.secondary} />
            <ellipse cx="75" cy="25" rx="15" ry="20" fill={colors.secondary} />
            {/* Head */}
            <circle cx="50" cy="50" r="35" fill={colors.primary} />
            {/* Snout */}
            <ellipse cx="50" cy="60" rx="15" ry="12" fill={colors.secondary} />
            {/* Nose */}
            <ellipse cx="50" cy="55" rx="6" ry="4" fill={colors.accent} />
            {/* Eyes */}
            <g className="pet-eyes" style={{ transform: eyeStyle, transformOrigin: 'center' }}>
              <circle cx="38" cy="45" r="6" fill="#2F2F2F" />
              <circle cx="62" cy="45" r="6" fill="#2F2F2F" />
              <circle cx="40" cy="43" r="2" fill="white" />
              <circle cx="64" cy="43" r="2" fill="white" />
            </g>
            {/* Mouth */}
            <path d={mouthCurve} stroke="#2F2F2F" strokeWidth="2" fill="none" />
          </g>
        );

      case 'cat':
        return (
          <g>
            {/* Ears */}
            <polygon points="20,15 30,40 10,40" fill={colors.primary} />
            <polygon points="80,15 90,40 70,40" fill={colors.primary} />
            <polygon points="22,20 28,35 16,35" fill={colors.accent} />
            <polygon points="78,20 84,35 72,35" fill={colors.accent} />
            {/* Head */}
            <circle cx="50" cy="55" r="35" fill={colors.primary} />
            {/* Eyes */}
            <g className="pet-eyes" style={{ transform: eyeStyle, transformOrigin: 'center' }}>
              <ellipse cx="38" cy="50" rx="8" ry="10" fill="#90EE90" />
              <ellipse cx="62" cy="50" rx="8" ry="10" fill="#90EE90" />
              <ellipse cx="38" cy="50" rx="3" ry="8" fill="#2F2F2F" />
              <ellipse cx="62" cy="50" rx="3" ry="8" fill="#2F2F2F" />
            </g>
            {/* Nose */}
            <polygon points="50,58 46,64 54,64" fill={colors.accent} />
            {/* Whiskers */}
            <line x1="20" y1="60" x2="35" y2="62" stroke="#2F2F2F" strokeWidth="1" />
            <line x1="20" y1="65" x2="35" y2="65" stroke="#2F2F2F" strokeWidth="1" />
            <line x1="65" y1="62" x2="80" y2="60" stroke="#2F2F2F" strokeWidth="1" />
            <line x1="65" y1="65" x2="80" y2="65" stroke="#2F2F2F" strokeWidth="1" />
            {/* Mouth */}
            <path d="M 46 68 Q 50 72 54 68" stroke="#2F2F2F" strokeWidth="1.5" fill="none" />
          </g>
        );

      case 'rabbit':
        return (
          <g>
            {/* Ears */}
            <ellipse cx="35" cy="15" rx="10" ry="25" fill={colors.primary} />
            <ellipse cx="65" cy="15" rx="10" ry="25" fill={colors.primary} />
            <ellipse cx="35" cy="15" rx="5" ry="20" fill={colors.accent} />
            <ellipse cx="65" cy="15" rx="5" ry="20" fill={colors.accent} />
            {/* Head */}
            <circle cx="50" cy="55" r="32" fill={colors.primary} />
            {/* Cheeks */}
            <circle cx="30" cy="60" r="8" fill={colors.secondary} />
            <circle cx="70" cy="60" r="8" fill={colors.secondary} />
            {/* Eyes */}
            <g className="pet-eyes" style={{ transform: eyeStyle, transformOrigin: 'center' }}>
              <circle cx="40" cy="50" r="7" fill="#2F2F2F" />
              <circle cx="60" cy="50" r="7" fill="#2F2F2F" />
              <circle cx="42" cy="48" r="2" fill="white" />
              <circle cx="62" cy="48" r="2" fill="white" />
            </g>
            {/* Nose */}
            <ellipse cx="50" cy="60" rx="4" ry="3" fill={colors.accent} />
            {/* Mouth */}
            <path d="M 46 65 L 50 70 L 54 65" stroke="#2F2F2F" strokeWidth="1.5" fill="none" />
          </g>
        );

      case 'bird':
        return (
          <g>
            {/* Body */}
            <ellipse cx="50" cy="60" rx="30" ry="25" fill={colors.primary} />
            {/* Head */}
            <circle cx="50" cy="35" r="22" fill={colors.primary} />
            {/* Wing */}
            <ellipse cx="30" cy="60" rx="12" ry="18" fill={colors.secondary} />
            {/* Beak */}
            <polygon points="50,45 60,50 50,55" fill={colors.accent} />
            {/* Eyes */}
            <g className="pet-eyes" style={{ transform: eyeStyle, transformOrigin: 'center' }}>
              <circle cx="42" cy="32" r="5" fill="#2F2F2F" />
              <circle cx="43" cy="31" r="1.5" fill="white" />
            </g>
            {/* Crest */}
            <ellipse cx="50" cy="18" rx="8" ry="6" fill={colors.secondary} />
          </g>
        );

      case 'fish':
        return (
          <g>
            {/* Tail */}
            <polygon points="10,50 25,35 25,65" fill={colors.secondary} />
            {/* Body */}
            <ellipse cx="50" cy="50" rx="35" ry="25" fill={colors.primary} />
            {/* Fin */}
            <ellipse cx="50" cy="30" rx="10" ry="12" fill={colors.secondary} />
            {/* Scales pattern */}
            <path d="M 40 45 Q 50 40 60 45" stroke={colors.secondary} strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M 35 55 Q 50 50 65 55" stroke={colors.secondary} strokeWidth="2" fill="none" opacity="0.5" />
            {/* Eye */}
            <g className="pet-eyes" style={{ transform: eyeStyle, transformOrigin: 'center' }}>
              <circle cx="65" cy="45" r="8" fill="white" />
              <circle cx="67" cy="45" r="5" fill="#2F2F2F" />
              <circle cx="68" cy="43" r="1.5" fill="white" />
            </g>
            {/* Mouth */}
            <ellipse cx="82" cy="50" rx="4" ry="3" fill={colors.secondary} />
          </g>
        );

      case 'turtle':
        return (
          <g>
            {/* Shell */}
            <ellipse cx="50" cy="55" rx="35" ry="28" fill={colors.secondary} />
            <ellipse cx="50" cy="50" rx="30" ry="22" fill={colors.primary} />
            {/* Shell pattern */}
            <path d="M 35 50 L 50 35 L 65 50 L 50 65 Z" stroke={colors.secondary} strokeWidth="2" fill="none" />
            {/* Head */}
            <ellipse cx="85" cy="45" rx="12" ry="10" fill={colors.primary} />
            {/* Eyes */}
            <g className="pet-eyes" style={{ transform: eyeStyle, transformOrigin: 'center' }}>
              <circle cx="88" cy="42" r="4" fill="#2F2F2F" />
              <circle cx="89" cy="41" r="1" fill="white" />
            </g>
            {/* Legs */}
            <ellipse cx="25" cy="70" rx="8" ry="6" fill={colors.primary} />
            <ellipse cx="75" cy="70" rx="8" ry="6" fill={colors.primary} />
          </g>
        );

      case 'lion':
        return (
          <g>
            {/* Mane */}
            <circle cx="50" cy="50" r="40" fill={colors.secondary} />
            {/* Mane tufts */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <circle
                key={i}
                cx={50 + 35 * Math.cos((angle * Math.PI) / 180)}
                cy={50 + 35 * Math.sin((angle * Math.PI) / 180)}
                r="12"
                fill={colors.primary}
              />
            ))}
            {/* Face */}
            <circle cx="50" cy="50" r="28" fill={colors.primary} />
            {/* Snout */}
            <ellipse cx="50" cy="58" rx="12" ry="10" fill={colors.secondary} />
            {/* Nose */}
            <ellipse cx="50" cy="54" rx="5" ry="4" fill={colors.accent} />
            {/* Eyes */}
            <g className="pet-eyes" style={{ transform: eyeStyle, transformOrigin: 'center' }}>
              <circle cx="40" cy="45" r="6" fill="#2F2F2F" />
              <circle cx="60" cy="45" r="6" fill="#2F2F2F" />
              <circle cx="42" cy="43" r="2" fill="white" />
              <circle cx="62" cy="43" r="2" fill="white" />
            </g>
            {/* Mouth */}
            <path d={mouthCurve} stroke="#2F2F2F" strokeWidth="2" fill="none" />
          </g>
        );

      // Default circular pet for others
      default:
        return (
          <g>
            <circle cx="50" cy="50" r="35" fill={colors.primary} />
            <circle cx="50" cy="60" r="20" fill={colors.secondary} />
            <g className="pet-eyes" style={{ transform: eyeStyle, transformOrigin: 'center' }}>
              <circle cx="38" cy="45" r="6" fill="#2F2F2F" />
              <circle cx="62" cy="45" r="6" fill="#2F2F2F" />
              <circle cx="40" cy="43" r="2" fill="white" />
              <circle cx="64" cy="43" r="2" fill="white" />
            </g>
            <ellipse cx="50" cy="55" rx="5" ry="3" fill={colors.accent} />
            <path d={mouthCurve} stroke="#2F2F2F" strokeWidth="2" fill="none" />
          </g>
        );
    }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {renderPet()}
    </svg>
  );
};

const PetAvatar = ({ type, size = 'md', mood = 'happy', animated = true, className }: PetAvatarProps) => {
  return (
    <div
      className={cn(
        sizeClasses[size],
        animated && 'pet-idle',
        'relative',
        className
      )}
    >
      <PetSVG type={type} mood={mood} />
    </div>
  );
};

export default PetAvatar;
