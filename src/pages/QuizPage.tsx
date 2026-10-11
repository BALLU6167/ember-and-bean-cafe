import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { MenuItem } from '../types/cafe';
import { MENU_ITEMS } from '../data/cafeData';
import { Sparkles, ArrowRight, RotateCcw, Share2, Plus, Coffee, Check } from 'lucide-react';

interface QuizPageProps {
  onBackToHome: () => void;
  onAddBothToCart?: (drink: MenuItem, pastry: MenuItem) => void;
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

export const QuizPage: React.FC<QuizPageProps> = ({ onBackToHome, onAddBothToCart }) => {
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

  const recommendedDrink: MenuItem = (() => {
    if (answers[0] === 'social' || answers[1] === 'midday') {
      return MENU_ITEMS.find((m) => m.id === 'lotus-biscoff-shake') || MENU_ITEMS[0];
    }
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
      return MENU_ITEMS.find((m) => m.id === 'sparkling-passionfruit-boba') || MENU_ITEMS[6];
    }
    return MENU_ITEMS.find((m) => m.id === 'iced-velvet-float') || MENU_ITEMS[3];
  })();

  const recommendedPastry: MenuItem = (() => {
    if (answers[0] === 'social' || answers[1] === 'midday') {
      return MENU_ITEMS.find((m) => m.id === 'genv-smash-cheeseburger') || MENU_ITEMS[0];
    }
    if (answers[4] === 'vegan') {
      return MENU_ITEMS.find((m) => m.id === 'sweet-potato-fries') || MENU_ITEMS[10];
    }
    if (answers[2] === 'spiced' || answers[0] === 'cozy') {
      return MENU_ITEMS.find((m) => m.id === 'truffle-parmesan-fries') || MENU_ITEMS[14];
    }
    if (answers[2] === 'chocolate') {
      return MENU_ITEMS.find((m) => m.id === 'burrata-san-marzano-pizza') || MENU_ITEMS[16];
    }
    return MENU_ITEMS.find((m) => m.id === 'truffle-parmesan-fries') || MENU_ITEMS[15];
  })();

  const totalPrice = recommendedDrink.price + recommendedPastry.price;

  const handleShare = () => {
    navigator.clipboard.writeText(
      `My Ember & Bean personalized craving combo: ${recommendedDrink.name} paired with ${recommendedPastry.name} at EMBER & BEAN! ☕✨`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#1E1410] text-[#F5EDE0]">
      <PageHeader
        badge="Sensory Sommelier Engine"
        title="Find Your Perfect Brew & Pastry Pairing"
        description="Answer 5 quick questions regarding your mood, time of day, caffeine preference, and tasting notes to receive a personalized pairing recommendation."
        onBackToHome={onBackToHome}
        breadcrumbs={['Brew Quiz']}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!isCompleted ? (
          <div className="bg-[#1A110D] border-2 border-[#C68B59]/50 rounded-3xl p-8 sm:p-12 shadow-2xl">
            {/* Step indicator */}
            <div className="flex items-center justify-between border-b border-[#C68B59]/25 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#DFB17B] font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Question {currentStep + 1} of {steps.length}
              </span>
              <span className="font-mono text-xs text-[#F5EDE0]/60">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-[#120B08] rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-gradient-to-r from-[#C68B59] to-[#DFB17B] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5EDE0] mb-2 leading-tight">
              {steps[currentStep].question}
            </h2>
            <p className="text-sm text-[#F5EDE0]/70 mb-8 font-light">
              {steps[currentStep].subtitle}
            </p>

            <div className="space-y-4">
              {steps[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.tag)}
                  className="w-full text-left p-5 rounded-2xl bg-[#24150E] hover:bg-[#321E14] border border-[#C68B59]/40 hover:border-[#DFB17B] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between group cursor-pointer shadow-md"
                >
                  <div>
                    <span className="font-serif font-bold text-base text-[#F5EDE0] group-hover:text-[#DFB17B] transition-colors block">
                      {opt.label}
                    </span>
                    <span className="text-xs text-[#F5EDE0]/60 mt-1 block font-light">
                      {opt.description}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#C68B59] group-hover:text-white transition-transform group-hover:translate-x-1 shrink-0 ml-4" />
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mt-8 text-xs text-[#F5EDE0]/60 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                ← Return to previous question
              </button>
            )}
          </div>
        ) : (
          /* RESULT PRESENTATION */
          <div className="bg-[#1A110D] border-2 border-[#DFB17B] rounded-3xl p-8 sm:p-12 shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#DFB17B]/20 text-[#DFB17B] text-xs font-bold uppercase tracking-widest mb-4 border border-[#DFB17B]/40">
              <Sparkles className="w-4 h-4" /> Your Personalized Roastery Ritual
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EDE0] mb-3">
              The Artisan Harmony Pair
            </h2>
            <p className="text-sm text-[#F5EDE0]/70 max-w-lg mx-auto mb-8 font-light leading-relaxed">
              Based on your sensory preferences, our Head Roaster recommends pairing this single-origin beverage with our freshly baked pastry.
            </p>

            {/* Side by side cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-8">
              <div className="bg-[#120B08] border border-[#C68B59]/40 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={recommendedDrink.image}
                      alt={recommendedDrink.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-[10px] uppercase font-bold text-[#DFB17B]">
                      Recommended Drink
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#F5EDE0]">{recommendedDrink.name}</h3>
                  <p className="text-xs text-[#F5EDE0]/70 mt-1 line-clamp-2">{recommendedDrink.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#C68B59]/20 flex justify-between items-center text-xs">
                  <span className="font-mono text-base font-bold text-[#DFB17B]">₹{recommendedDrink.price}</span>
                  <span className="text-[#F5EDE0]/60">{recommendedDrink.flavorProfile} notes</span>
                </div>
              </div>

              <div className="bg-[#120B08] border border-[#C68B59]/40 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={recommendedPastry.image}
                      alt={recommendedPastry.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-[10px] uppercase font-bold text-[#C85A32]">
                      Pastry Pairing
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#F5EDE0]">{recommendedPastry.name}</h3>
                  <p className="text-xs text-[#F5EDE0]/70 mt-1 line-clamp-2">{recommendedPastry.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#C68B59]/20 flex justify-between items-center text-xs">
                  <span className="font-mono text-base font-bold text-[#DFB17B]">₹{recommendedPastry.price}</span>
                  <span className="text-[#F5EDE0]/60">Fresh Daily Batch</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={onBackToHome}
                className="w-full py-4 bg-gradient-to-r from-[#C68B59] to-[#C85A32] hover:from-[#DFB17B] hover:to-[#B04C27] text-[#1E1410] font-bold rounded-2xl text-sm uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] transition-transform"
              >
                <Sparkles className="w-4 h-4" /> Discover Full Menu Offerings
              </button>

              <div className="flex items-center justify-center gap-6 pt-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-xs font-semibold text-[#DFB17B] hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{isCopied ? 'Link Copied to Clipboard!' : 'Share Result Card'}</span>
                </button>
                <span className="text-[#F5EDE0]/30">•</span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-xs text-[#F5EDE0]/60 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
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
