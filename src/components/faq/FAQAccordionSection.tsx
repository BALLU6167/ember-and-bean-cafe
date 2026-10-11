import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FAQAccordionSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  const faqsList = [
    { question: t.faqQ1, answer: t.faqA1 },
    { question: t.faqQ2, answer: t.faqA2 },
    { question: t.faqQ3, answer: t.faqA3 },
    { question: t.faqQ4, answer: t.faqA4 },
  ];

  return (
    <section className="py-24 bg-transparent text-[#FAF6F0] border-t border-[#D49B6A]/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D49B6A] font-bold block mb-2">
            {t.faqBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF6F0] tracking-tight">
            {t.faqTitle}
          </h2>
          <p className="mt-3 text-sm text-[#DDD3C4]/75 font-light">
            {t.faqDesc}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 mb-20">
          {faqsList.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#160F0B] border border-[#D49B6A]/25 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif font-bold text-base text-[#FAF6F0]">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#D49B6A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#D49B6A]/60 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#DDD3C4]/80 font-light leading-relaxed border-t border-[#D49B6A]/15 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Newsletter Signup Card */}
        <div className="bg-gradient-to-br from-[#221610] via-[#1A130E] to-[#140D09] border border-[#D49B6A]/30 rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#D49B6A]/10 border border-[#D49B6A]/30 flex items-center justify-center text-[#D49B6A] mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>

            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D49B6A]">
              {lang === 'hi' ? 'साप्ताहिक पत्र' : lang === 'te' ? 'వారాంతపు బులెటిన్' : 'THE SUNDAY DISPATCH'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6F0] mt-1 mb-2">
              {lang === 'hi' ? 'रोस्टरी गिल्ड न्यूज़लेटर से जुड़ें' : lang === 'te' ? 'రోస్టరీ గిల్డ్ న్యూస్‌లెటర్‌లో చేరండి' : 'Join Our Roastery Guild Newsletter'}
            </h3>
            <p className="text-xs text-[#DDD3C4]/75 mb-6 leading-relaxed">
              {lang === 'hi'
                ? 'कॉफी विज्ञान पर विचारशील लेख, दुर्लभ नए बीन्स की सूचनाएं और विशेष इनविटेशन सीधे आपके इनबॉक्स में।'
                : lang === 'te'
                ? 'కాఫీ సైన్స్ కథనాలు, అరుదైన కొత్త హార్వెస్ట్ కాఫీ విడుదలలు మరియు ప్రత్యేక ఆహ్వానాలు మీ ఇన్‌బాక్స్‌లో పొందండి.'
                : 'Curated Sunday morning essays on coffee science, notification of rare microlot harvest releases, and invitations to private acoustic sessions.'}
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'hi' ? 'अपना ईमेल दर्ज करें...' : lang === 'te' ? 'మీ ఈమెయిల్ ఎంటర్ చేయండి...' : 'Enter your email address...'}
                  className="flex-1 bg-[#120D0A] border border-[#D49B6A]/30 rounded-xl px-4 py-3 text-xs text-[#FAF6F0] placeholder-[#DDD3C4]/40 focus:outline-none focus:border-[#D49B6A]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#D49B6A] to-[#B86F43] hover:from-[#E2AA79] hover:to-[#C67B4E] text-[#120D0A] font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer hover:scale-105 transition-all whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" /> {lang === 'hi' ? 'सब्सक्राइब करें' : lang === 'te' ? 'సబ్‌స్క్రయిబ్' : 'Subscribe'}
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-xs py-2">
                <CheckCircle className="w-4 h-4" />
                <span>
                  {lang === 'hi'
                    ? 'धन्यवाद! आपकी सदस्यता सफलतापूर्वक दर्ज हो गई है।'
                    : lang === 'te'
                    ? 'ధన్యవాదాలు! మీ సబ్‌స్క్రిప్షన్ నమోదు చేయబడింది.'
                    : 'Thank you. Your Sunday dispatch invitation has been reserved.'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
