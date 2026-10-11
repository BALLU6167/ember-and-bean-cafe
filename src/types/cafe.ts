export type MenuCategory = 
  | 'burgers'
  | 'pizzas'
  | 'fries'
  | 'cold-drinks'
  | 'coffee'
  | 'tea'
  | 'breakfast'
  | 'brunch'
  | 'pastries'
  | 'desserts'
  | 'seasonal';

export type FlavorProfile = 'sweet' | 'bitter' | 'creamy' | 'fruity' | 'nutty' | 'spiced' | 'floral' | 'savory' | 'cheesy';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  calories: number;
  caffeineLevel: 'None' | 'Low' | 'Medium' | 'High';
  isVegan: boolean;
  isGlutenFree: boolean;
  isNutFree: boolean;
  badge?: 'Bestseller' | 'New' | "Chef's Pick";
  allergens: string[];
  flavorProfile: FlavorProfile;
  origin?: string;
  rating: number;
  reviewsCount: number;
  pairedWithIds: string[];
  inStock: boolean;
  prepTimeMinutes: number;
}

export interface CustomDrinkConfig {
  size: 'Small (8oz)' | 'Regular (12oz)' | 'Grande (16oz)';
  base: 'Single Origin Espresso' | 'Double Ristretto' | 'Cold Brew Concentrate' | 'Ceremonial Matcha' | 'Chai Spiced';
  milk: 'Whole Milk' | 'Oat Silk Milk' | 'Almond Cream Milk' | 'Coconut Milk' | 'A2 Cow Milk';
  shots: number;
  syrup: 'None' | 'Madagascar Vanilla Bean' | 'Smoked Salted Caramel' | 'Roasted Hazelnut' | 'Wild Ceylon Cinnamon' | 'Raw Cardamom Honey';
  temperature: 'Steamed Hot (65°C)' | 'Extra Hot (72°C)' | 'Over Clear Ice' | 'Nitro Chilled';
  toppings: string[];
}

export interface CartItem {
  id: string;
  menuItemId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customConfig?: CustomDrinkConfig;
  notes?: string;
}

export interface CoffeeRegion {
  id: string;
  name: string;
  country: string;
  elevation: string;
  farmer: string;
  farmName: string;
  process: string;
  roastLevel: number; // 1 to 5 (Light to Dark)
  notes: string[];
  coordinates: { x: number; y: number }; // percentage on map
  image: string;
  story: string;
}

export interface BrewGuide {
  id: 'pourover' | 'frenchpress' | 'aeropress' | 'coldbrew';
  name: string;
  subtitle: string;
  equipment: string[];
  recommendedCoffeeGrams: number;
  waterGrams: number;
  ratio: string;
  grindSize: string;
  waterTemp: string;
  totalTimeSeconds: number;
  steps: {
    time: string;
    seconds: number;
    title: string;
    detail: string;
  }[];
  diagramSvg: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'beans' | 'merch' | 'subscription' | 'giftcard';
  price: number;
  description: string;
  image: string;
  grindOptions?: string[];
  bagSizes?: string[];
  subscriptionFrequencies?: string[];
  badge?: string;
  rating: number;
  inStock: boolean;
  notes?: string[];
}

export interface TableZone {
  id: 'window' | 'outlet' | 'quiet' | 'group' | 'patio';
  name: string;
  description: string;
  capacity: string;
  features: string[];
  availableSeats: number;
  coords: { x: number; y: number; width: number; height: number };
}

export interface CafeEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  genre: string;
  artist: string;
  description: string;
  entry: string;
  image: string;
  spotsLeft: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google Reviews' | 'Instagram' | 'Zomato Gold';
  avatar: string;
}

export interface UGCEntry {
  id: string;
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  timestamp: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Coffee & Sourcing' | 'Dining & Reservations' | 'Workspace & Facilities' | 'Online Orders';
}
