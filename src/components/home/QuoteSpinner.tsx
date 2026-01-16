import { useState, useEffect } from 'react';
import { Quote, RefreshCw } from 'lucide-react';

// Inspirational quotes - could be filtered by user's favorite artists in future
const QUOTES = [
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "You are enough just as you are.", author: "Meghan Markle" },
  { text: "It's okay to not be okay.", author: "Unknown" },
  { text: "Every day is a fresh start.", author: "Unknown" },
  { text: "You're doing amazing sweetie.", author: "Kris Jenner" },
  { text: "Life is tough, but so are you.", author: "Unknown" },
  { text: "Progress, not perfection.", author: "Unknown" },
  { text: "Take it one day at a time.", author: "Unknown" },
  { text: "Your feelings are valid.", author: "Unknown" },
  { text: "Healing is not linear.", author: "Unknown" },
  { text: "Rest if you must, but don't quit.", author: "Unknown" },
  { text: "You've survived 100% of your worst days.", author: "Unknown" },
  { text: "Stars can't shine without darkness.", author: "Unknown" },
  { text: "Be gentle with yourself.", author: "Unknown" },
];

interface QuoteSpinnerProps {
  favoriteArtists?: string[];
}

const QuoteSpinner = ({ favoriteArtists = [] }: QuoteSpinnerProps) => {
  const [currentQuote, setCurrentQuote] = useState(QUOTES[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[randomIndex];
  };

  useEffect(() => {
    // Set initial random quote
    setCurrentQuote(getRandomQuote());
  }, []);

  const spinQuote = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Quick spin animation
    let count = 0;
    const interval = setInterval(() => {
      setCurrentQuote(getRandomQuote());
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <Quote className="w-5 h-5 text-accent" />
        </div>
        
        <div className="flex-1 min-h-[60px]">
          <p className={`text-foreground font-medium leading-relaxed transition-opacity duration-150 ${isSpinning ? 'opacity-50' : 'opacity-100'}`}>
            "{currentQuote.text}"
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            — {currentQuote.author}
          </p>
        </div>

        <button
          onClick={spinQuote}
          disabled={isSpinning}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
        >
          <RefreshCw
            className={`w-4 h-4 text-muted-foreground ${isSpinning ? 'animate-spin' : ''}`}
          />
        </button>
      </div>
    </div>
  );
};

export default QuoteSpinner;
