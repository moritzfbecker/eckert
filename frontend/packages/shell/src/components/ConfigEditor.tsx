import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../shared/ui-components/Button'
import { Input } from '../../../shared/ui-components/Input'
import { logger } from '@eckert-preisser/shared/utils'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

interface ConfigEditorProps {
  onSave?: () => void
}

export const ConfigEditor = ({ onSave }: ConfigEditorProps) => {
  const [languages, setLanguages] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [config, setConfig] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Load available languages on mount
  useEffect(() => {
    loadLanguages()
  }, [])

  // Load categories when language changes
  useEffect(() => {
    if (selectedLanguage) {
      loadCategories(selectedLanguage)
    }
  }, [selectedLanguage])

  // Load config when category changes
  useEffect(() => {
    if (selectedLanguage && selectedCategory) {
      loadConfig(selectedLanguage, selectedCategory)
    }
  }, [selectedLanguage, selectedCategory])

  const loadLanguages = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/config/i18n/languages`)

      if (!response.ok) {
        throw new Error(`Failed to load languages: ${response.statusText}`)
      }

      const langs: string[] = await response.json()
      setLanguages(langs)

      // Auto-select first language
      if (langs.length > 0 && !selectedLanguage) {
        setSelectedLanguage(langs[0])
      }

      logger.info('CONFIG_EDITOR_001', 'Languages loaded', { count: langs.length })
    } catch (error) {
      logger.error('CONFIG_EDITOR_ERR_001', 'Failed to load languages', error as Error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async (language: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/config/i18n/categories/${language}`)

      if (!response.ok) {
        throw new Error(`Failed to load categories: ${response.statusText}`)
      }

      const cats: string[] = await response.json()
      setCategories(cats)

      // Auto-select first category
      if (cats.length > 0 && !selectedCategory) {
        setSelectedCategory(cats[0])
      }

      logger.info('CONFIG_EDITOR_002', 'Categories loaded', { language, count: cats.length })
    } catch (error) {
      logger.error('CONFIG_EDITOR_ERR_002', 'Failed to load categories', error as Error)
    } finally {
      setLoading(false)
    }
  }

  const loadConfig = async (language: string, category: string) => {
    try {
      setLoading(true)
      setSaveStatus('idle')

      const response = await fetch(`${API_BASE}/config/i18n/${category}/${language}`)

      if (!response.ok) {
        throw new Error(`Failed to load config: ${response.statusText}`)
      }

      const data: Record<string, string> = await response.json()
      setConfig(data)

      logger.info('CONFIG_EDITOR_003', 'Config loaded', { language, category, keys: Object.keys(data).length })
    } catch (error) {
      logger.error('CONFIG_EDITOR_ERR_003', 'Failed to load config', error as Error)
      setConfig({})
    } finally {
      setLoading(false)
    }
  }

  const handleConfigChange = (key: string, value: string) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }))
    setSaveStatus('idle')
  }

  const handleSave = async () => {
    if (!selectedLanguage || !selectedCategory) return

    try {
      setSaving(true)
      setSaveStatus('idle')

      // Get auth token from localStorage
      const token = localStorage.getItem('configAdminToken')

      if (!token) {
        logger.error('CONFIG_EDITOR_ERR_005', 'No auth token found')
        setSaveStatus('error')
        return
      }

      // Save each key individually with auth header
      const savePromises = Object.entries(config).map(([key, value]) =>
        fetch(`${API_BASE}/config/i18n/${selectedCategory}/${selectedLanguage}/${key}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ value })
        })
      )

      await Promise.all(savePromises)

      // Clear cache to ensure changes are reflected (with auth)
      await fetch(`${API_BASE}/config/cache/clear`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      setSaveStatus('success')
      logger.info('CONFIG_EDITOR_004', 'Config saved successfully', {
        language: selectedLanguage,
        category: selectedCategory,
        keys: Object.keys(config).length
      })

      // Call onSave callback if provided
      onSave?.()

      // Reset success message after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000)

    } catch (error) {
      logger.error('CONFIG_EDITOR_ERR_004', 'Failed to save config', error as Error)
      setSaveStatus('error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Language & Category Selectors */}
      <div className="bg-black rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Language Selector */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Sprache / Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value)
                setSelectedCategory('') // Reset category when language changes
              }}
              className="w-full px-4 py-2 bg-white text-black rounded-md border border-black/20 focus:outline-none focus:ring-2 focus:ring-white/20"
              disabled={loading}
            >
              <option value="">Wählen Sie eine Sprache...</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Kategorie / Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-white text-black rounded-md border border-black/20 focus:outline-none focus:ring-2 focus:ring-white/20"
              disabled={loading || !selectedLanguage}
            >
              <option value="">Wählen Sie eine Kategorie...</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Config Editor */}
      {selectedLanguage && selectedCategory && (
        <div className="bg-black rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">
            Texte bearbeiten
          </h3>

          {loading ? (
            <div className="text-white/60 text-center py-8">
              Lädt...
            </div>
          ) : Object.keys(config).length === 0 ? (
            <div className="text-white/60 text-center py-8">
              Keine Konfiguration gefunden. Wählen Sie eine andere Kategorie.
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(config).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-white/80 text-sm font-medium mb-1">
                    {key}
                  </label>
                  <Input
                    value={value}
                    onChange={(e) => handleConfigChange(key, e.target.value)}
                    className="w-full"
                    placeholder={`Wert für ${key}...`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Save Button */}
          {Object.keys(config).length > 0 && (
            <div className="flex items-center gap-4 pt-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-white text-black hover:shadow-apple-glow"
              >
                {saving ? '💾 Speichert...' : '💾 Speichern'}
              </Button>

              {/* Status Message */}
              {saveStatus === 'success' && (
                <span className="text-green-400 font-medium">
                  ✓ Erfolgreich gespeichert!
                </span>
              )}
              {saveStatus === 'error' && (
                <span className="text-red-400 font-medium">
                  ✗ Fehler beim Speichern
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Help Text */}
      <div className="bg-black/50 rounded-lg p-4 text-white/60 text-sm">
        <p>
          <strong>Hinweis:</strong> Änderungen werden sofort gespeichert und sind nach dem Speichern direkt auf der Website sichtbar.
          Der Cache wird automatisch geleert.
        </p>
      </div>
    </motion.div>
  )
}
