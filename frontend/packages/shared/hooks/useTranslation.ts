/**
 * useTranslation Hook - v3.0 (Simplified for Config API v2.0)
 *
 * Provides ONLY language state management
 * Translations are now loaded via useConfig hook
 *
 * Usage:
 * const { language, changeLanguage } = useTranslation()
 * const config = useConfig('homepage', language)
 */

import { useContext } from 'react';
import { I18nContext } from '../contexts/I18nContext';

export const useTranslation = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }

  return context;
};
