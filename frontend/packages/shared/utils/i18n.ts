/**
 * i18n Configuration for Frontend
 *
 * Multi-language support with external config
 * Supports: German (de) and English (en)
 *
 * Usage:
 * import { t, changeLanguage } from '@eckert-preisser/shared/utils/i18n';
 *
 * const message = t('user.created');
 * changeLanguage('en');
 */

interface Translations {
  [key: string]: string;
}

interface LanguageConfig {
  de: Translations;
  en: Translations;
}

let currentLanguage: string = 'de';
let translations: LanguageConfig = {
  de: {},
  en: {},
};

/**
 * Initialize i18n system
 */
export const initI18n = async (): Promise<void> => {
  try {
    // Load language config from backend
    const response = await fetch('/api/config/language');
    const config = await response.json();

    currentLanguage = config.defaultLanguage || 'de';

    // Load translations for all languages
    await loadTranslations('de');
    await loadTranslations('en');

    console.log(`[i18n] Initialized with language: ${currentLanguage}`);
  } catch (error) {
    console.error('[i18n] Failed to initialize:', error);
    // Fallback to default translations
    loadDefaultTranslations();
  }
};

/**
 * Load translations for specific language
 */
const loadTranslations = async (language: string): Promise<void> => {
  try {
    const response = await fetch(`/api/i18n/messages/${language}`);
    const data = await response.json();
    translations[language as keyof LanguageConfig] = data;
  } catch (error) {
    console.error(`[i18n] Failed to load ${language} translations:`, error);
  }
};

/**
 * Load default translations (fallback)
 */
