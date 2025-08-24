'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, HeartIcon, UserIcon, LanguageIcon, ChevronDownIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleLanguage } from '../../store/slices/languageSlice';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';
import { addSearchTerm } from '../../store/slices/searchSlice';
import { searchEvents } from '../../utils/api';
import { formatDate, getDirectionClass, truncateText } from '../../utils/helpers';
import { useTranslation } from '../../hooks/useTranslation';
import { Event } from '../../types';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.language);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showProfileDropdown && !target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleSearch = async () => {
    if (!searchQuery.trim() || !city.trim()) {
      setError(t('search.pleaseEnterKeywordAndCity'));
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await searchEvents({ keyword: searchQuery, city });
      setEvents(response._embedded?.events || []);
      dispatch(addSearchTerm(`${searchQuery} in ${city}`));
    } catch (err) {
      setError(t('search.searchError'));
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  const toggleFavorite = (event: Event) => {
    const isFavorite = favorites.includes(event.id);
    if (isFavorite) {
      dispatch(removeFavorite(event.id));
    } else {
      dispatch(addFavorite(event.id));
    }
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${getDirectionClass(language)}`}>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 cursor-pointer" onClick={()=>router.push('/dashboard')}>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MapPinIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                {t('app.name')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => dispatch(toggleLanguage())}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LanguageIcon className="w-5 h-5" />
              </button>
              
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <UserIcon className="w-5 h-5" />
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </button>
                
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        router.push('/profile');
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 mr-3" />
                      {t('nav.profile')}
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="motion-div-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('search.discoverLocalEvents')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('search.searchForEvents')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('search.city')}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t('search.searching') : t('search.search')}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {events.length > 0 && (
          <div className="motion-div-wrapper">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {t('search.searchResults')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => {
                  const isFavorite = favorites.includes(event.id);
                  
                  return (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleEventClick(event.id)}
                    >
                      <div className="motion-div-wrapper">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="relative">
                            <img
                              src={event.images?.[0]?.url || '/placeholder-event.jpg'}
                              alt={event.name}
                              className="w-full h-48 object-cover"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(event);
                              }}
                              className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                            >
                              {isFavorite ? (
                                <HeartSolidIcon className="w-5 h-5 text-red-500" />
                              ) : (
                                <HeartIcon className="w-5 h-5 text-gray-600" />
                              )}
                            </button>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {truncateText(event.name, 50)}
                            </h4>
                            
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              {formatDate(event.dates?.start?.localDate || '', language)}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPinIcon className="w-4 h-4 mr-2" />
                              {truncateText(event._embedded?.venues?.[0]?.name || 'TBA', 30)}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
        
        {!loading && events.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="motion-div-wrapper">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('search.searchForEvents')}
                </h3>
                <p className="text-gray-600">
                  {t('search.enterSearchTermAndCity')}
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
