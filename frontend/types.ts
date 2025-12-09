
export enum SpiceLevel {
  MILD = 'MILD',
  MEDIUM = 'MEDIUM',
  SPICY = 'SPICY',
  EXTREME = 'EXTREME'
}

export enum PortionSize {
  SINGLE = 'SINGLE',
  COUPLE = 'COUPLE',
  FAMILY = 'FAMILY',
  JUMBO = 'JUMBO'
}

export enum CrowdStatus {
  QUIET = 'QUIET',
  MODERATE = 'MODERATE',
  BUSY = 'BUSY',
  VERY_BUSY = 'VERY_BUSY'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  isBestseller?: boolean;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MandiShop {
  id: string;
  name: string;
  formattedAddress: string; // New clean address field
  village: string; 
  district: string;
  coordinates: Coordinates;
  rating: number;
  reviewCount: number;
  thumbnailUrl: string;
  signatureDish: string;
  priceRange: string; 
  distanceFromUser?: string;
  spiceLevel: SpiceLevel;
  portionSizes: PortionSize[];
  crowdStatus: CrowdStatus; 
  phoneNumber?: string;
  isOpen: boolean;
  menuHighlights: MenuItem[];
  reviews: Review[];
  description: string;
}

export interface SearchState {
  query: string;
  results: MandiShop[];
  isLoading: boolean;
  error: string | null;
  selectedShop: MandiShop | null;
  viewMode: 'list' | 'map';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
}

export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}
