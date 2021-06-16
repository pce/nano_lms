import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n
.use(initReactI18next) 
// .use(LanguageDetector)
.init({
  // the translations - todo xhr-backend or move them in a JSON file and import them 
  resources: {
    en: {
      translation: {
        "Welcome back!": "Welcome back!",
        "Courses": "Courses"
      }
    },
    de: {
      translation: {
        "Welcome back!": "Willkommen zurück!",
        "Courses": "Kurse" 
      }
    },
    ja: {
      translation: {
        "Welcome back!": "おかえり　なさい。",
        "Courses": "コース" // 語学コース
      }
    },

  },
  lng: "de", // ja, en or if you're using a language detector, do not define the lng option
  fallbackLng: "de",

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
