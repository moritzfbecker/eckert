import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

/**
 * Language Switcher Component
 *
 * Allows users to switch between German and English
 * Uses I18nContext (Config API v2.0) for language management
 */
export const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useTranslation();

  const languages = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
  ];

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
              language === lang.code
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
