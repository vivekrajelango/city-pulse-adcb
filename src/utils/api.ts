import axios from 'axios';
import { TicketmasterResponse, SearchParams, Event, Venue } from '../types';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const searchEvents = async (params: SearchParams): Promise<TicketmasterResponse> => {
  try {
    console.log('Searching events with params:', params);
    
    const response = await api.get('/events', {
      params: {
        keyword: params.keyword,
        city: params.city,
        page: params.page || 0,
        size: params.size || 20,
        sort: 'date,asc',
      },
    });

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching events:', error);
    return getMockEvents();
  }
};

export const getEventDetails = async (eventId: string): Promise<Event> => {
  try {
    console.log('Fetching event details for ID:', eventId);
    
    const response = await api.get(`/events/${eventId}`);

    console.log('Event details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    const mockEvents = getMockEvents();
    return mockEvents._embedded?.events?.[0] || mockEvents._embedded!.events[0];
  }
};

export const getVenueDetails = async (venueId: string): Promise<Venue> => {
  try {
    console.log('Fetching venue details for ID:', venueId);
    
    const response = await api.get(`/venues/${venueId}`);

    console.log('Venue details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching venue details:', error);
    throw error;
  }
};

export const getMockEvents = (): TicketmasterResponse => {
  return {
    _embedded: {
      events: [
        {
          id: '1',
          name: 'Summer Music Festival',
          type: 'event',
          url: 'https://example.com/event/1',
          locale: 'en-us',
          images: [
            {
              ratio: '16_9',
              url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
              width: 800,
              height: 450,
              fallback: false,
            },
          ],
          sales: {
            public: {
              startDateTime: '2024-03-01T10:00:00Z',
              startTBD: false,
              startTBA: false,
              endDateTime: '2024-08-15T23:59:59Z',
            },
          },
          dates: {
            start: {
              localDate: '2024-08-15',
              localTime: '19:00:00',
              dateTime: '2024-08-15T19:00:00Z',
              dateTBD: false,
              dateTBA: false,
              timeTBA: false,
              noSpecificTime: false,
            },
            timezone: 'America/New_York',
            status: {
              code: 'onsale',
            },
          },
          classifications: [
            {
              primary: true,
              segment: {
                id: 'KZFzniwnSyZfZ7v7nJ',
                name: 'Music',
              },
              genre: {
                id: 'KnvZfZ7vAeA',
                name: 'Rock',
              },
              subGenre: {
                id: 'KZazBEonSMnZiZTuvJ',
                name: 'Pop',
              },
              type: {
                id: 'KZAyXgnZfZ7v7nI',
                name: 'Undefined',
              },
              subType: {
                id: 'KZFzBErXgnZfZ7v7lJ',
                name: 'Undefined',
              },
              family: false,
            },
          ],
          info: 'Join us for an unforgettable night of music featuring top artists from around the world.',
          priceRanges: [
            {
              type: 'standard',
              currency: 'USD',
              min: 45.0,
              max: 150.0,
            },
          ],
          _links: {
            self: {
              href: '/discovery/v2/events/1?locale=en-us',
            },
          },
          _embedded: {
            venues: [
              {
                name: 'Central Park',
                type: 'venue',
                id: 'venue1',
                test: false,
                url: 'https://example.com/venue/1',
                locale: 'en-us',
                images: [],
                postalCode: '10024',
                timezone: 'America/New_York',
                city: {
                  name: 'New York',
                },
                state: {
                  name: 'New York',
                  stateCode: 'NY',
                },
                country: {
                  name: 'United States Of America',
                  countryCode: 'US',
                },
                address: {
                  line1: 'Central Park West & 79th St',
                },
                location: {
                  longitude: '-73.9733',
                  latitude: '40.7794',
                },
                markets: [],
                dmas: [],
                upcomingEvents: {
                  ticketmaster: 5,
                  _total: 5,
                  _filtered: 0,
                },
                _links: {
                  self: {
                    href: '/discovery/v2/venues/venue1?locale=en-us',
                  },
                },
              },
            ],
          },
        },
        {
          id: '2',
          name: 'Tech Conference 2024',
          type: 'event',
          url: 'https://example.com/event/2',
          locale: 'en-us',
          images: [
            {
              ratio: '16_9',
              url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop',
              width: 800,
              height: 450,
              fallback: false,
            },
          ],
          sales: {
            public: {
              startDateTime: '2024-02-01T09:00:00Z',
              startTBD: false,
              startTBA: false,
              endDateTime: '2024-09-20T18:00:00Z',
            },
          },
          dates: {
            start: {
              localDate: '2024-09-20',
              localTime: '09:00:00',
              dateTime: '2024-09-20T09:00:00Z',
              dateTBD: false,
              dateTBA: false,
              timeTBA: false,
              noSpecificTime: false,
            },
            timezone: 'America/Los_Angeles',
            status: {
              code: 'onsale',
            },
          },
          classifications: [
            {
              primary: true,
              segment: {
                id: 'KZFzniwnSyZfZ7v7nE',
                name: 'Miscellaneous',
              },
              genre: {
                id: 'KnvZfZ7vAeE',
                name: 'Business',
              },
              subGenre: {
                id: 'KZazBEonSMnZiZTuvE',
                name: 'Convention',
              },
              type: {
                id: 'KZAyXgnZfZ7v7nE',
                name: 'Convention',
              },
              subType: {
                id: 'KZFzBErXgnZfZ7v7lE',
                name: 'Convention',
              },
              family: false,
            },
          ],
          info: 'The biggest tech conference of the year featuring industry leaders and cutting-edge innovations.',
          priceRanges: [
            {
              type: 'standard',
              currency: 'USD',
              min: 299.0,
              max: 899.0,
            },
          ],
          _links: {
            self: {
              href: '/discovery/v2/events/2?locale=en-us',
            },
          },
          _embedded: {
            venues: [
              {
                name: 'Convention Center',
                type: 'venue',
                id: 'venue2',
                test: false,
                url: 'https://example.com/venue/2',
                locale: 'en-us',
                images: [],
                postalCode: '94103',
                timezone: 'America/Los_Angeles',
                city: {
                  name: 'San Francisco',
                },
                state: {
                  name: 'California',
                  stateCode: 'CA',
                },
                country: {
                  name: 'United States Of America',
                  countryCode: 'US',
                },
                address: {
                  line1: '747 Howard St',
                },
                location: {
                  longitude: '-122.4058',
                  latitude: '37.7849',
                },
                markets: [],
                dmas: [],
                upcomingEvents: {
                  ticketmaster: 12,
                  _total: 12,
                  _filtered: 0,
                },
                _links: {
                  self: {
                    href: '/discovery/v2/venues/venue2?locale=en-us',
                  },
                },
              },
            ],
          },
        },
      ],
    },
    _links: {
      self: {
        href: '/discovery/v2/events.json?keyword=music&city=New York&page=0&size=20',
      },
    },
    page: {
      size: 20,
      totalElements: 2,
      totalPages: 1,
      number: 0,
    },
  };
};