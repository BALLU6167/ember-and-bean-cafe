export type TripStatus = 'pre-trip' | 'in-trip' | 'post-trip';

export type ItemType = 'flight' | 'hotel' | 'transit' | 'activity' | 'dining';

export interface LocationCoordinate {
  name: string;
  lat: number;
  lng: number;
  city: string;
}

export interface ItineraryItem {
  id: string;
  tripId: string;
  dayNumber: number; // 1, 2, 3...
  time: string; // e.g., "14:30"
  endTime?: string;
  type: ItemType;
  title: string;
  location: string;
  city: string;
  lat: number;
  lng: number;
  confirmationCode?: string; // PNR / Hotel ref
  gate?: string;
  terminal?: string;
  seat?: string;
  cost?: number;
  currency?: string;
  status?: 'confirmed' | 'delayed' | 'boarding' | 'completed';
  notes?: string;
  offlineBarcode?: string; // Encoded string for simulated barcode render
  qrData?: string;
  urgentAlert?: string;
}

export interface PackingItem {
  id: string;
  item: string;
  category: 'Essentials' | 'Tech' | 'Documents' | 'Clothing';
  packed: boolean;
  critical?: boolean;
}

export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  currency: string;
  paidBy: string;
  splitWith: string[]; // names of participants
  category: 'Flights' | 'Lodging' | 'Dining' | 'Transit' | 'Activities';
  date: string;
}

export interface Traveler {
  id: string;
  name: string;
  avatar: string;
  role: 'Lead Organizer' | 'Collaborator';
  isCurrentUser?: boolean;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  heroTagline: string;
  flightCountdownSeconds?: number;
  travelers: Traveler[];
  itinerary: ItineraryItem[];
  packingList: PackingItem[];
  expenses: ExpenseItem[];
  emergencyContacts: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export interface ExtractedBooking {
  type: ItemType;
  title: string;
  confirmationCode: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  gate?: string;
  terminal?: string;
  seat?: string;
  confidence: number;
}
