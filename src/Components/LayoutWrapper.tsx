'use client';

import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const language = useAppSelector((state) => state.language.language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    document.title = language === 'ar' ? 'نبض المدينة' : 'City Pulse';
  }, [language]);

  return (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}