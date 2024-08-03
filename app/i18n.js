import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from '../locales/en-US.json';
import fiFI from '../locales/fi-FI.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': {
        translation: enUS,
      },
      'fi-FI': {
        translation: fiFI,
      },
    },
    lng: 'en-US', // default language
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
