export type LangMode = 'en' | 'hi' | 'te';

export interface MilestoneItem {
  year: string;
  title: string;
  desc: string;
}

export interface Translations {
  // Brand & Nav
  brandName: string;
  brandCity: string;
  navMenu: string;
  navViewCafe: string;
  navWorkspace: string;
  navStory: string;
  openNow: string;
  opensAt: string;
  langSelect: string;

  // Moods
  moodMorning: string;
  moodAfternoon: string;
  moodEvening: string;

  // Hero Section
  heroTagline: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroDescription: string;
  pillCoffee: string;
  pillBurgers: string;
  pillPizzas: string;
  pillFries: string;
  pillShakes: string;
  heroExploreMenu: string;
  heroViewCafe: string;
  heroKitchenHours: string;
  heroRatings: string;
  heroAward: string;
  reelBadge: string;
  reelSoundOn: string;
  reelSoundOff: string;
  reelTapHint: string;

  // Live Pulse
  pulseTitle: string;
  pulseStatus: string;
  pulseRoast: string;
  pulseTemp: string;
  pulseHeaderTitle: string;
  pulseHeaderBadge: string;
  pulseHeaderDesc: string;
  pulsePaceTitle: string;
  pulsePaceValue: string;
  pulsePaceBadge: string;
  pulseWaitTitle: string;
  pulseWaitValue: string;
  pulseWaitSub: string;
  pulseOvenTitle: string;
  pulseOvenValue: string;
  pulseOvenBadge: string;
  pulseBakesHeader: string;
  pulseSoldOut: string;
  pulseLeft: string;

  // Home Featured
  featuredBadge: string;
  featuredTitle: string;
  featuredExplore: string;

  // View Cafe Page
  viewCafeTitle: string;
  viewCafeSubtitle: string;
  viewCafeBadge: string;
  filterAll: string;
  filterInterior: string;
  filterBrewBar: string;
  filterPatio: string;
  filterCorners: string;
  atmospherePill1: string;
  atmospherePill2: string;
  atmospherePill3: string;
  atmospherePill4: string;

  // Workspace Page
  workspaceTitle: string;
  workspaceSubtitle: string;
  workspaceBadge: string;
  workspaceFeature1Title: string;
  workspaceFeature1Desc: string;
  workspaceFeature2Title: string;
  workspaceFeature2Desc: string;
  workspaceFeature3Title: string;
  workspaceFeature3Desc: string;
  workspaceFeature4Title: string;
  workspaceFeature4Desc: string;

  wsBadge: string;
  wsTitle: string;
  wsDesc: string;
  wsSpeedTest: string;
  wsPinging: string;
  wsWifiTitle: string;
  wsWifiSpeed: string;
  wsWifiDesc: string;
  wsPowerTitle: string;
  wsPowerSeats: string;
  wsPowerDesc: string;
  wsSoundTitle: string;
  wsSoundAmbient: string;
  wsSoundDesc: string;
  wsHoursTitle: string;
  wsHoursTimes: string;
  wsHoursDesc: string;
  wsPassBadge: string;
  wsPassPerk: string;
  wsPassTitle: string;
  wsPassDesc: string;
  wsPassCta: string;

  // Story Page & AboutStorySection
  storyTitle: string;
  storySubtitle: string;
  storyBadge: string;
  storyOriginBadge: string;
  storyOriginTitle: string;
  storyOriginP1: string;
  storyOriginP2: string;
  storyQuote: string;
  storyQuoteAuthor: string;
  storyGalleryBtn: string;
  storyMilestonesHeader: string;
  milestones: MilestoneItem[];

  // Sustainability Section
  sustBadge: string;
  sustTitle: string;
  sustDesc: string;
  sustStat1Number: string;
  sustStat1Title: string;
  sustStat1Desc: string;
  sustStat2Number: string;
  sustStat2Title: string;
  sustStat2Desc: string;
  sustStat3Number: string;
  sustStat3Title: string;
  sustStat3Desc: string;
  sustStat4Number: string;
  sustStat4Title: string;
  sustStat4Desc: string;

  // Menu Page & InteractiveMenuSection
  menuTitle: string;
  menuSubtitle: string;
  menuBadge: string;
  catAll: string;
  catBurgers: string;
  catPizzas: string;
  catFries: string;
  catColdDrinks: string;
  catCoffee: string;
  catTea: string;
  catBreakfast: string;
  catBrunch: string;
  catPastries: string;
  catDesserts: string;
  menuSearchPlaceholder: string;
  menuFilterBtn: string;
  menuFilterDiet: string;
  menuFilterVegan: string;
  menuFilterGlutenFree: string;
  menuFilterNutFree: string;
  menuReset: string;

  // Reviews UGC
  reviewsBadge: string;
  reviewsTitle: string;
  reviewsSubtitle: string;

  // FAQs
  faqBadge: string;
  faqTitle: string;
  faqDesc: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;

  // Location & Hours
  locationBadge: string;
  locationTitle: string;
  locationDesc: string;
  locationDirectionsBtn: string;
  locationCallBtn: string;

  // Footer
  footerBio: string;
  footerExplore: string;
  footerServices: string;
  footerRoastery: string;
  footerAddress: string;
  footerHours: string;
  footerValet: string;
  footerRights: string;
  footerViewCafe: string;
  footerWorkspace: string;
  footerStory: string;
  footerMenu: string;
}

