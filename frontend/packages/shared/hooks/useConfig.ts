import { useState, useEffect, useCallback } from 'react'
import { api } from '../utils/api'
import { logger } from '../utils/logger'

/**
 * FrontendConfig - Configuration container for React components
 *
 * Fluent API for accessing configuration values with automatic
 * backend synchronization and caching.
 */
class FrontendConfig {
  private category: string
  private language: string | null
  private values: Map<string, string>
  private defaults: Map<string, string>
  private loaded: boolean

  constructor(category: string, language: string | null = null) {
    this.category = category
    this.language = language
    this.values = new Map()
    this.defaults = new Map()
    this.loaded = false
  }

  /**
   * Get configuration value with default
   *
   * Registers default for auto-sync with backend
   *
   * @param key Configuration key
   * @param defaultValue Default value (EN)
   * @returns Configuration value or default
   */
  get(key: string, defaultValue: string): string {
    // Register default
    if (!this.defaults.has(key)) {
      this.defaults.set(key, defaultValue)
    }

    // Return existing value or default
    return this.values.get(key) ?? defaultValue
  }

  /**
   * Get configuration value as number
   */
  getNumber(key: string, defaultValue: number): number {
    const value = this.values.get(key)
    if (!value) return defaultValue
    const parsed = parseInt(value, 10)
    return isNaN(parsed) ? defaultValue : parsed
  }

  /**
   * Get configuration value as boolean
   */
  getBoolean(key: string, defaultValue: boolean): boolean {
    const value = this.values.get(key)
    if (!value) return defaultValue
    return value.toLowerCase() === 'true'
  }

  /**
   * Check if config contains key
   */
  contains(key: string): boolean {
    return this.values.has(key)
  }

  /**
   * Load values from backend
   */
  load(values: Record<string, string>) {
    this.values.clear()
    Object.entries(values).forEach(([key, value]) => {
      this.values.set(key, value)
    })
    this.loaded = true
  }

  /**
   * Get all defaults as object for backend request
   */
  getDefaultsObject(): Record<string, string> {
    const obj: Record<string, string> = {}
    this.defaults.forEach((value, key) => {
      obj[key] = value
    })
    return obj
  }

  /**
   * Get all values as object
   */
  getAllValues(): Record<string, string> {
    const obj: Record<string, string> = {}
    this.values.forEach((value, key) => {
      obj[key] = value
    })
    return obj
  }

  isLoaded(): boolean {
    return this.loaded
  }

  getCategory(): string {
    return this.category
  }

  getLanguage(): string | null {
    return this.language
  }
}

/**
 * Config cache - shared across all components
 */
const configCache = new Map<string, FrontendConfig>()

/**
 * useConfig Hook - React hook for configuration access
 *
 * Enterprise-level configuration hook with automatic backend sync.
 * Similar to useTranslation but for all config types.
 *
 * Usage for i18n:
 * const config = useConfig('homepage', 'de')
 * return <h1>{config.get('home.title', 'Welcome')}</h1>
 *
 * Usage for app config:
 * const config = useConfig('feature-flags')
 * const enabled = config.getBoolean('darkMode.enabled', false)
 *
 * @param category Config category
 * @param language Language code (for i18n) or null (for app configs)
 * @returns FrontendConfig object with fluent API
 */
export function useConfig(category: string, language: string | null = null): FrontendConfig {
  const cacheKey = language ? `${category}_${language}` : category

  // Get or create config from cache
  if (!configCache.has(cacheKey)) {
    configCache.set(cacheKey, new FrontendConfig(category, language))
  }

  const config = configCache.get(cacheKey)!

  const [isLoading, setIsLoading] = useState(!config.isLoaded())
  const [error, setError] = useState<Error | null>(null)

  // Load from backend on mount
  useEffect(() => {
    if (config.isLoaded()) {
      setIsLoading(false)
      return
    }

    const loadConfig = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Determine endpoint based on type
        const endpoint = language
          ? `/api/config/i18n/${category}/${language}`
          : `/api/config/app/${category}`

        // Send defaults to backend for auto-registration
        const defaults = config.getDefaultsObject()

        const response = await api.post<Record<string, string>>(endpoint, defaults)

        // Load values into config
        config.load(response)

        logger.info('CONFIG_HOOK_001', 'Config loaded successfully', {
          category,
          language: language || 'none',
          entries: Object.keys(response).length
        })

        setIsLoading(false)
      } catch (err) {
        const error = err as Error
        logger.error('CONFIG_HOOK_ERR_001', 'Failed to load config', error, {
          category,
          language: language || 'none'
        })
        setError(error)
        setIsLoading(false)
      }
    }

    loadConfig()
  }, [category, language, config])

  // For debugging
  if (error) {
    logger.warn('CONFIG_HOOK_WARN_001', 'Config error - using defaults', {
      category,
      error: error.message
    })
  }

  return config
}

/**
 * useTranslations Hook - Specialized i18n hook
 *
 * Convenience wrapper around useConfig for translations.
 * Uses current language from i18n context.
 *
 * Usage:
 * const config = useTranslations('homepage')
 * return <h1>{config.get('home.title', 'Welcome')}</h1>
 *
 * @param category Translation category
 * @returns FrontendConfig object with fluent API
 */
export function useTranslations(category: string): FrontendConfig {
  // TODO: Get language from i18n context
  // For now, use 'de' as default
  const language = 'de' // Will be: useI18nContext().language

  return useConfig(category, language)
}

/**
 * Clear config cache
 *
 * Useful for development or when forcing reload
 */
export function clearConfigCache() {
  configCache.clear()
  logger.info('CONFIG_HOOK_002', 'Config cache cleared', {})
}
