import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';

i18n.use(Backend).use(intervalPlural).use(initReactI18next).init({
  lng: 'en',
  fallbackLng: false,
});

export default i18n;