export const translations: Record<LangMode, Translations> = {
  en: {
    brandName: 'EMBER & BEAN',
    brandCity: 'Jubilee Hills · Hyderabad',
    navMenu: 'CRAFT MENU',
    navViewCafe: 'VIEW CAFÉ',
    navWorkspace: 'WORKSPACE',
    navStory: 'OUR STORY',
    openNow: 'Open Now · Jubilee Hills',
    opensAt: 'Opens at 7:00 AM',
    langSelect: 'Language',

    moodMorning: '☀️ Morning Boost',
    moodAfternoon: '⛅ Afternoon Reset',
    moodEvening: '🌙 Evening Wind-Down',

    heroTagline: 'EMBER & BEAN · Artisanal Roastery & Kitchen',
    heroTitle1: 'Slow Coffee.',
    heroTitle2: 'Good Food.',
    heroTitle3: 'Better Moments.',
    heroDescription:
      'More than just a café. Handcrafted single-origin Araku brews, 48-hour fermented sourdough pizzas, hand-smashed prime brioche burgers, crispy loaded truffle parmesan fries, and unhurried hospitality.',
    pillCoffee: '☕ Specialty Pour-Overs & Brews',
    pillBurgers: '🍔 Smashed Brioche Burgers',
    pillPizzas: '🍕 48h Fermented Pizzas',
    pillFries: '🍟 Loaded Truffle Fries',
    pillShakes: '🥤 Monster Cold Shakes',
    heroExploreMenu: 'Explore Craft Menu',
    heroViewCafe: 'View Café Atmosphere',
    heroKitchenHours: 'Kitchen & Brew Bar Active · 7:00 AM - 11:00 PM Daily',
    heroRatings: '4.9 ★ Rating (2,400+ Guests & Coffee Lovers)',
    heroAward: 'Best Specialty Roastery & Kitchen 2026',
    reelBadge: 'EMBER & BEAN LIVE REEL',
    reelSoundOn: 'Sound On',
    reelSoundOff: 'Sound Off',
    reelTapHint: 'Tap sound button to unmute · Jubilee Hills, Hyderabad',

    pulseTitle: 'Live Café Pulse',
    pulseStatus: 'Serene & Warm Atmosphere · Ideal for Work & Unhurried Dining',
    pulseRoast: 'Current Micro-Roast: Araku Geisha Wash Batch #42',
    pulseTemp: 'Jubilee Hills · Ambient 23°C Indoors',
    pulseHeaderTitle: 'Live Roastery & Café Pulse',
    pulseHeaderBadge: 'Jubilee Hills Floor',
    pulseHeaderDesc: 'Real-time floor occupancy, kitchen queue, and fresh oven batches',
    pulsePaceTitle: 'Current Pace',
    pulsePaceValue: 'Moderate & Relaxed',
    pulsePaceBadge: 'Comfortable Seating',
    pulseWaitTitle: 'Barista Wait Time',
    pulseWaitValue: '4 – 6 Minutes',
    pulseWaitSub: 'Hand-Pours ~8m',
    pulseOvenTitle: 'Pastry Oven Status',
    pulseOvenValue: 'Batch #3 Served',
    pulseOvenBadge: 'Hot & Crisp',
    pulseBakesHeader: "✦ Today's Fresh-Baked Counter (Live Inventory)",
    pulseSoldOut: 'Sold Out',
    pulseLeft: 'left',

    featuredBadge: 'Most-Craved Highlights',
    featuredTitle: 'Featured Ember & Bean Kitchen & Roastery Favorites',
    featuredExplore: 'Explore Full Menu Offerings',

    viewCafeTitle: 'The Café Experience',
    viewCafeSubtitle: 'Step inside our warm, amber-lit sanctuary designed for slow sips, rich flavors, and peaceful moments in Jubilee Hills.',
    viewCafeBadge: 'Café Atmosphere & Visual Tour',
    filterAll: 'All Spaces',
    filterInterior: 'Interior & Seating',
    filterBrewBar: 'Brew Bar & Roaster',
    filterPatio: 'Garden Patio',
    filterCorners: 'Cozy Reading Nooks',
    atmospherePill1: '🌿 Air-Purified Indoor Flora',
    atmospherePill2: '💡 Warm Amber 2700K Glow',
    atmospherePill3: '⚡ High-Speed Fiber Wi-Fi',
    atmospherePill4: '🐕 Pet-Friendly Outdoor Terrace',

    workspaceTitle: 'Remote Workspace Facilities',
    workspaceSubtitle: 'Ergonomic seating, high-speed fiber internet, and dedicated power sockets at every desk. Walk-ins welcome anytime.',
    workspaceBadge: 'Quiet Coworking Sanctuary',
    workspaceFeature1Title: '300+ Mbps Fiber Wi-Fi',
    workspaceFeature1Desc: 'Ultra-low latency dual-band wireless connectivity across every indoor table and booth.',
    workspaceFeature2Title: 'Dedicated Power Points',
    workspaceFeature2Desc: 'Universal AC sockets and USB-C fast charging at all dedicated work desks.',
    workspaceFeature3Title: 'Acoustically Softened Zones',
    workspaceFeature3Desc: 'Gentle ambient lo-fi soundscapes crafted for deep focus, creative coding, and reading.',
    workspaceFeature4Title: 'Specialty Coffee on Tap',
    workspaceFeature4Desc: 'Seamless barista service with pour-overs, cold brews, and healthy bites while you work.',

    wsBadge: 'Creative Sanctuary & Remote Work',
    wsTitle: 'Workspace Mode & Facilities',
    wsDesc: 'Crafted for writers, architects, founders, and designers who need an inspiring, distraction-free environment with high-grade infrastructure and artisanal fuel.',
    wsSpeedTest: 'Test Speed',
    wsPinging: 'Pinging...',
    wsWifiTitle: 'Fiber Wi-Fi 6',
    wsWifiSpeed: '328 Mbps',
    wsWifiDesc: 'Dual redundant gigabit lines with low 4ms latency for seamless 4K video calls.',
    wsPowerTitle: 'Power Outlets',
    wsPowerSeats: '16 / 16 Seats',
    wsPowerDesc: 'Universal multi-plug + 65W USB-C PD fast chargers built directly into high-top teak desks.',
    wsSoundTitle: 'Sound Level',
    wsSoundAmbient: '48 dB Ambient',
    wsSoundDesc: 'Curated low-tempo jazz & vinyl background acoustics. Zero loud phone speaker bleed allowed.',
    wsHoursTitle: 'Laptop Hours',
    wsHoursTimes: '7 AM – 6 PM',
    wsHoursDesc: 'Dedicated work mode during daytime. Post 6:00 PM transitions to vinyl evening unwind.',
    wsPassBadge: 'Dedicated Day Work Pass',
    wsPassPerk: 'Includes Unlimited Filter Coffee',
    wsPassTitle: 'Open Community Work Desks',
    wsPassDesc: 'Ergonomic task chairs, 320+ Mbps fiber internet, multiple power outlets, and single-origin batch brews available all day for creative flow.',
    wsPassCta: 'Open Walk-in Desks (No Prior Booking Needed)',

    storyTitle: 'Our Story, Philosophy & Milestones',
    storySubtitle: 'Founded to redefine café culture: uniting world-class micro-lot coffee with authentic scratch comfort food — from double-smashed brioche burgers to 48-hr fermented sourdough pizzas.',
    storyBadge: 'Ember & Bean Ethos & Roastery Origins',
    storyOriginBadge: 'ORIGIN & PHILOSOPHY',
    storyOriginTitle: 'Rooted in Araku Mist, Roasted in Jubilee Hills.',
    storyOriginP1: 'Ember & Bean began with a quiet conviction: that Indian coffee terroir, cultivated in the biodynamic forests of Andhra Pradesh and Karnataka, deserves the reverence typically reserved for grand cru wines.',
    storyOriginP2: 'We eliminated the commercial middlemen to pay an average of 45% above Fair Trade minimums directly to our tribal farming families. Every batch is roasted under controlled ambient heat, and every extraction is dialed in on custom Slayer machines.',
    storyQuote: '"We don\'t brew coffee to rush you out the door. We brew coffee so you remember to pause."',
    storyQuoteAuthor: '— Vikram Roy, Co-Founder & Head Roaster',
    storyGalleryBtn: 'Open 21-Moment Photo Archive',
    storyMilestonesHeader: '✦ Milestones & Evolution (2019 – 2026)',
    milestones: [
      { year: '2019', title: 'The Araku Cloud Forest Journey', desc: 'Founders Vikram & Tara spent six months in Araku Valley working alongside adivasi farmer guilds to source shade-grown heirloom varietals.' },
      { year: '2021', title: 'The Cast-Iron Roaster Arrives', desc: 'Installed our 12kg bespoke vintage roaster in Jubilee Hills, committing to roasting 3 times weekly for absolute peak aromatics.' },
      { year: '2023', title: 'The Sourdough & Viennoiserie Bakery', desc: 'Expanded with our stone deck pastry kitchen, crafting 72-hour fermented sourdough loaves and laminated butter viennoiserie.' },
      { year: '2026', title: 'Hyderabad’s Specialty Flagship', desc: 'A multi-sensory haven combining acoustic vinyl soundscapes, high-speed remote creative desks, and biodynamic coffee.' },
    ],

    sustBadge: 'Conscious Craft & Ecology',
    sustTitle: 'Sustainability & Regenerative Impact',
    sustDesc: 'Great coffee should restore the earth, not deplete it. We practice zero-waste brewing and direct tribal partnerships.',
    sustStat1Number: '14,200+',
    sustStat1Title: 'Cups Diverted & Recycled',
    sustStat1Desc: 'Through our bring-your-own-cup discount (₹20 off) and compostable husks program.',
    sustStat2Number: '+45%',
    sustStat2Title: 'Above Fair Trade Floor',
    sustStat2Desc: 'Paid straight to indigenous adivasi smallholders without middlemen or brokers.',
    sustStat3Number: '1,240+',
    sustStat3Title: 'Native Shade Trees Planted',
    sustStat3Desc: 'Restoring canopy cover and biodiversity across our partner estates in Araku.',
    sustStat4Number: '100%',
    sustStat4Title: 'Solar & Husk Powered Roastery',
    sustStat4Desc: 'Clean roasting facility in Jubilee Hills powered by roof solar and bio-pellets.',

    menuTitle: 'Gourmet Kitchen & Artisanal Roastery',
    menuSubtitle: 'Handcrafted single-origin coffees, 48-hr fermented sourdough pizzas, double-smashed prime brioche burgers, loaded truffle parmesan fries, monster thickshakes, and small-batch brews.',
    menuBadge: 'EMBER & BEAN CRAFT MENU · 11 Categories',
    catAll: 'All Cravings',
    catBurgers: 'Gourmet Burgers',
    catPizzas: 'Sourdough Pizzas',
    catFries: 'Loaded Fries',
    catColdDrinks: 'Shakes & Coolers',
    catCoffee: 'Specialty Coffee',
    catTea: 'Artisanal Teas',
    catBreakfast: 'Morning Kitchen',
    catBrunch: 'All-Day Brunch',
    catPastries: 'Bakery & Cruffins',
    catDesserts: 'Desserts',
    menuSearchPlaceholder: 'Search craft coffee, smash burgers, truffle fries...',
    menuFilterBtn: 'Filters',
    menuFilterDiet: 'Dietary Preferences',
    menuFilterVegan: 'Vegan',
    menuFilterGlutenFree: 'Gluten-Free',
    menuFilterNutFree: 'Nut-Free',
    menuReset: 'Reset All Filters',

    reviewsBadge: 'COMMUNITY & GUEST STORIES',
    reviewsTitle: 'Loved by Hyderabad’s Coffee & Food Connoisseurs',
    reviewsSubtitle: 'Real experiences from writers, designers, food critics, and weekend brunch lovers.',

    faqBadge: 'Inquiries & Hospitality',
    faqTitle: 'Frequently Asked Questions',
    faqDesc: 'Everything you need to know about our sourcing, reservations, workspace policies, and deliveries.',
    faqQ1: 'Where do you source your coffee beans from?',
    faqA1: 'We source exclusively from shade-grown, biodynamic micro-farms in the Araku Valley of Andhra Pradesh and Coorg. Every lot is harvested by hand, direct-traded with tribal guilds, and roasted weekly in Jubilee Hills.',
    faqQ2: 'Is the café laptop-friendly for remote work?',
    faqA2: 'Yes! We offer a dedicated Workspace Mode from 7 AM to 6 PM with 320+ Mbps Wi-Fi 6, universal power outlets at every desk, and ergonomic chairs. Walk-ins are always welcome.',
    faqQ3: 'What makes your burgers and pizzas special?',
    faqA3: 'Everything is made from scratch daily. Our pizzas use a 48-hour cold-fermented sourdough with Italian San Marzano tomatoes, and our burgers feature fresh hand-smashed prime patties in toasted French brioche buns.',
    faqQ4: 'Do you have valet parking available?',
    faqA4: 'Yes, complimentary valet parking is available every day from 7:00 AM to 11:00 PM directly in front of the café on Road No. 36.',

    locationBadge: 'VISIT US IN HYDERABAD',
    locationTitle: 'Find Ember & Bean in Jubilee Hills',
    locationDesc: 'Plot 42, Road No. 36, Jubilee Hills, Hyderabad. Open 7 AM to 11 PM daily.',
    locationDirectionsBtn: 'Get Directions on Map',
    locationCallBtn: 'Call the Café',

    footerBio:
      'An artisanal specialty coffee roastery and boutique kitchen in Jubilee Hills, Hyderabad. Dedicated to single-origin transparency, handcrafted food, and the luxury of unhurried moments.',
    footerExplore: 'EXPLORE PAGES',
    footerServices: 'GUEST SERVICES',
    footerRoastery: 'FLAGSHIP ROASTERY',
    footerAddress: 'Plot 42, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    footerHours: 'Mon-Sun: 7 AM – 11 PM',
    footerValet: 'Complimentary Valet Parking',
    footerRights: 'Ember & Bean Café · All Rights Reserved',
    footerViewCafe: 'View Café Atmosphere',
    footerWorkspace: 'Remote Workspace Facilities',
    footerStory: 'Our Story & Milestones',
    footerMenu: 'Craft Menu (11 Categories)',
  },

  hi: {
    brandName: 'एम्बर & बीन',
    brandCity: 'जुबली हिल्स · हैदराबाद',
    navMenu: 'क्राफ्ट मेनू',
    navViewCafe: 'कैफ़े देखें',
    navWorkspace: 'वर्कस्पेस',
    navStory: 'हमारी कहानी',
    openNow: 'खुला है · जुबली हिल्स',
    opensAt: 'सुबह 7:00 बजे खुलता है',
    langSelect: 'भाषा',

    moodMorning: '☀️ मॉर्निंग बूस्ट',
    moodAfternoon: '⛅ दोपहर का रीसेट',
    moodEvening: '🌙 शाम का सुकून',

    heroTagline: 'एम्बर & बीन · आर्टिसनल रोस्टरी और किचन',
    heroTitle1: 'धीमी कॉफी।',
    heroTitle2: 'लज़ीज़ खाना।',
    heroTitle3: 'खूबसूरत पल।',
    heroDescription:
      'सिर्फ एक कैफ़े से कहीं ज्यादा। हाथ से तैयार सिंगल-ओरिजिन अराकू ब्रूज़, 48-घंटे खमीर वाले सॉरडो पिज़्ज़ा, हैंड-स्मैश्ड ब्रियोश बर्गर, क्रिस्पी ट्रफल फ्राइज़ और सुकून भरी मेहमाननवाज़ी।',
    pillCoffee: '☕ स्पेशल पोर-ओवर & कॉफी',
    pillBurgers: '🍔 स्मैश्ड ब्रियोश बर्गर',
    pillPizzas: '🍕 48 घंटे फर्मेंटेड पिज़्ज़ा',
    pillFries: '🍟 लोडेड ट्रफल फ्राइज़',
    pillShakes: '🥤 मॉन्स्टर कोल्ड शेक्स',
    heroExploreMenu: 'क्राफ्ट मेनू देखें',
    heroViewCafe: 'कैफ़े का माहौल देखें',
    heroKitchenHours: 'किचन और ब्रू बार सक्रिय · प्रतिदिन सुबह 7:00 से रात 11:00 बजे तक',
    heroRatings: '4.9 ★ रेटिंग (2,400+ अतिथि और कॉफी प्रेमी)',
    heroAward: 'सर्वश्रेष्ठ रोस्टरी और किचन 2026',
    reelBadge: 'एम्बर & बीन लाइव रील',
    reelSoundOn: 'ध्वनि चालू',
    reelSoundOff: 'ध्वनि बंद',
    reelTapHint: 'आवाज़ सुनने के लिए साउंड बटन दबाएं · जुबली हिल्स, हैदराबाद',

    pulseTitle: 'लाइव कैफ़े पल्स',
    pulseStatus: 'शांत और सुखद माहौल · काम करने और सुकून से खाने के लिए आदर्श',
    pulseRoast: 'ताज़ा रोस्टिंग बैच: अराकू वैली गिशा वॉश #42',
    pulseTemp: 'जुबली हिल्स · इनडोर तापमान 23°C',
    pulseHeaderTitle: 'लाइव रोस्टरी और कैफ़े पल्स',
    pulseHeaderBadge: 'जुबली हिल्स फ़्लोर',
    pulseHeaderDesc: 'रियल-टाइम सीटिंग स्थिति, किचन ऑर्डर और ताज़ा बेकिंग बैच',
    pulsePaceTitle: 'वर्तमान गति',
    pulsePaceValue: 'शांत और आरामदायक',
    pulsePaceBadge: 'सीटिंग उपलब्ध',
    pulseWaitTitle: 'प्रतीक्षा समय',
    pulseWaitValue: '4 – 6 मिनट',
    pulseWaitSub: 'हैंड-पोर ~8 मिनट',
    pulseOvenTitle: 'ओवन स्थिति',
    pulseOvenValue: 'बैच #3 तैयार',
    pulseOvenBadge: 'गर्मागर्म और ताज़ा',
    pulseBakesHeader: '✦ आज का ताज़ा बेक काउंटर (लाइव इन्वेंटरी)',
    pulseSoldOut: 'बिक चुका है',
    pulseLeft: 'बचे हैं',

    featuredBadge: 'सबसे पसंदीदा व्यंजन',
    featuredTitle: 'एम्बर & बीन किचन और रोस्टरी के खास व्यंजन',
    featuredExplore: 'पूरा मेनू देखें',

    viewCafeTitle: 'कैफ़े का वातावरण',
    viewCafeSubtitle: 'जुबली हिल्स में धीमी चुस्कियों, बेहतरीन जायकों और सुकून भरे पलों के लिए तैयार किए गए हमारे खूबसूरत कैफ़े को देखें।',
    viewCafeBadge: 'कैफ़े का माहौल और विज़ुअल टूर',
    filterAll: 'सभी स्थान',
    filterInterior: 'इंटीरियर और सीटिंग',
    filterBrewBar: 'ब्रू बार और रोस्टर',
    filterPatio: 'गार्डन आँगन',
    filterCorners: 'आरामदेह कोने',
    atmospherePill1: '🌿 स्वच्छ और हरित इनडोर वातावरण',
    atmospherePill2: '💡 आरामदायक अम्बर लाइटिंग (2700K)',
    atmospherePill3: '⚡ हाई-स्पीड फाइबर वाई-फाई',
    atmospherePill4: '🐕 पेट-फ्रेंडली आउटडोर छत',

    workspaceTitle: 'समर्पित वर्कस्पेस सुविधाएं',
    workspaceSubtitle: 'आरामदायक कुर्सियां, हाई-स्पीड इंटरनेट और हर टेबल पर चार्जिंग पॉइंट। कभी भी आएं, कोई पूर्व बुकिंग आवश्यक नहीं।',
    workspaceBadge: 'शांत को-वर्किंग अभयारण्य',
    workspaceFeature1Title: '300+ Mbps फाइबर वाई-फाई',
    workspaceFeature1Desc: 'प्रत्येक इनडोर टेबल और बूथ पर तेज़ और स्थिर इंटरनेट कनेक्टिविटी।',
    workspaceFeature2Title: 'समर्पित पावर पॉइंट',
    workspaceFeature2Desc: 'लैपटॉप और फोन के लिए यूनिवर्सल एसी सॉकेट और यूएसबी-सी चार्जिंग।',
    workspaceFeature3Title: 'शांत फोकस ज़ोन',
    workspaceFeature3Desc: 'गहन एकाग्रता, कोडिंग और पढ़ने के लिए शांत एवं सुखद ध्वनियाँ।',
    workspaceFeature4Title: 'काम के साथ ताज़ा कॉफी',
    workspaceFeature4Desc: 'काम करते समय आपकी टेबल पर ताज़ा पोर-ओवर और लज़ीज़ स्नैक्स सेवा।',

    wsBadge: 'रचनात्मक स्थान और रिमोट वर्क',
    wsTitle: 'वर्कस्पेस मोड और सुविधाएं',
    wsDesc: 'लेखकों, डिजाइनरों, संस्थापकों और प्रोग्रामर्स के लिए बनाया गया शांत, बिना किसी व्यवधान का प्रेरणादायक माहौल।',
    wsSpeedTest: 'स्पीड जांचें',
    wsPinging: 'जांच जारी...',
    wsWifiTitle: 'फाइबर वाई-फाई 6',
    wsWifiSpeed: '328 Mbps',
    wsWifiDesc: 'सीमलेस 4K वीडियो कॉल के लिए 4ms लेटेंसी वाली डुअल गीगाबिट लाइनें।',
    wsPowerTitle: 'पावर सॉकेट्स',
    wsPowerSeats: '16 / 16 सीटें',
    wsPowerDesc: 'सागौन की डेस्क में लगे यूनिवर्सल मल्टी-प्लग और 65W USB-C फास्ट चार्जर्स।',
    wsSoundTitle: 'ध्वनि स्तर',
    wsSoundAmbient: '48 dB शांत माहौल',
    wsSoundDesc: 'सॉफ्ट विनाइल जैज़ संगीत। फोन पर ज़ोर से बात करना वर्जित।',
    wsHoursTitle: 'लैपटॉप का समय',
    wsHoursTimes: 'सुबह 7 – शाम 6 बजे',
    wsHoursDesc: 'दिन में एकाग्र कार्य समय। शाम 6 बजे के बाद सुकून भरा संगीत।',
    wsPassBadge: 'दैनिक वर्क पास',
    wsPassPerk: 'असीमित फिल्टर कॉफी शामिल',
    wsPassTitle: 'ओपन कम्युनिटी वर्क डेस्क',
    wsPassDesc: 'एर्गोनॉमिक कुर्सियां, 320+ Mbps इंटरनेट और पूरे दिन सिंगल-ओरिजिन ब्रू उपलब्ध।',
    wsPassCta: 'सीधे वॉक-इन डेस्क (पूर्व बुकिंग की आवश्यकता नहीं)',

    storyTitle: 'हमारी कहानी, दर्शन और उपलब्धियां',
    storySubtitle: 'कैफ़े संस्कृति को फिर से परिभाषित करने की यात्रा: विश्वस्तरीय कॉफी और हाथ से बने प्रामाणिक भोजन का संगम।',
    storyBadge: 'एम्बर & बीन का दर्शन और रोस्टरी की शुरुआत',
    storyOriginBadge: 'उत्पत्ति और दर्शन',
    storyOriginTitle: 'अराकू की वादियों से जन्मी, जुबली हिल्स में रोस्ट की गई।',
    storyOriginP1: 'एम्बर & बीन की शुरुआत एक शांत विश्वास के साथ हुई: कि आंध्र प्रदेश और कर्नाटक के बायो-डायनेमिक जंगलों में उगाई जाने वाली भारतीय कॉफी की मिट्टी और स्वाद, विश्व प्रसिद्ध वाइन के समान सम्मान की हकदार है।',
    storyOriginP2: 'हमने बिचौलियों को पूरी तरह समाप्त कर दिया ताकि निष्पक्ष व्यापार मानकों से 45% अधिक मूल्य सीधे हमारे आदिवासी किसान परिवारों तक पहुंचे। प्रत्येक बैच को नियंत्रित आंच में रोस्ट किया जाता है और स्लेयर मशीनों पर सटीक ब्रू किया जाता है।',
    storyQuote: '"हम आपको जल्दी विदा करने के लिए कॉफी नहीं बनाते। हम कॉफी इसलिए बनाते हैं ताकि आप कुछ पल ठहर सकें।"',
    storyQuoteAuthor: '— विक्रम रॉय, सह-संस्थापक एवं हेड रोस्टर',
    storyGalleryBtn: '21-पलों का फ़ोटो आर्काइव देखें',
    storyMilestonesHeader: '✦ विकास और उपलब्धियां (2019 – 2026)',
    milestones: [
      { year: '2019', title: 'अराकू क्लाउड फ़ॉरेस्ट का सफर', desc: 'संस्थापक विक्रम और तारा ने छह महीने अराकू घाटी में बिताए, जहां आदिवासी किसान सहकारी समितियों के साथ मिलकर विशेष प्राकृतिक कॉफी की खोज की।' },
      { year: '2021', title: 'कास्ट-आयरन रोस्टर का आगमन', desc: 'जुबली हिल्स में हमारा 12 किग्रा विंटेज रोस्टर स्थापित हुआ, जिससे ताज़ा खुशबू के लिए सप्ताह में 3 बार रोस्टिंग शुरू हुई।' },
      { year: '2023', title: 'सॉरडो और बेकरी विस्तार', desc: 'स्टोन डेक पेस्ट्री किचन की शुरुआत, जहां 72-घंटे फर्मेंटेड सॉरडो और बटर पेस्ट्री बनाई जाती हैं।' },
      { year: '2026', title: 'हैदराबाद का प्रमुख स्पेशलिटी कैफ़े', desc: 'विनाइल जैज़ संगीत, हाई-स्पीड रिमोट क्रिएटिव डेस्क और बायोडायनेमिक कॉफी का अनूठा संगम।' },
    ],

    sustBadge: 'पर्यावरण और संरक्षण',
    sustTitle: 'स्थिरता और सकारात्मक प्रभाव',
    sustDesc: 'बेहतरीन कॉफी प्रकृति को समृद्ध बनाती है, नुकसान नहीं पहुंचाती। हम शून्य-कचरा ब्रूइंग और सीधे आदिवासी सहयोग का पालन करते हैं।',
    sustStat1Number: '14,200+',
    sustStat1Title: 'पुनर्चक्रित कप',
    sustStat1Desc: 'अपने कप पर छूट और कम्पोस्टेबल सामग्री के माध्यम से कचरा मुक्ति।',
    sustStat2Number: '+45%',
    sustStat2Title: 'फेयर ट्रेड से ऊपर',
    sustStat2Desc: 'बिना किसी बिचौलिये के सीधे आदिवासी किसानों को भुगतान।',
    sustStat3Number: '1,240+',
    sustStat3Title: 'देशी छायादार पेड़ लगाए गए',
    sustStat3Desc: 'अराकू घाटी में जैव विविधता की रक्षा के लिए लगाए गए पौधे।',
    sustStat4Number: '100%',
    sustStat4Title: 'सौर ऊर्जा से संचालित रोस्टरी',
    sustStat4Desc: 'छत पर सोलर पैनल और कॉफी की भूसी से चलने वाला हरित हीटिंग सिस्टम।',

    menuTitle: 'गॉरमेट किचन और आर्टिसनल रोस्टरी',
    menuSubtitle: 'हैंडक्राफ्टेड सिंगल-ओरिजिन कॉफी, 48-घंटे फर्मेंटेड सॉरडो पिज़्ज़ा, स्मैश्ड ब्रियोश बर्गर, ट्रफल फ्राइज़ और गाढ़े थिक शेक्स।',
    menuBadge: 'एम्बर & बीन क्राफ्ट मेनू · 11 श्रेणियां',
    catAll: 'सभी व्यंजन',
    catBurgers: 'स्वादिष्ट बर्गर',
    catPizzas: 'सॉरडो पिज़्ज़ा',
    catFries: 'लोडेड फ्राइज़',
    catColdDrinks: 'शेक्स और कूलर्स',
    catCoffee: 'स्पेशलिटी कॉफी',
    catTea: 'आर्टिसनल चाय',
    catBreakfast: 'मॉर्निंग नाश्ता',
    catBrunch: 'ऑल-डे ब्रंच',
    catPastries: 'बेकरी और क्रफिन्स',
    catDesserts: 'मीठे व्यंजन',
    menuSearchPlaceholder: 'कॉफी, बर्गर, पिज़्ज़ा, फ्राइज़ खोजें...',
    menuFilterBtn: 'फ़िल्टर',
    menuFilterDiet: 'आहार प्राथमिकताएं',
    menuFilterVegan: 'शाकाहारी (वीगन)',
    menuFilterGlutenFree: 'ग्लूटेन-मुक्त',
    menuFilterNutFree: 'नट-मुक्त',
    menuReset: 'सभी फ़िल्टर रीसेट करें',

    reviewsBadge: 'अतिथि समीक्षाएं और अनुभव',
    reviewsTitle: 'हैदराबाद के कॉफी और भोजन प्रेमियों की पसंद',
    reviewsSubtitle: 'लेखकों, डिजाइनरों, फूड समीक्षकों और वीकेंड ब्रंच प्रेमियों के वास्तविक अनुभव।',

    faqBadge: 'अक्सर पूछे जाने वाले प्रश्न',
    faqTitle: 'महत्वपूर्ण जानकारियां',
    faqDesc: 'हमारी सोर्सिंग, आरक्षण, वर्कस्पेस नीतियों और डिलीवरी के बारे में सब कुछ।',
    faqQ1: 'आप अपनी कॉफी बीन्स कहां से मंगाते हैं?',
    faqA1: 'हम विशेष रूप से आंध्र प्रदेश की अराकू घाटी और कुर्ग के जैव-विविध खेतों से कॉफी बीन्स लाते हैं। हाथ से तोड़ी गई बीन्स को जुबली हिल्स में प्रति सप्ताह रोस्ट किया जाता है।',
    faqQ2: 'क्या यह कैफ़े रिमोट वर्क और लैपटॉप के लिए अनुकूल है?',
    faqA2: 'हाँ! हमारे पास सुबह 7 से शाम 6 बजे तक 320+ Mbps वाई-फाई 6, हर डेस्क पर पावर आउटलेट्स और आरामदायक कुर्सियों के साथ समर्पित वर्कस्पेस उपलब्ध है।',
    faqQ3: 'आपके बर्गर और पिज़्ज़ा की क्या खासियत है?',
    faqA3: 'हमारे पिज़्ज़ा 48-घंटे फर्मेंटेड सॉरडो और इटैलियन सैन मार्ज़ानो टमाटर से बनते हैं, और बर्गर ताज़ा स्मैश पैटीज़ के साथ ब्रियोश बन्स में परोसे जाते हैं।',
    faqQ4: 'क्या वैलेट पार्किंग उपलब्ध है?',
    faqA4: 'हाँ, रोड नं. 36 पर कैफ़े के ठीक सामने प्रतिदिन सुबह 7:00 से रात 11:00 बजे तक निःशुल्क वैलेट पार्किंग उपलब्ध है।',

    locationBadge: 'हमसे मिलें',
    locationTitle: 'जुबली हिल्स, हैदराबाद में एम्बर & बीन',
    locationDesc: 'प्लॉट 42, रोड नं. 36, जुबली हिल्स, हैदराबाद। प्रतिदिन सुबह 7 से रात 11 बजे तक।',
    locationDirectionsBtn: 'मैप पर रास्ता देखें',
    locationCallBtn: 'कैफ़े को कॉल करें',

    footerBio:
      'जुबली हिल्स, हैदराबाद में एक आर्टिसनल स्पेशलिटी कॉफी रोस्टरी और बुटीक किचन। सिंगल-ओरिजिन पारदर्शिता, लज़ीज़ भोजन और सुकून भरे पलों को समर्पित।',
    footerExplore: 'पेज देखें',
    footerServices: 'अतिथि सेवाएं',
    footerRoastery: 'फ्लैगशिप रोस्टरी',
    footerAddress: 'प्लॉट 42, रोड नं. 36, जुबली हिल्स, हैदराबाद, तेलंगाना 500033',
    footerHours: 'सोम-रवि: सुबह 7:00 – रात 11:00',
    footerValet: 'निःशुल्क वैलेट पार्किंग',
    footerRights: 'एम्बर & बीन कैफ़े · सर्वाधिकार सुरक्षित',
    footerViewCafe: 'कैफ़े का माहौल देखें',
    footerWorkspace: 'रिमोट वर्कस्पेस सुविधाएं',
    footerStory: 'हमारी कहानी और उपलब्धियां',
    footerMenu: 'क्राफ्ट मेनू (11 श्रेणियां)',
  },

  te: {
    brandName: 'ఎంబర్ & బీన్',
    brandCity: 'జూబ్లీ హిల్స్ · హైదరాబాద్',
    navMenu: 'క్రాఫ్ట్ మెనూ',
    navViewCafe: 'కేఫ్ చూడండి',
    navWorkspace: 'వర్క్‌స్పేస్',
    navStory: 'మా కథ',
    openNow: 'ఇప్పుడు తెరిచి ఉంది · జూబ్లీ హిల్స్',
    opensAt: 'ఉదయం 7:00 గంటలకు తెరుచుకుంటుంది',
    langSelect: 'భాష',

    moodMorning: '☀️ మార్నింగ్ బూస్ట్',
    moodAfternoon: '⛅ ఆఫ్టర్నూన్ రీసెట్',
    moodEvening: '🌙 ఈవెనింగ్ విశ్రాంతి',

    heroTagline: 'ఎంబర్ & బీన్ · ఆర్టిసానల్ రోస్టరీ & కిచెన్',
    heroTitle1: 'స్లో కాఫీ.',
    heroTitle2: 'రుచికరమైన ఆహారం.',
    heroTitle3: 'మధుర క్షణాలు.',
    heroDescription:
      'కేవలం ఒక కేఫ్ మాత్రమే కాదు. చేతితో తయారుచేసిన సింగిల్-ఆరిజిన్ అరకు బ్రూస్, 48-గంటల పులియబెట్టిన సోర్డో పిజ్జాలు, హ్యాండ్-స్మాష్డ్ బ్రియోష్ బర్గర్లు, క్రిస్పీ ట్రఫుల్ ఫ్రైస్ మరియు ప్రశాంతమైన ఆతిథ్యం.',
    pillCoffee: '☕ స్పెషాలిటీ పోర్-ఓవర్ & బ్రూస్',
    pillBurgers: '🍔 స్మాష్డ్ బ్రియోష్ బర్గర్స్',
    pillPizzas: '🍕 48 గంటల ఫెర్మెంటెడ్ పిజ్జాలు',
    pillFries: '🍟 లోడెడ్ ట్రఫుల్ ఫ్రైస్',
    pillShakes: '🥤 మాన్స్టర్ కోల్డ్ షేక్స్',
    heroExploreMenu: 'క్రాఫ్ట్ మెనూ చూడండి',
    heroViewCafe: 'కేఫ్ వాతావరణం చూడండి',
    heroKitchenHours: 'కిచెన్ & బ్రూ బార్ యాక్టివ్ · ప్రతిరోజూ ఉదయం 7:00 నుండి రాత్రి 11:00 వరకు',
    heroRatings: '4.9 ★ రేటింగ్ (2,400+ అతిథులు & కాఫీ ప్రియులు)',
    heroAward: 'బెస్ట్ స్పెషాలిటీ రోస్టరీ & కిచెన్ 2026',
    reelBadge: 'ఎంబర్ & బీన్ లైవ్ రీల్',
    reelSoundOn: 'సౌండ్ ఆన్',
    reelSoundOff: 'సౌండ్ ఆఫ్',
    reelTapHint: 'శబ్దం వినడానికి సౌండ్ బటన్ నొక్కండి · జూబ్లీ హిల్స్, హైదరాబాద్',

    pulseTitle: 'లైవ్ కేఫ్ పల్స్',
    pulseStatus: 'ప్రశాంతమైన మరియు వెచ్చని వాతావరణం · పని చేయడానికి మరియు విశ్రాంతిగా భోజనం చేయడానికి అనువైనది',
    pulseRoast: 'ప్రస్తుత రోస్టింగ్ బ్యాచ్: అరకు వ్యాలీ గీషా వాష్ #42',
    pulseTemp: 'జూబ్లీ హిల్స్ · ఇండోర్ ఉష్ణోగ్రత 23°C',
    pulseHeaderTitle: 'లైవ్ రోస్టరీ & కేఫ్ పల్స్',
    pulseHeaderBadge: 'జూబ్లీ హిల్స్ ఫ్లోర్',
    pulseHeaderDesc: 'రియల్-టైమ్ సీటింగ్ లభ్యత, కిచెన్ ఆర్డర్లు మరియు తాజా బేకింగ్ బ్యాచ్‌లు',
    pulsePaceTitle: 'ప్రస్తుత రద్దీ',
    pulsePaceValue: 'ప్రశాంతమైన వాతావరణం',
    pulsePaceBadge: 'సీట్లు అందుబాటులో ఉన్నాయి',
    pulseWaitTitle: 'వెయిటింగ్ సమయం',
    pulseWaitValue: '4 – 6 నిమిషాలు',
    pulseWaitSub: 'హ్యాండ్-పోర్స్ ~8 నిమిషాలు',
    pulseOvenTitle: 'ఓవెన్ స్టేటస్',
    pulseOvenValue: 'బ్యాచ్ #3 సిద్ధం',
    pulseOvenBadge: 'వేడివేడిగా మరియు తాజా',
    pulseBakesHeader: '✦ నేటి తాజా బేకరీ కౌంటర్ (లైవ్ లభ్యత)',
    pulseSoldOut: 'పూర్తయ్యాయి',
    pulseLeft: 'మిగిలి ఉన్నాయి',

    featuredBadge: 'అత్యంత ఇష్టపడే వంటకాలు',
    featuredTitle: 'ఎంబర్ & బీన్ కిచెన్ & రోస్టరీ ప్రత్యేకతలు',
    featuredExplore: 'పూర్తి మెనూ చూడండి',

    viewCafeTitle: 'కేఫ్ అనుభవం',
    viewCafeSubtitle: 'జూబ్లీ హిల్స్‌లో ప్రశాంతమైన సిప్‌లు, అద్భుతమైన రుచులు మరియు విశ్రాంతి క్షణాల కోసం రూపొందించిన మా కేఫ్ లోపలి వాతావరణాన్ని చూడండి.',
    viewCafeBadge: 'కేఫ్ వాతావరణం & విజువల్ టూర్',
    filterAll: 'అన్ని ప్రదేశాలు',
    filterInterior: 'ఇంటీరియర్ & సీటింగ్',
    filterBrewBar: 'బ్రూ బార్ & రోస్టర్',
    filterPatio: 'గార్డెన్ డాబా',
    filterCorners: 'ప్రశాంతమైన మూలలు',
    atmospherePill1: '🌿 గాలిని శుద్ధి చేసే ఇండోర్ పచ్చదనం',
    atmospherePill2: '💡 వెచ్చని అంబర్ లైటింగ్ (2700K)',
    atmospherePill3: '⚡ హై-స్పీడ్ ఫైబర్ వై-ఫై',
    atmospherePill4: '🐕 పెట్-ఫ్రెండ్లీ అవుట్‌డోర్ టెర్రస్',

    workspaceTitle: 'ప్రత్యేక వర్క్‌స్పేస్ సౌకర్యాలు',
    workspaceSubtitle: 'సౌకర్యవంతమైన సీట్లు, హై-స్పీడ్ ఇంటర్నెట్ మరియు ప్రతి డెస్క్ వద్ద ఛార్జింగ్ పాయింట్లు. ఎప్పుడైనా రావచ్చు, ముందస్తు బుకింగ్ అవసరం లేదు.',
    workspaceBadge: 'ప్రశాంతమైన కో-వర్కింగ్ ప్రదేశం',
    workspaceFeature1Title: '300+ Mbps ఫైబర్ వై-ఫై',
    workspaceFeature1Desc: 'ప్రతి ఇండోర్ టేబుల్ వద్ద వేగవంతమైన మరియు స్థిరమైన ఇంటర్నెట్ కనెక్టివిటీ.',
    workspaceFeature2Title: 'ప్రత్యేక పవర్ పాయింట్లు',
    workspaceFeature2Desc: 'ల్యాప్‌టాప్‌లు మరియు ఫోన్‌ల కోసం యూనివర్సల్ ఏసీ సాకెట్లు మరియు టైప్-సి ఫాస్ట్ ఛార్జింగ్.',
    workspaceFeature3Title: 'ప్రశాంతమైన ఫోకస్ జోన్‌లు',
    workspaceFeature3Desc: 'ఏకాగ్రతతో పని చేయడానికి, కోడింగ్ మరియు చదువుకోవడానికి అనువైన శబ్దాలు.',
    workspaceFeature4Title: 'పని చేస్తూ తాజా కాఫీ',
    workspaceFeature4Desc: 'మీరు పని చేసుకుంటూ తాజా పోర్-ఓవర్ కాఫీ మరియు రుచికరమైన స్నాక్స్ ఆస్వాదించవచ్చు.',

    wsBadge: 'సృజనాత్మక శాంతియుత వర్క్‌స్పేస్',
    wsTitle: 'వర్క్‌స్పేస్ సౌకర్యాలు',
    wsDesc: 'రచయితలు, డిజైనర్లు, వ్యవస్థాపకులు మరియు ఇంజనీర్ల కోసం ప్రత్యేకంగా రూపొందించిన ప్రశాంతమైన వాతావరణం.',
    wsSpeedTest: 'స్పీడ్ టెస్ట్',
    wsPinging: 'పరిశీలిస్తోంది...',
    wsWifiTitle: 'ఫైబర్ వై-ఫై 6',
    wsWifiSpeed: '328 Mbps',
    wsWifiDesc: 'ఎటువంటి అంతరాయం లేని 4K వీడియో కాల్స్ కోసం 4ms వేగవంతమైన ఇంటర్నెట్.',
    wsPowerTitle: 'పవర్ సాకెట్లు',
    wsPowerSeats: '16 / 16 సీట్లు',
    wsPowerDesc: 'ప్రతి డెస్క్ వద్ద యూనివర్సల్ మల్టీ-ప్లగ్ మరియు 65W USB-C ఫాస్ట్ ఛార్జర్లు.',
    wsSoundTitle: 'శబ్ద స్థాయి',
    wsSoundAmbient: '48 dB ప్రశాంతత',
    wsSoundDesc: 'మంద్రమైన వినైల్ జాజ్ సంగీతం. ఫోన్ లౌడ్‌స్పీకర్లు అనుమతించబడవు.',
    wsHoursTitle: 'ల్యాప్‌టాప్ సమయాలు',
    wsHoursTimes: 'ఉదయం 7 – సాయంత్రం 6',
    wsHoursDesc: 'పగటిపూట ప్రత్యేక పని వాతావరణం. సాయంత్రం 6 తర్వాత ఆహ్లాదకరమైన విశ్రాంతి.',
    wsPassBadge: 'డే వర్క్ పాస్',
    wsPassPerk: 'అపరిమిత ఫిల్టర్ కాఫీ ఉచితం',
    wsPassTitle: 'ఓపెన్ కమ్యూనిటీ వర్క్ డెస్క్‌లు',
    wsPassDesc: 'సౌకర్యవంతమైన కుర్చీలు, 320+ Mbps ఇంటర్నెట్ మరియు రోజంతా కాఫీ సౌకర్యం.',
    wsPassCta: 'డైరెక్ట్ వాక్-ఇన్ డెస్క్‌లు (ముందస్తు బుకింగ్ అవసరం లేదు)',

    storyTitle: 'మా కథ, సిద్ధాంతం & మైలురాళ్ళు',
    storySubtitle: 'హైదరాబాద్‌లో నాణ్యమైన కాఫీ మరియు చేతితో తయారుచేసిన తాజా ఆహార సంస్కృతిని సృష్టించేందుకు ప్రారంభించబడింది.',
    storyBadge: 'ఎంబర్ & బీన్ సిద్ధాంతం & రోస్టరీ ప్రారంభం',
    storyOriginBadge: 'పుట్టుక & సిద్ధాంతం',
    storyOriginTitle: 'అరకు పొగమంచుల్లో చిగురించి, జూబ్లీహిల్స్‌లో రోస్ట్ చేయబడింది.',
    storyOriginP1: 'ఆంధ్రప్రదేశ్ మరియు కర్ణాటక అడవులలో పండే భారతీయ కాఫీ రుచి, ప్రపంచ శ్రేష్ఠమైన కాఫీలకు సమానమైన గౌరవానికి అర్హమైనది అనే గట్టి నమ్మకంతో ఎంబర్ & బీన్ ప్రారంభమైంది.',
    storyOriginP2: 'మధ్యవర్తులను తొలగించి ఫెయిర్ ట్రేడ్ కంటే సగటున 45% ఎక్కువ మొత్తాన్ని నేరుగా మా గిరిజన రైతు కుటుంబాలకు అందిస్తున్నాము. ప్రతి కాఫీ బ్యాచ్ ప్రత్యేక సంరక్షణతో రోస్ట్ చేయబడి, స్లేయర్ మెషీన్లపై ఖచ్చితత్వంతో తయారు చేయబడుతుంది.',
    storyQuote: '"మిమ్మల్ని త్వరగా పంపించడానికి మేము కాఫీ తయారు చేయము. కాసేపు ప్రశాంతంగా విశ్రాంతి తీసుకోవాలని మేము కాఫీ అందిస్తాము."',
    storyQuoteAuthor: '— విక్రమ్ రాయ్, సహ వ్యవస్థాపకుడు & హెడ్ రోస్టర్',
    storyGalleryBtn: '21-క్షణాల ఫోటో ఆర్కైవ్ చూడండి',
    storyMilestonesHeader: '✦ మైలురాళ్ళు & ప్రయాణం (2019 – 2026)',
    milestones: [
      { year: '2019', title: 'అరకు లోయ ప్రయాణం', desc: 'వ్యవస్థాపకులు విక్రమ్ & తారా ఆరు నెలల పాటు అరకు లోయలో ఉండి గిరిజన రైతులతో కలిసి ప్రత్యేక కాఫీ సేకరణ ప్రారంభించారు.' },
      { year: '2021', title: 'వింటేజ్ రోస్టర్ రాక', desc: 'జూబ్లీహిల్స్‌లో 12 కేజీల వింటేజ్ రోస్టర్ ఏర్పాటు చేసి, వారానికి 3 సార్లు తాజా రోస్టింగ్ మొదలుపెట్టాము.' },
      { year: '2023', title: 'సార్డో & బేకరీ విస్తరణ', desc: 'స్టోన్ డెక్ పేస్ట్రీ కిచెన్ ద్వారా 72 గంటల పులియబెట్టిన సార్డో రొట్టెలు మరియు బటర్ పేస్ట్రీల తయారీ ప్రారంభం.' },
      { year: '2026', title: 'హైదరాబాద్ ఫ్లాగ్‌షిప్ కేఫ్', desc: 'వినైల్ జాజ్ సంగీతం, హై-స్పీడ్ రిమోట్ వర్క్‌స్పేస్ మరియు బయోడైనమిక్ కాఫీతో కూడిన అనుభూతి.' },
    ],

    sustBadge: 'పర్యావరణ స్పృహ & ప్రకృతి పరిరక్షణ',
    sustTitle: 'సుస్థిరత & పునరుత్పత్తి ప్రభావం',
    sustDesc: 'మంచి కాఫీ భూమిని కాపాడాలి. మేము జీరో-వేస్ట్ బ్రూయింగ్ మరియు గిరిజన రైతులతో ప్రత్యక్ష భాగస్వామ్యాన్ని పాటిస్తాము.',
    sustStat1Number: '14,200+',
    sustStat1Title: 'రీసైకిల్ చేసిన కప్పులు',
    sustStat1Desc: 'పర్యావరణ అనుకూల కప్పుల ద్వారా ప్లాస్టిక్ రహిత విధానం.',
    sustStat2Number: '+45%',
    sustStat2Title: 'రైతులకు అధిక లాభం',
    sustStat2Desc: 'దళారులు లేకుండా నేరుగా గిరిజన రైతులకు లభించే చెల్లింపులు.',
    sustStat3Number: '1,240+',
    sustStat3Title: 'స్థానిక నీడ చెట్లు నాటబడ్డాయి',
    sustStat3Desc: 'అరకు లోయలో పచ్చదనం కోసం నాటిన మొక్కలు.',
    sustStat4Number: '100%',
    sustStat4Title: 'సౌర శక్తితో రోస్టింగ్',
    sustStat4Desc: 'సౌర విద్యుత్ మరియు కాఫీ పొట్టుతో నడిచే పరిశుభ్రమైన రోస్టరీ.',

    menuTitle: 'గోర్మెట్ కిచెన్ & ఆర్టిసానల్ రోస్టరీ',
    menuSubtitle: 'చేతితో తయారుచేసిన సింగిల్-ఆరిజిన్ కాఫీలు, 48-గంటల పులియబెట్టిన సోర్డో పిజ్జాలు, స్మాష్డ్ బ్రియోష్ బర్గర్లు, లోడెడ్ ట్రఫుల్ ఫ్రైస్ మరియు మాన్స్టర్ షేక్స్.',
    menuBadge: 'ఎంబర్ & బీన్ క్రాఫ్ట్ మెనూ · 11 విభాగాలు',
    catAll: 'అన్ని రకాల వంటకాలు',
    catBurgers: 'రుచికరమైన బర్గర్లు',
    catPizzas: 'సార్డో పిజ్జాలు',
    catFries: 'లోడెడ్ ఫ్రైస్',
    catColdDrinks: 'షేక్స్ & కూలర్స్',
    catCoffee: 'స్పెషాలిటీ కాఫీ',
    catTea: 'ప్రత్యేక టీలు',
    catBreakfast: 'ఉదయపు అల్పాహారం',
    catBrunch: 'ఆల్-డే బ్రంచ్',
    catPastries: 'బేకరీ & క్రాఫిన్స్',
    catDesserts: 'డెజర్ట్స్',
    menuSearchPlaceholder: 'కాఫీ, బర్గర్, పిజ్జా, ఫ్రైస్ వెతకండి...',
    menuFilterBtn: 'ఫిల్టర్లు',
    menuFilterDiet: 'ఆహార ప్రాధాన్యతలు',
    menuFilterVegan: 'శాఖాహారం (వీగన్)',
    menuFilterGlutenFree: 'గ్లూటెన్-ఫ్రీ',
    menuFilterNutFree: 'నట్-ఫ్రీ',
    menuReset: 'అన్ని ఫిల్టర్లు రీసెట్ చేయండి',

    reviewsBadge: 'అతిథుల సమీక్షలు & అనుభవాలు',
    reviewsTitle: 'హైదరాబాద్ కాఫీ మరియు ఆహార ప్రియుల అభిమానం',
    reviewsSubtitle: 'రచయితలు, డిజైనర్లు, ఫుడ్ క్రిటిక్స్ మరియు వీకెండ్ బ్రంచ్ ప్రియుల నిజమైన అనుభవాలు.',

    faqBadge: 'తరచుగా అడిగే ప్రశ్నలు',
    faqTitle: 'ముఖ్యమైన సమాచారం',
    faqDesc: 'మా కాఫీ సేకరణ, వర్క్‌స్పేస్ నిబంధనలు మరియు సేవల గురించిన వివరాలు.',
    faqQ1: 'మీరు కాఫీ గింజలను ఎక్కడి నుండి సేకరిస్తారు?',
    faqA1: 'మేము ఆంధ్రప్రదేశ్‌లోని అరకు లోయ మరియు కూర్గ్ ప్రాంతాల నుండి సహజ పద్ధతుల్లో పండించిన కాఫీ గింజలను సేకరిస్తాము. ప్రతి వారం జూబ్లీహిల్స్‌లో తాజాగా రోస్ట్ చేస్తాము.',
    faqQ2: 'కేఫ్‌లో ల్యాప్‌టాప్‌తో పనిచేసుకోవచ్చా?',
    faqA2: 'అవును! ఉదయం 7 నుండి సాయంత్రం 6 వరకు 320+ Mbps వై-ఫై, ప్రతి డెస్క్ వద్ద ఛార్జింగ్ పాయింట్లు మరియు సౌకర్యవంతమైన కుర్చీలతో కూడిన వర్క్‌స్పేస్ అందుబాటులో ఉంది.',
    faqQ3: 'మీ బర్గర్లు మరియు పిజ్జాల ప్రత్యేకత ఏమిటి?',
    faqA3: 'మా పిజ్జాలు 48 గంటల పులియబెట్టిన సోర్డో పిండితో, ఇటాలియన్ టొమాటోలతో తయారు చేయబడతాయి. బర్గర్లు తాజా బ్రియోష్ బన్స్‌తో అందించబడతాయి.',
    faqQ4: 'వాలెట్ పార్కింగ్ అందుబాటులో ఉందా?',
    faqA4: 'అవును, రోడ్ నెం. 36 వద్ద కేఫ్ ముందు ప్రతిరోజూ ఉదయం 7:00 నుండి రాత్రి 11:00 వరకు ఉచిత వాలెట్ పార్కింగ్ సౌకర్యం ఉంది.',

    locationBadge: 'మమ్మల్ని సందర్శించండి',
    locationTitle: 'జూబ్లీహిల్స్, హైదరాబాద్‌లో ఎంబర్ & బీన్',
    locationDesc: 'ప్లాట్ 42, రోడ్ నెం. 36, జూబ్లీహిల్స్, హైదరాబాద్. ప్రతిరోజూ ఉదయం 7 నుండి రాత్రి 11 వరకు.',
    locationDirectionsBtn: 'మ్యాప్‌లో దారి చూడండి',
    locationCallBtn: 'కేఫ్‌కు కాల్ చేయండి',

    footerBio:
      'జూబ్లీ హిల్స్, హైదరాబాద్‌లోని ఆర్టిసానల్ స్పెషాలిటీ కాఫీ రోస్టరీ మరియు బొటిక్ కిచెన్. సింగిల్-ఆరిజిన్ పారదర్శకత, చేతితో తయారుచేసిన ఆహారం మరియు ప్రశాంతమైన క్షణాలకు అంకితం.',
    footerExplore: 'పేజీలు చూడండి',
    footerServices: 'అతిథి సేవలు',
    footerRoastery: 'ఫ్లాగ్‌షిప్ రోస్టరీ',
    footerAddress: 'ప్లాట్ 42, రోడ్ నెం. 36, జూబ్లీ హిల్స్, హైదరాబాద్, తెలంగాణ 500033',
    footerHours: 'సోమ-ఆది: ఉదయం 7:00 – రాత్రి 11:00',
    footerValet: 'ఉచిత వాలెట్ పార్కింగ్',
    footerRights: 'ఎంబర్ & బీన్ కేఫ్ · అన్ని హక్కులు ప్రత్యేకించబడ్డాయి',
    footerViewCafe: 'కేఫ్ వాతావరణం చూడండి',
    footerWorkspace: 'రిమోట్ వర్క్‌స్పేస్ సౌకర్యాలు',
    footerStory: 'మా కథ & మైలురాళ్ళు',
    footerMenu: 'క్రాఫ్ట్ మెనూ (11 విభాగాలు)',
  },
};
