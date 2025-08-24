'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { useAppSelector } from '../../store/hooks';
import { getDirectionClass, getTextAlignClass } from '../../utils/helpers';
import { useTranslation } from '../../hooks/useTranslation';

export default function Login() {
  const router = useRouter();
  const language = useAppSelector((state) => state.language.language);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
  
      if (formData.email === 'demo@example.com' && formData.password === 'password123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        router.push('/dashboard');
      } else {
        setError(t('auth.invalidCredentials'));
      }
    } catch (err) {
      setError(t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'password123'
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 ${getDirectionClass(language)}`}>
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
            <UserIcon className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.welcomeBack')}
          </h1>
          <p className="text-gray-600">
            {t('auth.signInToAccess')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${getTextAlignClass(language)}`}
                  placeholder={t('auth.enterEmail')}
                />
                <UserIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

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
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${getTextAlignClass(language)}`}
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2 font-medium">
                {t('auth.demoCredentials')}
              </p>
              <p className="text-xs text-blue-700 mb-1">
                {t('auth.email')} demo@example.com
              </p>
              <p className="text-xs text-blue-700 mb-3">
                {t('auth.password')} password123
              </p>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
              >
                {t('auth.useDemoCredentials')}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('auth.signingIn')}
                </div>
              ) : (
                t('auth.signIn')
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {t('auth.dontHaveAccount')}
              {' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('auth.signup')}
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