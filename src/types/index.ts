export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'admin';
  createdAt: Date;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  destination: string;
  country: string;
  duration: number;
  price: number;
  originalPrice?: number;
  images: string[];
  meals: 'BB' | 'HB' | 'AI' | 'none';
  tripType: 'relax' | 'adventure' | 'culture' | 'family';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  isLastMinute: boolean;
  availableDates: Date[];
  itinerary: ItineraryDay[];
  accommodation: string;
  transport: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Reservation {
  id: string;
  userId: string;
  offerId: string;
  status: 'blocked' | 'confirmed' | 'cancelled';
  guests: number;
  totalPrice: number;
  departureDate: Date;
  createdAt: Date;
  blockedUntil?: Date;
  paymentDeadline?: Date;
}

export interface SearchFilters {
  destination?: string;
  dateFrom?: Date;
  dateTo?: Date;
  guests?: number;
  meals?: string;
  tripType?: string;
  priceMin?: number;
  priceMax?: number;
  country?: string;
  season?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  isLoading: boolean;
  favorites: string[];
  addToFavorites: (offerId: string) => void;
  removeFromFavorites: (offerId: string) => void;
  isFavorite: (offerId: string) => boolean;
}