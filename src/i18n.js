import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'ar', label: 'العربية' }
]

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ar',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['en', 'fr', 'ar'],
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    }
  });;
  export default i18n;
