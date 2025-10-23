package com.eckertpreisser.config.client;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * ServiceConfig - Configuration container for microservices
 *
 * Fluent API for accessing configuration values in backend services.
 * Similar to Config.java in config-server but simplified for client use.
 *
 * Usage:
 * String subject = config.get("email.welcome.subject", "Welcome!");
 * int port = config.getInt("server.port", 8080);
 * boolean enabled = config.getBoolean("feature.enabled", false);
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
public class ServiceConfig {

    private final String category;
    private final String language;
    private final Map<String, String> values;
    private final Map<String, String> defaults;

    public ServiceConfig(String category, String language, Map<String, String> values, Map<String, String> defaults) {
        this.category = category;
        this.language = language;
        this.values = values;
        this.defaults = defaults;
    }

    /**
     * Get configuration value with default
     *
     * @param key Configuration key
     * @param defaultValue Default value if key not found
     * @return Configuration value or default
     */
    public String get(String key, String defaultValue) {
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
     * Get configuration value as long
     *
     * @param key Configuration key
     * @param defaultValue Default value if key not found or invalid
     * @return Long value or default
     */
    public long getLong(String key, long defaultValue) {
        String value = get(key);
        if (value == null) {
            return defaultValue;
        }
        try {
            return Long.parseLong(value);
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
     * Get configuration value as double
     *
     * @param key Configuration key
     * @param defaultValue Default value if key not found or invalid
     * @return Double value or default
     */
    public double getDouble(String key, double defaultValue) {
        String value = get(key);
        if (value == null) {
            return defaultValue;
        }
        try {
            return Double.parseDouble(value);
        } catch (NumberFormatException e) {
            return defaultValue;
        }
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
     * Get category
     *
     * @return Config category
     */
    public String getCategory() {
        return category;
    }

    /**
     * Get language
     *
     * @return Language code or null
     */
    public String getLanguage() {
        return language;
    }

    @Override
    public String toString() {
        return "ServiceConfig{" +
                "category='" + category + '\'' +
                ", language='" + language + '\'' +
                ", entries=" + values.size() +
                '}';
    }
}
