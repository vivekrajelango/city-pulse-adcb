'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon,
  UserIcon,
  HeartIcon,
  ClockIcon,
  LanguageIcon,
  BellIcon,
  CogIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleLanguage } from '../../store/slices/languageSlice';
import { formatDate, getDirectionClass } from '../../utils/helpers';
import { useTranslation } from '../../hooks/useTranslation';
import ProtectedRoute from '../../Components/ProtectedRoute';

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.language);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const searchHistory = useAppSelector((state) => state.search.searchHistory);
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'favorites' | 'history' | 'settings'>('favorites');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com'
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/placeholder-avatar.jpg',
    joinDate: '2024-01-15',
    preferences: {
      language: language,
      notifications: true
    }
  };

  const displayUser = user || mockUser;

  return (
    <ProtectedRoute>
      <div className={`min-h-screen bg-gray-50 ${getDirectionClass(language)}`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>{t('navigation.back')}</span>
            </button>
            
            <h1 className="text-xl font-bold text-gray-900">
              {t('profile.profile')}
            </h1>
            
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
                {!isAuthenticated && (
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    {t('profile.guest')}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-600 focus:outline-none"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-600"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {language === 'ar' ? 'حفظ' : 'Save'}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        {language === 'ar' ? 'إلغاء' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-3">
                      <h2 className="text-2xl font-bold text-gray-900">{displayUser.name}</h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-600">{displayUser.email}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {language === 'ar' ? 'عضو منذ' : 'Member since'} {formatDate(mockUser.joinDate, language)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <HeartIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{favorites.length}</h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'الفعاليات المفضلة' : 'Favorite Events'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <ClockIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{searchHistory.length}</h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'عمليات البحث' : 'Searches Made'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <LanguageIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'ar' ? 'عربي' : 'English'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'اللغة الحالية' : 'Current Language'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'favorites'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <HeartIcon className="w-5 h-5 inline-block mr-2" />
                  {language === 'ar' ? 'المفضلة' : 'Favorites'}
                </button>
                
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'history'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ClockIcon className="w-5 h-5 inline-block mr-2" />
                  {language === 'ar' ? 'السجل' : 'History'}
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'settings'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <CogIcon className="w-5 h-5 inline-block mr-2" />
                  {language === 'ar' ? 'الإعدادات' : 'Settings'}
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'favorites' && (
                <div>
                  {favorites.length > 0 ? (
                    <div className="space-y-4">
                      {favorites.map((favoriteId: string) => (
                        <div
                          key={favoriteId}
                          className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => router.push(`/events/${favoriteId}`)}
                        >
                          <img
                            src={'/placeholder-event.jpg'}
                            alt={`Event ${favoriteId}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {language === 'ar' ? `الفعالية ${favoriteId}` : `Event ${favoriteId}`}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {language === 'ar' ? 'انقر لعرض التفاصيل' : 'Click to view details'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <HeartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {language === 'ar' ? 'لا توجد فعاليات مفضلة' : 'No Favorite Events'}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'ar' 
                          ? 'ابدأ بإضافة الفعاليات إلى المفضلة'
                          : 'Start adding events to your favorites'
                        }
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  {searchHistory.length > 0 ? (
                    <div className="space-y-3">
                      {searchHistory.slice().reverse().map((search: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              "{search}"
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              router.push(`/?keyword=${encodeURIComponent(search)}`);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            {language === 'ar' ? 'البحث مرة أخرى' : 'Search Again'}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {language === 'ar' ? 'لا يوجد سجل بحث' : 'No Search History'}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'ar' 
                          ? 'ابدأ بالبحث عن الفعاليات'
                          : 'Start searching for events'
                        }
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {language === 'ar' ? 'اللغة' : 'Language'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' 
                          ? 'اختر لغة التطبيق المفضلة'
                          : 'Choose your preferred app language'
                        }
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(toggleLanguage())}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {language === 'ar' ? 'English' : 'العربية'}
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'ar' 
                            ? 'تلقي إشعارات حول الفعاليات الجديدة'
                            : 'Receive notifications about new events'
                          }
                        </p>
                      </div>
                      <div className="flex items-center">
                        <BellIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {language === 'ar' ? 'مفعل' : 'Enabled'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {!isAuthenticated && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">
                          {language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
                        </h4>
                        <p className="text-sm text-blue-700 mb-4">
                          {language === 'ar' 
                            ? 'أنشئ حسابًا لحفظ تفضيلاتك ومزامنتها عبر الأجهزة'
                            : 'Create an account to save your preferences and sync across devices'
                          }
                        </p>
                        <button
                          onClick={() => router.push('/auth/signup')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
      </div>
    </ProtectedRoute>
  );
}