'use client';

import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { initializeAuthListener } from '../middleware/auth';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.language);
  const authInitialized = useRef(false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    document.title = language === 'ar' ? 'نبض المدينة' : 'City Pulse';
  }, [language]);

  useEffect(() => {
    if (!authInitialized.current) {
      initializeAuthListener(dispatch);
      authInitialized.current = true;
    }
  }, [dispatch]);

  return (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}