import { Language } from '../types';

export const formatDate = (dateString: string, language: Language = 'en'): string => {
  const date = new Date(dateString);
  
  if (language === 'ar') {
    return date.toLocaleDateString('ar-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (timeString: string, language: Language = 'en'): string => {
  const date = new Date(`2000-01-01T${timeString}`);
  
  if (language === 'ar') {
    return date.toLocaleTimeString('ar-AE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
  
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateTime = (dateTimeString: string, language: Language = 'en'): string => {
  const date = new Date(dateTimeString);
  
  if (language === 'ar') {
    return date.toLocaleString('ar-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
  
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatPrice = (min: number | string, max: number | string, currency: string = 'USD'): string => {
  const numMin = typeof min === 'string' ? parseFloat(min) : min;
  const numMax = typeof max === 'string' ? parseFloat(max) : max;
  
  if (isNaN(numMin) || isNaN(numMax)) return 'N/A';
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });
  
  if (numMin === numMax) {
    return formatter.format(numMin);
  }
  
  return `${formatter.format(numMin)} - ${formatter.format(numMax)}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const getOptimizedImageUrl = (url: string, width: number, height: number): string => {
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&h=${height}&fit=crop&crop=center`;
  }
  
  return url;
};


export const getDirectionClass = (language: Language): string => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

export const getTextAlignClass = (language: Language): string => {
  return language === 'ar' ? 'text-right' : 'text-left';
};

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    events: 'Events',
    profile: 'Profile',
    favorites: 'Favorites',
    
    // Search
    searchPlaceholder: 'Search for events...',
    cityPlaceholder: 'Enter city name',
    searchButton: 'Search',
    noResults: 'No events found',
    
    // Event details
    eventDetails: 'Event Details',
    venue: 'Venue',
    date: 'Date',
    time: 'Time',
    price: 'Price',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    getTickets: 'Get Tickets',
    
    // Profile
    myProfile: 'My Profile',
    settings: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    logout: 'Logout',
    
    // Auth
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    
    // Common
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    events: 'الفعاليات',
    profile: 'الملف الشخصي',
    favorites: 'المفضلة',
    
    // Search
    searchPlaceholder: 'البحث عن الفعاليات...',
    cityPlaceholder: 'أدخل اسم المدينة',
    searchButton: 'بحث',
    noResults: 'لم يتم العثور على فعاليات',
    
    // Event details
    eventDetails: 'تفاصيل الفعالية',
    venue: 'المكان',
    date: 'التاريخ',
    time: 'الوقت',
    price: 'السعر',
    addToFavorites: 'إضافة للمفضلة',
    removeFromFavorites: 'إزالة من المفضلة',
    getTickets: 'احصل على التذاكر',
    
    // Profile
    myProfile: 'ملفي الشخصي',
    settings: 'الإعدادات',
    language: 'اللغة',
    notifications: 'الإشعارات',
    logout: 'تسجيل الخروج',
    
    // Auth
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    name: 'الاسم',
    confirmPassword: 'تأكيد كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    dontHaveAccount: 'ليس لديك حساب؟',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    
    // Common
    loading: 'جاري التحميل...',
    error: 'حدث خطأ ما',
    retry: 'إعادة المحاولة',
    cancel: 'إلغاء',
    save: 'حفظ',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
  },
};

export const t = (key: string, language: Language = 'en'): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
    }
  },
};