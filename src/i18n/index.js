import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import no from './locales/no.json';
import en from './locales/en.json';
import nl from './locales/nl.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import it from './locales/it.json';
import sv from './locales/sv.json';
import da from './locales/da.json';
import fi from './locales/fi.json';
import es from './locales/es.json';
import pl from './locales/pl.json';
import pt from './locales/pt.json';

const resources = {
  no: { translation: no },
  en: { translation: en },
  nl: { translation: nl },
  fr: { translation: fr },
  de: { translation: de },
  it: { translation: it },
  sv: { translation: sv },
  da: { translation: da },
  fi: { translation: fi },
  es: { translation: es },
  pl: { translation: pl },
  pt: { translation: pt },
};

const deviceLang = getLocales()[0]?.languageCode;
const supported = Object.keys(resources);

i18n.use(initReactI18next).init({
  resources,
  lng: supported.includes(deviceLang) ? deviceLang : 'no',
  fallbackLng: 'no',
  interpolation: { escapeValue: false },
});

export default i18n;