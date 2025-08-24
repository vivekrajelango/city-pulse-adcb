export interface Event {
  id: string;
  name: string;
  type: string;
  url: string;
  locale: string;
  images: Image[];
  sales: {
    public: {
      startDateTime: string;
      startTBD: boolean;
      startTBA: boolean;
      endDateTime: string;
    };
  };
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
      dateTBD: boolean;
      dateTBA: boolean;
      timeTBA: boolean;
      noSpecificTime: boolean;
    };
    timezone: string;
    status: {
      code: string;
    };
  };
  classifications: Classification[];
  promoter?: {
    id: string;
    name: string;
    description: string;
  };
  promoters?: Promoter[];
  info?: string;
  pleaseNote?: string;
  priceRanges?: PriceRange[];
  products?: Product[];
  seatmap?: {
    staticUrl: string;
  };
  accessibility?: {
    ticketLimit: number;
    id: string;
  };
  ticketLimit?: {
    info: string;
    id: string;
  };
  ageRestrictions?: {
    legalAgeEnforced: boolean;
    id: string;
  };
  ticketing?: {
    safeTix: {
      enabled: boolean;
      inAppOnlyEnabled: boolean;
    };
    allInclusivePricing: {
      enabled: boolean;
    };
    id: string;
  };
  _links: {
    self: {
      href: string;
    };
    attractions?: {
      href: string;
    }[];
    venues?: {
      href: string;
    }[];
  };
  _embedded?: {
    venues?: Venue[];
    attractions?: Attraction[];
  };
}

export interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface Classification {
  primary: boolean;
  segment: {
    id: string;
    name: string;
  };
  genre: {
    id: string;
    name: string;
  };
  subGenre: {
    id: string;
    name: string;
  };
  type: {
    id: string;
    name: string;
  };
  subType: {
    id: string;
    name: string;
  };
  family: boolean;
}

export interface Promoter {
  id: string;
  name: string;
  description: string;
}

export interface PriceRange {
  type: string;
  currency: string;
  min: number;
  max: number;
}

export interface Product {
  name: string;
  id: string;
  url: string;
  type: string;
  classifications: Classification[];
}

export interface Venue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  postalCode: string;
  timezone: string;
  city: {
    name: string;
  };
  state: {
    name: string;
    stateCode: string;
  };
  country: {
    name: string;
    countryCode: string;
  };
  address: {
    line1: string;
  };
  location: {
    longitude: string;
    latitude: string;
  };
  markets: Market[];
  dmas: DMA[];
  social?: {
    twitter: {
      handle: string;
    };
  };
  boxOfficeInfo?: {
    phoneNumberDetail: string;
    openHoursDetail: string;
    acceptedPaymentDetail: string;
    willCallDetail: string;
  };
  parkingDetail?: string;
  accessibleSeatingDetail?: string;
  generalInfo?: {
    generalRule: string;
    childRule: string;
  };
  upcomingEvents: {
    ticketmaster: number;
    _total: number;
    _filtered: number;
  };
  ada?: {
    adaPhones: string;
    adaCustomCopy: string;
    adaHours: string;
  };
  _links: {
    self: {
      href: string;
    };
  };
}

export interface Attraction {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  externalLinks?: {
    youtube?: {
      url: string;
    }[];
    twitter?: {
      url: string;
    }[];
    itunes?: {
      url: string;
    }[];
    lastfm?: {
      url: string;
    }[];
    facebook?: {
      url: string;
    }[];
    wiki?: {
      url: string;
    }[];
    musicbrainz?: {
      id: string;
    }[];
    homepage?: {
      url: string;
    }[];
  };
  images: Image[];
  classifications: Classification[];
  upcomingEvents: {
    ticketmaster: number;
    _total: number;
    _filtered: number;
  };
  _links: {
    self: {
      href: string;
    };
  };
}

export interface Market {
  name: string;
  id: string;
}

export interface DMA {
  id: number;
}

export interface TicketmasterResponse {
  _embedded?: {
    events: Event[];
  };
  _links: {
    self: {
      href: string;
      templated?: boolean;
    };
    next?: {
      href: string;
      templated?: boolean;
    };
    prev?: {
      href: string;
      templated?: boolean;
    };
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface SearchParams {
  keyword: string;
  city: string;
  page?: number;
  size?: number;
}

export interface FavoriteEvent {
  id: string;
  name: string;
  date: string;
  venue: string;
  image: string;
  addedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate?: string;
  preferences?: {
    language: Language;
    notifications: boolean;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type Language = 'en' | 'ar';

export interface AppState {
  language: Language;
  favorites: FavoriteEvent[];
  searchHistory: SearchParams[];
}