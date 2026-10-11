import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, X, ChevronLeft, ChevronRight, MapPin, Clock, Coffee, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { useLanguage } from '../context/LanguageContext';

interface ViewCafePageProps {
  onBackToHome: () => void;
  onExploreMenu: () => void;
}

interface CafePhoto {
  id: string;
  category: 'interior' | 'brew-bar' | 'patio' | 'corners';
  title: Record<string, string>;
  caption: Record<string, string>;
  image: string;
  badge: Record<string, string>;
}

const CAFE_PHOTOS: CafePhoto[] = [
  {
    id: 'photo-1',
    category: 'interior',
    title: {
      en: 'The Amber Main Dining Hall',
      hi: 'अम्बर मुख्य डाइनिंग हॉल',
      te: 'అంబర్ మెయిన్ డైనింగ్ హాల్',
    },
    caption: {
      en: 'Handcrafted teak wood tables, brass fixtures, and soft 2700K ambient illumination.',
      hi: 'सागौन की हस्तनिर्मित मेजें, पीतल के झूमर और 2700K की हल्की अम्बर रोशनी।',
      te: 'చేతితో చెక్కిన టేకు టేబుళ్ళు, ఇత్తడి లైట్లు మరియు వెచ్చని 2700K లైటింగ్.',
    },
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=85&w=1200',
    badge: {
      en: 'Warm Amber Lighting',
      hi: 'आरामदेह अम्बर रोशनी',
      te: 'వెచ్చని అంబర్ వెలుగు',
    },
  },
  {
    id: 'photo-2',
    category: 'brew-bar',
    title: {
      en: 'Slayer Espresso & Pour-Over Bar',
      hi: 'स्लेयर एस्प्रेसो और पोर-ओवर बार',
      te: 'స్లేయర్ ఎస్ప్రెస్సో & పోర్-ఓవర్ బార్',
    },
    caption: {
      en: 'Direct-trade Araku beans extracted with micro-metric precision by our head roasters.',
      hi: 'हमारे मुख्य रोस्टर्स द्वारा अत्यधिक सटीकता से तैयार की जाने वाली सिंगल-ओरिजिन अराकू कॉफी।',
      te: 'మా హెడ్ రోస్టర్స్ ద్వారా ఎంతో శ్రద్ధతో తయారుచేయబడే అరకు కాఫీ.',
    },
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=85&w=1200',
    badge: {
      en: 'Craft Brew Station',
      hi: 'क्राफ्ट ब्रू स्टेशन',
      te: 'క్రాఫ్ట్ బ్రూ స్టేషన్',
    },
  },
  {
    id: 'photo-3',
    category: 'interior',
    title: {
      en: 'Sunlit Skylight & Botanical Canopy',
      hi: 'धूप से रोशन स्काईलाइट और इनडोर पौधे',
      te: 'సూర్యరశ్మి స్కైలైట్ & ఇండోర్ పచ్చదనం',
    },
    caption: {
      en: 'Natural daylight streams through double-height glass panels onto lush air-purifying greenery.',
      hi: 'प्राकृतिक धूप और हरे-भरे पौधों से घिरा शांतिपूर्ण प्राकृतिक माहौल।',
      te: 'సహజమైన ఎండ మరియు పచ్చని చెట్లతో కూడిన స్వచ్ఛమైన వాతావరణం.',
    },
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=85&w=1200',
    badge: {
      en: 'Air-Purified Oasis',
      hi: 'शुद्ध वायु वातावरण',
      te: 'స్వచ్ఛమైన గాలి & పచ్చదనం',
    },
  },
  {
    id: 'photo-4',
    category: 'corners',
    title: {
      en: 'Vintage Vinyl Listening Nook',
      hi: 'विंटेज विनाइल लिसनिंग कॉर्नर',
      te: 'వింటేజ్ వినైల్ మ్యూజిక్ కార్నర్',
    },
    caption: {
      en: 'Curated jazz and acoustic records spinning softly alongside plush Italian leather armchairs.',
      hi: 'इटैलियन लेदर की कुर्सियों पर बैठकर पुरानी विनाइल रिकॉर्ड्स पर जैज़ संगीत का आनंद लें।',
      te: 'సౌకర్యవంతమైన తోలు కుర్చీలలో కూర్చుని వినైల్ రికార్డులపై సంగీతాన్ని ఆస్వాదించండి.',
    },
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=85&w=1200',
    badge: {
      en: 'Acoustic Comfort',
      hi: 'मधुर संगीत ज़ोन',
      te: 'ప్రశాంతమైన సంగీతం',
    },
  },
  {
    id: 'photo-5',
    category: 'brew-bar',
    title: {
      en: 'The In-House Probat Drum Roaster',
      hi: 'इन-हाउस प्रोबैट ड्रम रोस्टर',
      te: 'ఇన్-హౌస్ ప్రొబాట్ డ్రమ్ రోస్టర్',
    },
    caption: {
      en: 'Small 12kg batches roasted every Tuesday and Friday morning, filling Jubilee Hills with sweet aroma.',
      hi: 'हर मंगलवार और शुक्रवार को सुबह ताज़ा रोस्ट होने वाली कॉफी की भीनी-भीनी खुशबू।',
      te: 'ప్రతి మంగళవారం మరియు శుక్రవారం ఉదయం తాజా రోస్ట్ చేయబడే కాఫీ సువాసన.',
    },
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=85&w=1200',
    badge: {
      en: 'Micro-Lot Roasting',
      hi: 'ताज़ा इन-हाउस रोस्टिंग',
      te: 'తాజా ఇన్-హౌస్ రోస్టింగ్',
    },
  },
  {
    id: 'photo-6',
    category: 'patio',
    title: {
      en: 'Breezy Open-Air Garden Terrace',
      hi: 'खुला गार्डन टेरेस और आँगन',
      te: 'ఓపెన్-ఎయిర్ గార్డెన్ టెర్రస్',
    },
    caption: {
      en: 'Shaded under heritage foliage with misting fans, fairy lights, and pet-friendly water stations.',
      hi: 'छायादार पेड़ों और खूबसूरत परियों की रोशनी के बीच पालतू जानवरों के अनुकूल बैठक।',
      te: 'చెట్ల నీడలో లైట్ల వెలుగులు మరియు పెట్-ఫ్రెండ్లీ బహిరంగ కూర్చునే ప్రదేశం.',
    },
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=85&w=1200',
    badge: {
      en: 'Pet-Friendly Patio',
      hi: 'पालतू जानवरों के अनुकूल',
      te: 'పెట్-ఫ్రెండ్లీ పాటియో',
    },
  },
  {
    id: 'photo-7',
    category: 'corners',
    title: {
      en: 'The Library & Private Study Booths',
      hi: 'लाइब्रेरी और शांत अध्ययन बूथ',
      te: 'లైబ్రరీ & ప్రశాంతమైన స్టడీ బూత్‌లు',
    },
    caption: {
      en: 'Secluded booths featuring private table lamps, acoustic panels, and silent power strips.',
      hi: 'अध्ययन और गहरी सोच के लिए अलग शांत केबिन, टेबल लैंप और चार्जिंग पॉइंट्स।',
      te: 'ఏకాగ్రతతో చదువుకోవడానికి ప్రత్యేక ల్యాంప్‌లు మరియు పవర్ సాకెట్లతో కూడిన బూత్‌లు.',
    },
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=85&w=1200',
    badge: {
      en: 'Deep Focus Alcove',
      hi: 'गंभीर एकाग्रता ज़ोन',
      te: 'డీప్ ఫోకస్ కార్నర్',
    },
  },
  {
    id: 'photo-8',
    category: 'interior',
    title: {
      en: 'Open Scratch Kitchen & Pizza Oven',
      hi: 'ओपन स्क्रैच किचन और पिज़्ज़ा ओवन',
      te: 'ఓపెన్ కిచెన్ & పిజ్జా ఓవెన్',
    },
    caption: {
      en: 'Witness artisanal 48-hour sourdough stretching, double smashing of brioche burgers, and molten truffle sauces.',
      hi: 'ताज़ा 48-घंटे फर्मेंटेड पिज़्ज़ा और स्मैश्ड बर्गर तैयार होते हुए अपनी आँखों से देखें।',
      te: 'రుచికరమైన పిజ్జాలు మరియు స్మాష్డ్ బర్గర్లు స్వయంగా సిద్ధమవుతుండగా చూడండి.',
    },
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=85&w=1200',
    badge: {
      en: 'Wood-Fired Hearth',
      hi: 'खुला ओवन किचन',
      te: 'లైవ్ కిచెన్ అనుభవం',
    },
  },
];

