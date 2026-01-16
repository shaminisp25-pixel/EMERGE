import { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';
import PetAvatar from '@/components/pets/PetAvatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Utensils, Gamepad2, Send } from 'lucide-react';

const PET_RESPONSES = [
  "I'm so happy to see you! 💕",
  "You're doing great today!",
  "I believe in you! ✨",
  "Take your time, I'm here.",
  "You matter so much! 🌟",
  "Let's take a deep breath together.",
  "I'm proud of you!",
  "You're stronger than you know.",
];

const PetPage = () => {
  const { userData, petAction } = useUserData();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ from: 'user' | 'pet'; text: string }[]>([
    { from: 'pet', text: `Hi there! I'm ${userData?.pet.name}! How are you feeling? 💕` },
  ]);

  if (!userData) return null;

  const { pet } = userData;
  const petMood = pet.happiness >= 70 ? 'happy' : pet.happiness >= 40 ? 'neutral' : 'sleepy';

  const handleAction = (action: 'pet' | 'feed' | 'play') => {
    petAction(action);
    const responses = {
      pet: [`*purrs happily* That feels nice! 💕`, `*nuzzles you* Thank you! ✨`],
      feed: [`Yum yum! So tasty! 🍎`, `*munches happily* Delicious! 😋`],
      play: [`Wheee! This is fun! 🎉`, `*jumps around excitedly* Again! 🎮`],
    };
    const response = responses[action][Math.floor(Math.random() * responses[action].length)];
    setChatMessages(prev => [...prev, { from: 'pet', text: response }]);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setChatMessages(prev => [...prev, { from: 'user', text: message }]);
    setMessage('');
    setTimeout(() => {
      const response = PET_RESPONSES[Math.floor(Math.random() * PET_RESPONSES.length)];
      setChatMessages(prev => [...prev, { from: 'pet', text: response }]);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Park background with pet */}
      <div className="park-bg flex-shrink-0 h-64 flex items-center justify-center relative">
        <div className="animate-float">
          <PetAvatar type={pet.type} size="xl" mood={petMood} />
        </div>
        <p className="absolute bottom-4 text-white/80 font-medium">{pet.name}</p>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-background p-4 space-y-3 overflow-y-auto max-h-[40vh]">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.from === 'user' 
                ? 'bg-primary text-primary-foreground rounded-br-md' 
                : 'glass-card rounded-bl-md'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="p-4 pb-24 space-y-4 border-t border-border/50">
        <div className="flex gap-2 justify-center">
          <Button onClick={() => handleAction('pet')} variant="outline" className="flex-1 gap-2">
            <Heart className="w-4 h-4 text-emerge-pink" /> Pet
          </Button>
          <Button onClick={() => handleAction('feed')} variant="outline" className="flex-1 gap-2">
            <Utensils className="w-4 h-4 text-mood-happy" /> Feed
          </Button>
          <Button onClick={() => handleAction('play')} variant="outline" className="flex-1 gap-2">
            <Gamepad2 className="w-4 h-4 text-primary" /> Play
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Talk to your pet..."
            className="flex-1 bg-muted/50"
          />
          <Button onClick={sendMessage} size="icon" className="bg-primary">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
