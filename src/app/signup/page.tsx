'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  LockClosedIcon,
  ArrowLeftIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { useAppSelector } from '../../store/hooks';
import { getDirectionClass, getTextAlignClass } from '../../utils/helpers';
import { useTranslation } from '../../hooks/useTranslation';

export default function Signup() {
  const router = useRouter();
  const language = useAppSelector((state) => state.language.language);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.passwordsDoNotMatch'));
      return false;
    }
    
    if (formData.password.length < 6) {
      setError(t('auth.passwordTooShort'));
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (err) {
      setError(t('auth.registrationError'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 ${getDirectionClass(language)}`}>
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('auth.accountCreatedSuccess')}
            </h1>
            <p className="text-gray-600 mb-4">
              {t('auth.redirectingToLogin')}
            </p>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4 ${getDirectionClass(language)}`}>
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <button
              onClick={() => router.back()}
              className="absolute top-4 left-4 p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            
            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <UserIcon className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('auth.createAccount')}
            </h1>
            <p className="text-gray-600">
              {t('auth.joinAndDiscover')}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="firstName" 
                      className={`block text-sm font-medium text-gray-700 mb-2 ${getTextAlignClass(language)}`}
                    >
                      {t('auth.firstName')}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm ${getTextAlignClass(language)}`}
                      placeholder={t('auth.firstName')}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="lastName" 
                      className={`block text-sm font-medium text-gray-700 mb-2 ${getTextAlignClass(language)}`}
                    >
                      {t('auth.lastName')}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm ${getTextAlignClass(language)}`}
                      placeholder={t('auth.lastName')}
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="email" 
                    className={`block text-sm font-medium text-gray-700 mb-2 ${getTextAlignClass(language)}`}
                  >
                    {t('auth.emailAddress')}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${getTextAlignClass(language)}`}
                      placeholder={t('auth.enterEmail')}
                    />
                    <EnvelopeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="phone" 
                    className={`block text-sm font-medium text-gray-700 mb-2 ${getTextAlignClass(language)}`}
                  >
                    {t('auth.phoneNumber')}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${getTextAlignClass(language)}`}
                      placeholder={t('auth.enterPhone')}
                    />
                    <PhoneIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label 
                      htmlFor="password" 
                      className={`block text-sm font-medium text-gray-700 mb-2 ${getTextAlignClass(language)}`}
                    >
                      {t('auth.password')}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${getTextAlignClass(language)}`}
                        placeholder={t('auth.enterPassword')}
                      />
                      <LockClosedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="confirmPassword" 
                      className={`block text-sm font-medium text-gray-700 mb-2 ${getTextAlignClass(language)}`}
                    >
                      {t('auth.confirmPassword')}
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${getTextAlignClass(language)}`}
                        placeholder={t('auth.confirmYourPassword')}
                      />
                      <LockClosedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium mt-6"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {t('auth.creatingAccount')}
                    </div>
                  ) : (
                    t('auth.createAccount')
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  {t('auth.alreadyHaveAccount')}
                  {' '}
                  <button
                    onClick={() => router.push('/login')}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    {t('auth.signIn')}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}