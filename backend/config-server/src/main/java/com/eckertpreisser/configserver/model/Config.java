package com.eckertpreisser.configserver.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Config - Fluent API for configuration access
 *
 * Enterprise-level configuration container with fluent API.
 * Provides elegant access to configuration values with defaults.
 *
 * Usage:
 * Config config = configService.load("homepage", "de");
 * String title = config.get("home.hero.title", "Welcome");
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
public class Config {

    private final String category;
    private final String language;
    private final ConfigType type;
    private final Map<String, String> values;
    private final Map<String, String> defaults;
    private boolean modified;

    /**
     * Constructor for Config
     *
     * @param category Config category (e.g., "homepage", "email")
     * @param language Language code (e.g., "de", "en") - null for non-i18n configs
     * @param type Config type
     */
    public Config(String category, String language, ConfigType type) {
        this.category = category;
        this.language = language;
        this.type = type;
        this.values = new HashMap<>();
        this.defaults = new HashMap<>();
        this.modified = false;
    }

    /**
     * Get configuration value with default
     *
     * If key exists in loaded config → return stored value
     * If key doesn't exist → return default and register it for auto-save
     *
     * @param key Configuration key
     * @param defaultValue Default value if key not found
     * @return Configuration value or default
     */
    public String get(String key, String defaultValue) {
        // Register default for auto-registration
        if (!defaults.containsKey(key)) {
            defaults.put(key, defaultValue);
            modified = true;
        }

        // Return existing value or default
        return values.getOrDefault(key, defaultValue);
    }

    /**
     * Get configuration value without default
     *
     * @param key Configuration key
     * @return Configuration value or null
     */
    public String get(String key) {
        return values.get(key);
    }

    /**
     * Get configuration value as Optional
     *
     * @param key Configuration key
     * @return Optional containing value if present
     */
    public Optional<String> getOptional(String key) {
        return Optional.ofNullable(values.get(key));
    }

    /**
     * Get configuration value as integer
     *
     * @param key Configuration key
     * @param defaultValue Default value if key not found or invalid
     * @return Integer value or default
     */
    public int getInt(String key, int defaultValue) {
        String value = get(key);
        if (value == null) {
            return defaultValue;
        }
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    /**
     * Get configuration value as boolean
     *
     * @param key Configuration key
     * @param defaultValue Default value if key not found
     * @return Boolean value or default
     */
    public boolean getBoolean(String key, boolean defaultValue) {
        String value = get(key);
        if (value == null) {
            return defaultValue;
        }
        return Boolean.parseBoolean(value);
    }

    /**
     * Set configuration value
     *
     * @param key Configuration key
     * @param value Configuration value
     */
    public void set(String key, String value) {
        values.put(key, value);
        modified = true;
    }

    /**
     * Check if config contains key
     *
     * @param key Configuration key
     * @return true if key exists
     */
    public boolean contains(String key) {
        return values.containsKey(key);
    }

    /**
     * Get all configuration values
     *
     * @return Map of all key-value pairs
     */
    public Map<String, String> getAll() {
        return new HashMap<>(values);
    }

    /**
     * Get all registered defaults
     *
     * @return Map of all default key-value pairs
     */
    public Map<String, String> getDefaults() {
        return new HashMap<>(defaults);
    }

    /**
     * Load values into config
     *
     * @param values Map of key-value pairs to load
     */
    public void load(Map<String, String> values) {
        this.values.clear();
        this.values.putAll(values);
        this.modified = false;
    }

    /**
     * Merge values with existing config (new values override existing)
     *
     * @param newValues Map of key-value pairs to merge
     */
    public void merge(Map<String, String> newValues) {
        this.values.putAll(newValues);
        this.modified = true;
    }

    // Getters

    public String getCategory() {
        return category;
    }

    public String getLanguage() {
        return language;
    }

    public ConfigType getType() {
        return type;
    }

    public boolean isModified() {
        return modified;
    }

    public void setModified(boolean modified) {
        this.modified = modified;
    }

    /**
     * Get display name for logging
     *
     * @return Display name (e.g., "homepage-de", "api-gateway")
     */
    public String getDisplayName() {
        if (type == ConfigType.I18N && language != null) {
            return category + "-" + language;
        }
        return category;
    }

    @Override
    public String toString() {
        return "Config{" +
                "category='" + category + '\'' +
                ", language='" + language + '\'' +
                ", type=" + type +
                ", entries=" + values.size() +
                ", modified=" + modified +
                '}';
    }
}
