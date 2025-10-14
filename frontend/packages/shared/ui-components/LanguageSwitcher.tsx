import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { changeLanguage, getCurrentLanguage, getAvailableLanguages } from '../utils/i18n';

/**
 * Language Switcher Component
 *
 * Allows users to switch between German and English
 */
export const LanguageSwitcher: React.FC = () => {
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());
  const languages = getAvailableLanguages();

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            px-3 py-1 rounded-md text-sm font-medium transition-all duration-300
            ${
              currentLang === lang.code
                ? 'bg-black text-white'
                : 'bg-white text-black border border-black/20 hover:bg-apple-gradient hover:text-white hover:border-transparent'
            }
          `}
        >
          {lang.code.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
};
