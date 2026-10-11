export type CategoryType = 'all' | 'espresso' | 'pourover' | 'coldbrew' | 'pastry' | 'signature';

export interface FlavorProfile {
  acidity: number; // 1 to 10
  body: number; // 1 to 10
  sweetness: number; // 1 to 10
  aroma: number; // 1 to 10
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  description: string;
  rating: number;
  cuppingScore: number;
  roastLevel: 'Light' | 'Medium' | 'Dark';
  tags: string[];
  image: string;
  origin: string;
  flavorProfile: FlavorProfile;
  volume: string;
  isPopular?: boolean;
}

export interface CustomBrewConfig {
  base: 'espresso-single' | 'espresso-double' | 'pour-over' | 'nitro-cold';
  roastLevel: 'light-golden' | 'medium-velvet' | 'dark-obsidian';
  milk: 'oat-silk' | 'almond-cream' | 'microfoam-whole' | 'none';
  infusion: 'vanilla-bean' | 'salted-caramel' | 'smoked-cinnamon' | 'lavender-honey' | 'none';
  temperature: 'hot-92c' | 'iced-spheres' | 'nitro-chilled';
}

export interface CartItem {
  cartId: string;
  menuItem: MenuItem;
  quantity: number;
  customConfig?: CustomBrewConfig;
  calculatedPrice: number;
}

export interface TableZone {
  id: string;
  name: string;
  description: string;
  capacity: string;
  atmosphere: string;
  image: string;
  availableTables: number;
}

export interface ReservationData {
  zoneId: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface OriginBean {
  id: string;
  name: string;
  country: string;
  region: string;
  altitude: string;
  process: string;
  cuppingScore: number;
  harvestDate: string;
  flavorNotes: string[];
  description: string;
  image: string;
}