const loadDefaultTranslations = (): void => {
  // German translations
  translations.de = {
    'app.name': 'Eckert Preisser Enterprise',
    'app.welcome': 'Willkommen bei Eckert Preisser',

    // Navigation
    'nav.home': 'Startseite',
    'nav.products': 'Produkte',
    'nav.dashboard': 'Dashboard',
    'nav.account': 'Konto',
    'nav.login': 'Anmelden',
    'nav.logout': 'Abmelden',

    // User
    'user.profile': 'Profil',
    'user.settings': 'Einstellungen',
    'user.created': 'Benutzer erfolgreich erstellt',
    'user.updated': 'Benutzer erfolgreich aktualisiert',
    'user.deleted': 'Benutzer erfolgreich gelöscht',
    'user.not.found': 'Benutzer nicht gefunden',
    'user.welcome': 'Willkommen, {0}!',

    // Buttons
    'button.save': 'Speichern',
    'button.cancel': 'Abbrechen',
    'button.delete': 'Löschen',
    'button.edit': 'Bearbeiten',
    'button.submit': 'Absenden',
    'button.back': 'Zurück',
    'button.next': 'Weiter',
    'button.get.started': 'Jetzt starten',
    'button.learn.more': 'Mehr erfahren',

    // Forms
    'form.email': 'E-Mail',
    'form.password': 'Passwort',
    'form.first.name': 'Vorname',
    'form.last.name': 'Nachname',
    'form.phone': 'Telefon',
    'form.address': 'Adresse',

    // Validation
    'validation.required': 'Dieses Feld ist erforderlich',
    'validation.email.invalid': 'Ungültige E-Mail-Adresse',
    'validation.password.weak': 'Passwort ist zu schwach',
    'validation.password.mismatch': 'Passwörter stimmen nicht überein',

    // Errors
    'error.something.went.wrong': 'Etwas ist schief gelaufen',
    'error.try.again': 'Bitte versuchen Sie es erneut',
    'error.unauthorized': 'Nicht autorisiert',
    'error.forbidden': 'Zugriff verweigert',
    'error.not.found': 'Nicht gefunden',
    'error.internal': 'Interner Serverfehler',

    // Success
    'success.saved': 'Erfolgreich gespeichert',
    'success.deleted': 'Erfolgreich gelöscht',
    'success.updated': 'Erfolgreich aktualisiert',

    // Home Page
    'home.hero.title': 'Willkommen bei',
    'home.hero.subtitle': 'Enterprise-Level-Lösungen für moderne Unternehmen. Gebaut mit modernster Technologie und für Skalierbarkeit konzipiert.',
    'home.features.title': 'Warum',
    'home.feature.fast.title': 'Blitzschnell',
    'home.feature.fast.desc': 'Mit Blick auf Performance gebaut. Optimiert für Geschwindigkeit und Effizienz.',
    'home.feature.secure.title': 'Sicher',
    'home.feature.secure.desc': 'Enterprise-Grade-Sicherheit mit JWT-Authentifizierung und OAuth2-Unterstützung.',
    'home.feature.scalable.title': 'Skalierbar',
    'home.feature.scalable.desc': 'Microservices-Architektur entwickelt, um mit Ihrem Unternehmen zu wachsen.',
  };

  // English translations
  translations.en = {
    'app.name': 'Eckert Preisser Enterprise',
    'app.welcome': 'Welcome to Eckert Preisser',

    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.dashboard': 'Dashboard',
    'nav.account': 'Account',
    'nav.login': 'Login',
    'nav.logout': 'Logout',

    // User
    'user.profile': 'Profile',
    'user.settings': 'Settings',
    'user.created': 'User created successfully',
    'user.updated': 'User updated successfully',
    'user.deleted': 'User deleted successfully',
    'user.not.found': 'User not found',
    'user.welcome': 'Welcome, {0}!',

    // Buttons
    'button.save': 'Save',
    'button.cancel': 'Cancel',
    'button.delete': 'Delete',
    'button.edit': 'Edit',
    'button.submit': 'Submit',
    'button.back': 'Back',
    'button.next': 'Next',
    'button.get.started': 'Get Started',
    'button.learn.more': 'Learn More',

    // Forms
    'form.email': 'Email',
    'form.password': 'Password',
    'form.first.name': 'First Name',
    'form.last.name': 'Last Name',
    'form.phone': 'Phone',
    'form.address': 'Address',

    // Validation
    'validation.required': 'This field is required',
    'validation.email.invalid': 'Invalid email address',
    'validation.password.weak': 'Password is too weak',
    'validation.password.mismatch': 'Passwords do not match',

    // Errors
    'error.something.went.wrong': 'Something went wrong',
    'error.try.again': 'Please try again',
    'error.unauthorized': 'Unauthorized',
    'error.forbidden': 'Access denied',
    'error.not.found': 'Not found',
    'error.internal': 'Internal server error',

    // Success
    'success.saved': 'Successfully saved',
    'success.deleted': 'Successfully deleted',
    'success.updated': 'Successfully updated',

    // Home Page
    'home.hero.title': 'Welcome to',
    'home.hero.subtitle': 'Enterprise-level solutions for modern businesses. Built with cutting-edge technology and designed for scale.',
    'home.features.title': 'Why Choose',
    'home.feature.fast.title': 'Lightning Fast',
    'home.feature.fast.desc': 'Built with performance in mind. Optimized for speed and efficiency.',
    'home.feature.secure.title': 'Secure',
    'home.feature.secure.desc': 'Enterprise-grade security with JWT authentication and OAuth2 support.',
    'home.feature.scalable.title': 'Scalable',
    'home.feature.scalable.desc': 'Microservices architecture designed to scale with your business.',
  };

  currentLanguage = 'de';
};

/**
 * Translate a key
 */
export const t = (key: string, params?: Record<string, string | number>): string => {
  const translation = translations[currentLanguage as keyof LanguageConfig]?.[key] || key;

  if (!params) {
    return translation;
  }

  // Replace {0}, {1}, etc. with params
  let result = translation;
  Object.entries(params).forEach(([index, value]) => {
    result = result.replace(`{${index}}`, String(value));
  });

  return result;
};

/**
 * Change current language
 */
export const changeLanguage = (language: string): void => {
  if (language !== 'de' && language !== 'en') {
    console.warn(`[i18n] Unsupported language: ${language}. Falling back to 'de'`);
    language = 'de';
  }

  currentLanguage = language;
  localStorage.setItem('language', language);
  console.log(`[i18n] Language changed to: ${language}`);

  // Trigger re-render by dispatching custom event
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
};

/**
 * Get current language
 */
export const getCurrentLanguage = (): string => {
  return currentLanguage;
};

/**
 * Get all available languages
 */
export const getAvailableLanguages = (): Array<{ code: string; name: string }> => {
  return [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
  ];
};

// Auto-initialize on import
if (typeof window !== 'undefined') {
  // Check for saved language preference
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    currentLanguage = savedLanguage;
  }

  // Load default translations immediately
  loadDefaultTranslations();

  // Then try to load from backend
  initI18n().catch(console.error);
}
