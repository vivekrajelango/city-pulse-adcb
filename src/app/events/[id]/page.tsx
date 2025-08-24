'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  HeartIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ClockIcon,
  CurrencyDollarIcon,
  ShareIcon,
  TicketIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addFavorite, removeFavorite } from '../../../store/slices/favoritesSlice';
import { getEventDetails } from '../../../utils/api';
import { formatDate, formatPrice, getDirectionClass, truncateText } from '../../../utils/helpers';
import MapPreview from '../../../Components/MapPreview';
import { Event } from '../../../types';

export default function EventDetails() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.language);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const eventId = params.id as string;

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) return;
      
      setLoading(true);
      try {
        const eventData = await getEventDetails(eventId);
        setEvent(eventData);
      } catch (err) {
        setError(language === 'ar' ? 'حدث خطأ في تحميل تفاصيل الفعالية' : 'Error loading event details');
        console.error('Error fetching event details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, language]);

  const isFavorite = event ? favorites.includes(event.id) : false;

  const handleFavoriteToggle = () => {
    if (!event) return;
    
    if (isFavorite) {
      dispatch(removeFavorite(event.id));
    } else {
      dispatch(addFavorite(event.id));
    }
  };

  const venue = event?._embedded?.venues?.[0];
  const priceRange = event?.priceRanges?.[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {language === 'ar' ? 'العودة' : 'Go Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${getDirectionClass(language)}`}>
      {event && (
        <main className="pb-20">
          <div className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeftIcon className={`w-6 h-6 text-gray-700 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 truncate mx-4">
                {truncateText(event.name, 30)}
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleFavoriteToggle}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-700" />
                  )}
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ShareIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {event.images && event.images.length > 0 && (
                <div className="relative">
                  <img
                    src={event.images[selectedImage]?.url}
                    alt={event.name}
                    className="w-full h-64 object-cover"
                  />
                  {event.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex space-x-2">
                        {event.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === selectedImage ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {event.name}
                </h1>

                {event.dates?.start && (
                  <div className="flex items-center text-gray-700 mb-4">
                    <CalendarIcon className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-medium">
                        {formatDate(event.dates.start.localDate, language)}
                      </p>
                      {event.dates.start.localTime && (
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {event.dates.start.localTime}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {venue && (
                  <div className="mb-6">
                    <div className="flex items-center text-gray-700 mb-2">
                      <MapPinIcon className="w-5 h-5 mr-3 text-blue-600" />
                      <span className="font-medium">
                        {language === 'ar' ? 'المكان' : 'Venue'}
                      </span>
                    </div>
                    <div className="ml-8">
                      <p className="font-medium text-gray-900">{venue.name}</p>
                      {venue.address?.line1 && (
                        <p className="text-gray-600 text-sm mt-1">
                          {venue.address.line1}
                        </p>
                      )}
                      {venue.city && (
                        <p className="text-gray-600 text-sm">
                          {venue.city.name}
                          {venue.state && `, ${venue.state.name}`}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {priceRange && (
                  <div className="mb-6">
                    <div className="flex items-center text-gray-700 mb-2">
                      <CurrencyDollarIcon className="w-5 h-5 mr-3 text-blue-600" />
                      <span className="font-medium">
                        {language === 'ar' ? 'السعر' : 'Price Range'}
                      </span>
                    </div>
                    <p className="text-gray-900 ml-8">
                      {formatPrice(priceRange.min, priceRange.max, priceRange.currency)}
                    </p>
                  </div>
                )}
                
                {event.url && (
                  <div className="mt-8">
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <TicketIcon className="w-5 h-5" />
                      <span>
                        {language === 'ar' ? 'شراء التذاكر' : 'Buy Tickets'}
                      </span>
                    </a>
                  </div>
                )}
                
                {venue?.location && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {language === 'ar' ? 'الموقع' : 'Location'}
                    </h3>
                    <MapPreview
                      latitude={venue.location.latitude}
                      longitude={venue.location.longitude}
                      venueName={venue.name}
                      address={venue.address?.line1}
                      language={language}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      )}
    </div>
  );
}