export const ViewCafePage: React.FC<ViewCafePageProps> = ({ onBackToHome, onExploreMenu }) => {
  const { lang, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos =
    selectedFilter === 'all'
      ? CAFE_PHOTOS
      : CAFE_PHOTOS.filter((p) => p.category === selectedFilter);

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#FAF6F0] pb-24">
      {/* 1. Page Header */}
      <PageHeader
        badge={t.viewCafeBadge}
        title={t.viewCafeTitle}
        description={t.viewCafeSubtitle}
        onBackToHome={onBackToHome}
        breadcrumbs={[t.navViewCafe]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* 2. Key Atmosphere Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10">
          {[
            { label: t.atmospherePill1, desc: '98+ Indoor Plants' },
            { label: t.atmospherePill2, desc: 'Warm 2700K Glow' },
            { label: t.atmospherePill3, desc: '300+ Mbps Fiber' },
            { label: t.atmospherePill4, desc: 'Open Courtyard' },
          ].map((pill, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#160F0B] border border-[#D49B6A]/20 flex flex-col justify-center items-center text-center shadow-md hover:border-[#D49B6A]/50 transition-colors"
            >
              <span className="text-xs sm:text-sm font-semibold text-[#D49B6A] mb-1">
                {pill.label}
              </span>
              <span className="text-[11px] text-[#DDD3C4]/65">{pill.desc}</span>
            </div>
          ))}
        </div>

        {/* 3. Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'interior', label: t.filterInterior },
            { id: 'brew-bar', label: t.filterBrewBar },
            { id: 'patio', label: t.filterPatio },
            { id: 'corners', label: t.filterCorners },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-gradient-to-r from-[#D49B6A] to-[#B86F43] text-[#120D0A] shadow-lg shadow-[#D49B6A]/20'
                  : 'bg-[#160F0B] text-[#DDD3C4]/75 border border-[#D49B6A]/25 hover:border-[#D49B6A] hover:text-[#FAF6F0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4. Photo Grid with Rich Captions & Click to Expand */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setLightboxIndex(index)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#160F0B] border border-[#D49B6A]/25 hover:border-[#D49B6A] transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#120D0A]">
                <img
                  src={photo.image}
                  alt={photo.title[lang] || photo.title.en}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160F0B] via-transparent to-transparent opacity-80" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#120D0A]/85 backdrop-blur-md border border-[#D49B6A]/35 text-[10px] uppercase font-bold text-[#D49B6A] shadow-md">
                    {photo.badge[lang] || photo.badge.en}
                  </span>
                </div>

                {/* Hover Click Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-[#120D0A]/90 text-[#D49B6A] px-3 py-1 rounded-full text-xs flex items-center gap-1.5 shadow-lg">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full View</span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#FAF6F0] group-hover:text-[#D49B6A] transition-colors mb-2">
                    {photo.title[lang] || photo.title.en}
                  </h3>
                  <p className="text-xs text-[#DDD3C4]/75 leading-relaxed font-light">
                    {photo.caption[lang] || photo.caption.en}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D49B6A]/15 flex items-center justify-between text-[11px] text-[#D49B6A]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D49B6A]" /> Jubilee Hills, Hyderabad
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D49B6A]" /> 7 AM – 11 PM
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5. Bottom Call to Action Strip */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#221610] via-[#2A1B14] to-[#221610] border border-[#D49B6A]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D49B6A] font-bold block">
              {t.brandCity}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6F0]">
              Experience Ember & Bean in Person Today
            </h3>
            <p className="text-xs sm:text-sm text-[#DDD3C4]/75 font-light">
              Plot 42, Road No. 36, Jubilee Hills. Complimentary valet parking, peaceful workspaces, and freshly baked comfort foods.
            </p>
          </div>

          <button
            onClick={onExploreMenu}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D49B6A] to-[#B86F43] hover:from-[#E2AA79] hover:to-[#C67B4E] text-[#120D0A] font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
          >
            {t.heroExploreMenu}
          </button>
        </div>
      </div>

      {/* 6. Full-Screen Image Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2.5 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav */}
            <button
              onClick={prevLightbox}
              className="absolute left-4 sm:left-8 p-3 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav */}
            <button
              onClick={nextLightbox}
              className="absolute right-4 sm:right-8 p-3 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full flex flex-col items-center"
            >
              <div className="relative w-full max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/15">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title[lang] || activePhoto.title.en}
                  className="w-full h-full max-h-[70vh] object-cover"
                />
              </div>

              <div className="mt-4 text-center max-w-xl">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#DFB17B] mb-1 block">
                  {activePhoto.badge[lang] || activePhoto.badge.en} · Ember & Bean Jubilee Hills
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                  {activePhoto.title[lang] || activePhoto.title.en}
                </h4>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {activePhoto.caption[lang] || activePhoto.caption.en}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
