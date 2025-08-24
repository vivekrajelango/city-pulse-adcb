import { useAppSelector } from '../store/hooks';
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

type TranslationKey = string;
type TranslationParams = Record<string, string | number>;

interface Translations {
  [key: string]: any;
}

const translations: Record<string, Translations> = {
  en: enTranslations,
  ar: arTranslations,
};

export const useTranslation = () => {
  const language = useAppSelector((state) => state.language.language);

  const t = (key: TranslationKey, params?: TranslationParams): string => {
    const keys = key.split('.');
    let value: any = translations[language] || translations.en;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            console.warn(`Translation key "${key}" not found`);
            return key; // Return the key itself as fallback
          }
        }
        break;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" does not resolve to a string`);
      return key;
    }

    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  return { t, language };
};

export default useTranslation;