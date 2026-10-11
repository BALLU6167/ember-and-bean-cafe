import React, { useState } from 'react';
import { MenuItem } from '../../types/cafe';
import { MENU_ITEMS } from '../../data/cafeData';
import { 
  Sparkles, 
  X, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  Plus, 
  Heart,
  Coffee
} from 'lucide-react';

interface PerfectBrewQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBothToCart: (drink: MenuItem, pastry: MenuItem) => void;
}

interface QuizStep {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    tag: string;
  }[];
}

export const PerfectBrewQuizModal: React.FC<PerfectBrewQuizModalProps> = ({
  isOpen,
  onClose,
  onAddBothToCart,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const steps: QuizStep[] = [
    {
      id: 0,
      question: 'What is your mood or ritual today?',
      subtitle: 'Every extraction reflects a state of mind.',
      options: [
        { label: 'Deep Focus & Creative Flow', description: 'Clean clarity, intense cognitive alertness', tag: 'focus' },
        { label: 'Slow & Contemplative Reading', description: 'Gentle, aromatic sips to savor over 30 minutes', tag: 'slow' },
        { label: 'Social & Celebratory Catch-Up', description: 'Indulgent, textured, and delightful to share', tag: 'social' },
        { label: 'Warm & Comforting Embrace', description: 'Velvety sweetness that soothes the senses', tag: 'cozy' },
      ],
    },
    {
      id: 1,
      question: 'What time of day are you savoring this?',
      subtitle: 'Circadian timing informs our barista extraction choice.',
      options: [
        { label: 'Morning Dawn (7:00 – 10:30 AM)', description: 'Peak morning boost and fresh morning bake', tag: 'morning' },
        { label: 'Midday Power Hour (11:00 AM – 2:00 PM)', description: 'Sustained energy with savory nourishment', tag: 'midday' },
        { label: 'Afternoon Golden Hour (3:00 – 6:00 PM)', description: 'Refreshing cold spritz or rich velvet milk', tag: 'afternoon' },
        { label: 'Twilight & Evening (6:00 – 10:00 PM)', description: 'Low acidity, soothing herbal or dessert notes', tag: 'evening' },
      ],
    },
    {
      id: 2,
      question: 'Which sensory tasting notes draw you in?',
      subtitle: 'Our single-origins showcase distinct terroir nuances.',
      options: [
        { label: 'Floral, Bergamot & Stone Fruit', description: 'Bright, sparkling, delicate tea-like acidity', tag: 'floral' },
        { label: 'Dark Cocoa, Roasted Plum & Molasses', description: 'Dense, full-bodied, low-acid bittersweetness', tag: 'chocolate' },
        { label: 'Silky Vanilla, Honeycomb & Butterscotch', description: 'Creamy, sweet, and comforting mouthfeel', tag: 'sweet' },
        { label: 'Green Cardamom, Cinnamon & Toasted Nuts', description: 'Warming spices and nostalgic aromas', tag: 'spiced' },
      ],
    },
    {
      id: 3,
      question: 'What is your preferred caffeine dosage?',
      subtitle: 'Match your biological rhythm today.',
      options: [
        { label: 'Full High Octane (Double Origin)', description: 'Maximum alertness and crisp extraction', tag: 'high' },
        { label: 'Balanced & Steady (Flat White / Cold Brew)', description: 'Smooth release without sudden spikes', tag: 'medium' },
        { label: 'Gentle Low Caffeine (White Tea / Cascara)', description: 'Subtle afternoon lift', tag: 'low' },
        { label: 'Zero Caffeine / Decaf', description: 'Pure flavor without nervous system stimulation', tag: 'none' },
      ],
    },
    {
      id: 4,
      question: 'Any dietary preferences for your pastry pairing?',
      subtitle: 'Our kitchen bakes both French butter and plant-based items.',
      options: [
        { label: 'Traditional French Butter Lamination', description: '72 layers of pure cultured butter bliss', tag: 'dairy' },
        { label: '100% Plant-Based & Oat Silk', description: 'Dairy-free excellence crafted from organic oats', tag: 'vegan' },
        { label: 'Nut-Free Recipe Preferred', description: 'Safe from tree nuts and peanuts', tag: 'nutfree' },
        { label: 'Gluten-Friendly or Light', description: 'Flourless or natural ferment focus', tag: 'glutenfree' },
      ],
    },
  ];

  if (!isOpen) return null;

  const handleSelectOption = (tag: string) => {
    const newAnswers = { ...answers, [currentStep]: tag };
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  // Determine dynamic recommendation based on answers
  const recommendedDrink: MenuItem = (() => {
    if (answers[2] === 'floral' || answers[0] === 'slow') {
      return MENU_ITEMS.find((m) => m.id === 'araku-geisha-pourover') || MENU_ITEMS[0];
    }
    if (answers[2] === 'chocolate' || answers[0] === 'focus') {
      return MENU_ITEMS.find((m) => m.id === 'obsidian-nitro-coldbrew') || MENU_ITEMS[2];
    }
    if (answers[2] === 'spiced') {
      return MENU_ITEMS.find((m) => m.id === 'smoked-cinnamon-cortado') || MENU_ITEMS[1];
    }
    if (answers[3] === 'low' || answers[3] === 'none') {
      return MENU_ITEMS.find((m) => m.id === 'silver-needle-white-tea') || MENU_ITEMS[6];
    }
    return MENU_ITEMS.find((m) => m.id === 'velvet-flat-white') || MENU_ITEMS[3];
  })();

  const recommendedPastry: MenuItem = (() => {
    if (answers[4] === 'vegan') {
      return MENU_ITEMS.find((m) => m.id === 'avocado-sourdough-tartine') || MENU_ITEMS[10];
    }
    if (answers[2] === 'spiced' || answers[0] === 'cozy') {
      return MENU_ITEMS.find((m) => m.id === 'cardamom-pistachio-bun') || MENU_ITEMS[14];
    }
    if (answers[2] === 'chocolate') {
      return MENU_ITEMS.find((m) => m.id === 'chocolate-caramel-tart') || MENU_ITEMS[16];
    }
    return MENU_ITEMS.find((m) => m.id === 'almond-frangipane-croissant') || MENU_ITEMS[15];
  })();

  const totalPrice = recommendedDrink.price + recommendedPastry.price;

  const handleShare = () => {
    navigator.clipboard.writeText(
      `My Ember & Bean personalized coffee ritual: ${recommendedDrink.name} paired with ${recommendedPastry.name} at Jubilee Hills! ☕✨`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[99970] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative max-w-2xl w-full bg-[#1A110D] border-2 border-[#C68B59]/70 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F5EDE0] my-8">
        <button
          onClick={onClose}
          aria-label="Close Quiz"
          className="absolute top-5 right-5 p-2 text-[#F5EDE0]/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Header with step progress indicator */}
            <div className="flex items-center justify-between border-b border-[#C68B59]/25 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#DFB17B]" />
                <span className="text-xs uppercase tracking-widest text-[#DFB17B] font-bold">
                  Find Your Perfect Brew Quiz
                </span>
              </div>
              <span className="font-mono text-xs text-[#F5EDE0]/60">
                Question {currentStep + 1} of {steps.length}
              </span>
            </div>

            {/* Step progress bar */}
            <div className="w-full h-1.5 bg-[#120B08] rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-[#C68B59] to-[#DFB17B] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Current Question */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5EDE0] mb-2">
              {steps[currentStep].question}
            </h3>
            <p className="text-xs text-[#F5EDE0]/70 mb-6">{steps[currentStep].subtitle}</p>

            {/* 4 Interactive Option Cards */}
            <div className="space-y-3">
              {steps[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.tag)}
                  className="w-full text-left p-4 rounded-2xl bg-[#24150E] hover:bg-[#321E14] border border-[#C68B59]/40 hover:border-[#DFB17B] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <span className="font-semibold text-sm text-[#F5EDE0] group-hover:text-[#DFB17B] transition-colors block">
                      {opt.label}
                    </span>
                    <span className="text-xs text-[#F5EDE0]/60 mt-0.5 block">{opt.description}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C68B59] group-hover:text-white transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>

            {/* Back button if not at first step */}
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mt-6 text-xs text-[#F5EDE0]/60 hover:text-white underline underline-offset-4"
              >
                ← Previous question
              </button>
            )}
          </div>
        ) : (
          /* RESULT CARD */
          <div className="text-center py-2 animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFB17B]/20 text-[#DFB17B] text-[11px] font-bold uppercase tracking-wider mb-4 border border-[#DFB17B]/40">
              <Sparkles className="w-3.5 h-3.5" /> Your Curated Pairing Match
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#F5EDE0] mb-2">
              The Artisan Harmony Ritual
            </h3>
            <p className="text-xs sm:text-sm text-[#F5EDE0]/70 max-w-md mx-auto mb-6">
              Based on your mood, timing, and sensory taste, our Head Roaster recommends this balanced pair.
            </p>

            {/* Side-by-side drink & pastry pairing cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-6">
              {/* Drink */}
              <div className="bg-[#120B08] border border-[#C68B59]/40 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                    <img
                      src={recommendedDrink.image}
                      alt={recommendedDrink.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] uppercase font-bold text-[#DFB17B]">
                      Drink
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#F5EDE0]">{recommendedDrink.name}</h4>
                  <p className="text-[11px] text-[#F5EDE0]/70 line-clamp-2 mt-1">{recommendedDrink.description}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#C68B59]/20 flex justify-between items-center text-xs">
                  <span className="text-[#DFB17B] font-mono font-bold">₹{recommendedDrink.price}</span>
                  <span className="text-[#F5EDE0]/50">{recommendedDrink.flavorProfile} notes</span>
                </div>
              </div>

              {/* Pastry */}
              <div className="bg-[#120B08] border border-[#C68B59]/40 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                    <img
                      src={recommendedPastry.image}
                      alt={recommendedPastry.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] uppercase font-bold text-[#C85A32]">
                      Pastry
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#F5EDE0]">{recommendedPastry.name}</h4>
                  <p className="text-[11px] text-[#F5EDE0]/70 line-clamp-2 mt-1">{recommendedPastry.description}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#C68B59]/20 flex justify-between items-center text-xs">
                  <span className="text-[#DFB17B] font-mono font-bold">₹{recommendedPastry.price}</span>
                  <span className="text-[#F5EDE0]/50">Fresh Daily Bake</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  onAddBothToCart(recommendedDrink, recommendedPastry);
                  onClose();
                }}
                className="w-full py-4 bg-gradient-to-r from-[#C68B59] to-[#C85A32] hover:from-[#DFB17B] hover:to-[#B04C27] text-[#1E1410] font-bold rounded-2xl text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <Plus className="w-4 h-4" /> Add Recommended Pairing to Order (₹{totalPrice})
              </button>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-[#DFB17B] hover:text-white transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isCopied ? 'Link & Ritual Copied!' : 'Share Your Result Card'}</span>
                </button>
                <span className="text-[#F5EDE0]/30">•</span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-[#F5EDE0]/60 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
