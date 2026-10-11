export type AtelierPage = 
  | 'home'
  | 'philosophy'
  | 'the-roast'
  | 'extraction-engine'
  | 'origins'
  | 'reserve'
  | 'menu';

export interface TastingFlight {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  priceInr: number;
  durationMinutes: number;
  coursesCount: number;
  tastingNotes: string[];
  origins: string[];
  servings: string;
}

export interface OriginEstate {
  id: string;
  name: string;
  region: string;
  country: string;
  altitudeMeters: number;
  varietal: string;
  process: string;
  roastProfile: string;
  sensoryNotes: string[];
  harvestBatch: string;
  curatorNotes: string;
  image: string;
}

export interface ExtractionSpec {
  component: string;
  material: string;
  tolerance: string;
  thermalSpec: string;
  role: string;
}
