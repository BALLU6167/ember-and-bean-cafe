import { MenuItem, TableZone, OriginBean } from '../types/spatial';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'aura-signature-latte',
    name: 'AURA Gold Velvet Latte',
    category: 'signature',
    price: 8.50,
    description: 'Double shot Geisha espresso infused with organic oat silk milk, topped with 24k edible gold leaf dust and raw Madagascar vanilla bean syrup.',
    rating: 4.9,
    cuppingScore: 95,
    roastLevel: 'Medium',
    tags: ['Signature', 'Gold Leaf', 'Best Seller'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    origin: 'Panama Geisha (Boquete)',
    flavorProfile: { acidity: 7, body: 9, sweetness: 9, aroma: 10 },
    volume: '350 ml',
    isPopular: true
  },
  {
    id: 'ethiopian-yirgacheffe-pourover',
    name: 'Yirgacheffe Heirloom Pour-Over',
    category: 'pourover',
    price: 9.00,
    description: 'Hand-poured through Japanese V60 filter. Delivers sparkling bergamot notes, wild jasmine aromas, and a crisp peach-tea finish.',
    rating: 4.95,
    cuppingScore: 96,
    roastLevel: 'Light',
    tags: ['Single Origin', 'Hand Pour', 'Floral'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    origin: 'Gedeo Zone, Ethiopia (2,200m)',
    flavorProfile: { acidity: 9, body: 6, sweetness: 8, aroma: 10 },
    volume: '300 ml',
    isPopular: true
  },
  {
    id: 'nitro-obsidian-drip',
    name: 'Obsidian Nitro Cold Brew',
    category: 'coldbrew',
    price: 7.50,
    description: '24-hour slow cold extraction charged with pure nitrogen. Silky stout-like cascade with deep dark chocolate and charred plum notes.',
    rating: 4.85,
    cuppingScore: 92,
    roastLevel: 'Dark',
    tags: ['Nitro Cascading', 'Zero Sugar', 'Chilled'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800',
    origin: 'Huila, Colombia (1,850m)',
    flavorProfile: { acidity: 4, body: 10, sweetness: 7, aroma: 8 },
    volume: '400 ml'
  },
  {
    id: 'cortado-obsidian',
    name: 'Smoked Cinnamon Cortado',
    category: 'espresso',
    price: 6.50,
    description: 'Equal parts denseristretto espresso and warm velvety microfoam, dusted with Applewood smoked Ceylon cinnamon.',
    rating: 4.8,
    cuppingScore: 91,
    roastLevel: 'Medium',
    tags: ['Classic', 'Ristretto', 'Spiced'],
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800',
    origin: 'Tarrazu, Costa Rica',
    flavorProfile: { acidity: 6, body: 8, sweetness: 8, aroma: 9 },
    volume: '150 ml'
  },
  {
    id: 'geisha-reserve-espresso',
    name: 'Panama Geisha Reserve Shot',
    category: 'espresso',
    price: 12.00,
    description: 'Extracted at precise 9.2 bar pressure. Rare microlot coffee offering nectarine sweetness, white floral aromatics, and velvet acidity.',
    rating: 5.0,
    cuppingScore: 98,
    roastLevel: 'Light',
    tags: ['Microlot', 'Rare', '98 Score'],
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800',
    origin: 'Hacienda La Esmeralda, Panama',
    flavorProfile: { acidity: 10, body: 7, sweetness: 10, aroma: 10 },
    volume: '40 ml',
    isPopular: true
  },
  {
    id: 'artisan-cardamom-croissant',
    name: 'Smoked Honey & Pistachio Croissant',
    category: 'pastry',
    price: 6.00,
    description: '72-layer laminated French butter croissant filled with pistachio praline and drizzled with wild lavender smoked honey.',
    rating: 4.9,
    cuppingScore: 90,
    roastLevel: 'Medium',
    tags: ['Freshly Baked', 'Laminated', 'Artisan'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    origin: 'AURA In-House Bakery',
    flavorProfile: { acidity: 2, body: 9, sweetness: 9, aroma: 9 },
    volume: '160 g'
  },
  {
    id: 'matcha-cloud-tonic',
    name: 'Ceremonial Matcha Spatial Cloud',
    category: 'signature',
    price: 8.00,
    description: 'First-harvest Uji ceremonial matcha whisked over sparkling yuzu tonic, layered with sweet coconut cold foam.',
    rating: 4.85,
    cuppingScore: 94,
    roastLevel: 'Light',
    tags: ['Uji Matcha', 'Layered Cloud', 'Refreshing'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800',
    origin: 'Kyoto Prefecture, Japan',
    flavorProfile: { acidity: 8, body: 7, sweetness: 7, aroma: 9 },
    volume: '380 ml'
  },
  {
    id: 'dark-chocolate-tart',
    name: '70% Valrhona Dark Chocolate Ganache Tart',
    category: 'pastry',
    price: 7.50,
    description: 'Single-origin Venezuelan dark chocolate ganache set in a cocoa sable shell with sea salt flakes and roasted cocoa nibs.',
    rating: 4.92,
    cuppingScore: 93,
    roastLevel: 'Dark',
    tags: ['Single Origin Cocoa', 'Decadent', 'Sea Salt'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    origin: 'AURA Confectionery Lab',
    flavorProfile: { acidity: 3, body: 10, sweetness: 8, aroma: 9 },
    volume: '140 g'
  }
];

export const ORIGIN_BEANS: OriginBean[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Ethiopia Yirgacheffe Gedeo',
    country: 'Ethiopia',
    region: 'Gedeo Zone, Yirgacheffe',
    altitude: '1,950 – 2,200 meters',
    process: 'Natural Anaerobic Fermentation',
    cuppingScore: 96,
    harvestDate: 'November 2025',
    flavorNotes: ['Wild Jasmine', 'White Peach', 'Bergamot Citrus', 'Earl Grey Finish'],
    description: 'Sourced from smallholder heirloom farms in the lush high-altitude canopy of Gedeo. Naturally fermented under shaded drying beds for 28 days to unlock intense floral aromatics.',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'panama-geisha-boquete',
    name: 'Panama Geisha Esmeralda',
    country: 'Panama',
    region: 'Boquete, Volcan Baru',
    altitude: '1,800 – 2,050 meters',
    process: 'Washed Microlot',
    cuppingScore: 98,
    harvestDate: 'January 2026',
    flavorNotes: ['Mandarin Blossom', 'Meyer Lemon', 'Papaya Nectar', 'Silky Honey'],
    description: 'The pinnacle of specialty coffee. Grown on the volcanic slopes of Mt. Baru where rich cloud cover and mineral soil foster unmatchable complexity.',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'colombia-huila-pink',
    name: 'Colombia Huila Pink Bourbon',
    country: 'Colombia',
    region: 'San Adolfo, Huila',
    altitude: '1,750 – 1,900 meters',
    process: 'Thermal Shock Yeast Ferment',
    cuppingScore: 94,
    harvestDate: 'December 2025',
    flavorNotes: ['Red Apple Crisp', 'Pink Grapefruit', 'Caramel Fudge', 'Cacao Nibs'],
    description: 'Rare Pink Bourbon mutation processed with thermal shock water treatment, highlighting vibrant fruit acids balanced by buttery sweetness.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800'
  }
];

export const TABLE_ZONES: TableZone[] = [
  {
    id: 'zone-glasshouse',
    name: 'Terrace Botanical Glasshouse',
    description: 'Flooded with ambient natural light, surrounding lush tropical flora and floating acoustic spatial panels.',
    capacity: '2 – 6 Guests per alcove',
    atmosphere: 'Luminous, Serene, Acoustic Isolation',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    availableTables: 4
  },
  {
    id: 'zone-roaster-bar',
    name: 'Chef’s Roaster Bar & Cupping Desk',
    description: 'Front-row spatial seats directly facing our Diedrich 12kg Custom Roaster and master barista cupping station.',
    capacity: '1 – 4 Guests',
    atmosphere: 'Interactive, Sensory, Artisanal',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800',
    availableTables: 2
  },
  {
    id: 'zone-fireside-booth',
    name: 'Obsidian Fireside Booths',
    description: 'Plush velvet sunken seating with private ambient dimming, heated stone tabletops, and spatial acoustic shielding.',
    capacity: '4 – 8 Guests',
    atmosphere: 'Intimate, Luxurious, Deep Warmth',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    availableTables: 3
  }
];
