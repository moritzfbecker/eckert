/**
 * useTranslation Hook
 *
 * React hook for accessing i18n translations
 * Automatically re-renders components when language changes
 *
 * Usage:
 * const { t, language, changeLanguage, isLoading } = useTranslation();
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
