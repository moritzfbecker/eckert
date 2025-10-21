package com.eckertpreisser.configserver.service;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.configserver.model.Config;
import com.eckertpreisser.configserver.model.ConfigType;
import com.eckertpreisser.configserver.repository.ConfigRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ConfigService - Core configuration management service
 *
 * Enterprise-level configuration service with auto-registration,
 * caching, and fluent API support.
 *
 * Features:
 * - Lazy loading with auto-registration
 * - In-memory caching
 * - Auto-save on new defaults
 * - Thread-safe operations
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
@Service
@RequiredArgsConstructor
public class ConfigService {

    private static final Logger logger = LoggerFactory.getLogger(ConfigService.class);
    private final ConfigRepository repository;

    // Cache: category_language -> Config
    private final Map<String, Config> cache = new ConcurrentHashMap<>();

    /**
     * Load configuration with fluent API
     *
     * Main entry point for config access. Returns Config object
     * that allows fluent .get() calls.
     *
     * Usage:
     * Config config = configService.load("homepage", "de");
     * String title = config.get("home.title", "Welcome");
     *
     * @param category Config category (e.g., "homepage", "email")
     * @param language Language code (e.g., "de", "en") - null for non-i18n
     * @return Config object with fluent API
     */
    public Config load(String category, String language) {
        return load(category, language, ConfigType.I18N);
    }

    /**
     * Load configuration with type
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @return Config object with fluent API
     */
    public Config load(String category, String language, ConfigType type) {
        String cacheKey = getCacheKey(category, language, type);

        // Check cache first
        if (cache.containsKey(cacheKey)) {
            LoggerUtil.info(logger, "CONFIG_SRV_001", "Config loaded from cache",
                    Map.of("category", category, "language", language != null ? language : "none"));
            return cache.get(cacheKey);
        }

        // Load from file
        Map<String, String> values = repository.load(category, language, type);

        // Create Config object
        Config config = new Config(category, language, type);
        config.load(values);

        // Cache it
        cache.put(cacheKey, config);

        LoggerUtil.info(logger, "CONFIG_SRV_002", "Config loaded from file",
                Map.of("category", category, "language", language != null ? language : "none",
                        "entries", values.size()));

        return config;
    }

    /**
     * Save configuration
     *
     * Persists config to file if modified.
     * Called automatically when Config has new defaults.
     *
     * @param config Config object to save
     */
    public void save(Config config) {
        if (!config.isModified()) {
            LoggerUtil.info(logger, "CONFIG_SRV_003", "Config not modified, skipping save",
                    Map.of("category", config.getCategory()));
            return;
        }

        // Merge defaults with existing values
        Map<String, String> merged = new HashMap<>(config.getAll());
        config.getDefaults().forEach(merged::putIfAbsent);

        // Save to file
        repository.save(config.getCategory(), config.getLanguage(), config.getType(), merged);

        // Update cache
        config.load(merged);
        config.setModified(false);

        String cacheKey = getCacheKey(config.getCategory(), config.getLanguage(), config.getType());
        cache.put(cacheKey, config);

        LoggerUtil.info(logger, "CONFIG_SRV_004", "Config saved successfully",
                Map.of("category", config.getCategory(), "entries", merged.size()));
    }

    /**
     * Get or create configuration with defaults
     *
     * Used by REST API. If config doesn't exist, creates it with defaults.
     * If exists, merges new defaults with existing (existing wins).
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @param defaults Default values
     * @return Merged configuration
     */
    public Map<String, String> getOrCreate(String category, String language, ConfigType type, Map<String, String> defaults) {
        Config config = load(category, language, type);

        // If config is empty (new), use defaults
        if (config.getAll().isEmpty() && defaults != null && !defaults.isEmpty()) {
            config.merge(defaults);
            save(config);
            LoggerUtil.info(logger, "CONFIG_SRV_005", "Created new config with defaults",
                    Map.of("category", category, "entries", defaults.size()));
            return config.getAll();
        }

        // If config exists, merge defaults (existing values win)
        if (defaults != null && !defaults.isEmpty()) {
            Map<String, String> merged = new HashMap<>(defaults);
            merged.putAll(config.getAll()); // Existing values override defaults

            // Check if any new keys were added
            boolean hasNewKeys = defaults.keySet().stream()
                    .anyMatch(key -> !config.contains(key));

            if (hasNewKeys) {
                config.merge(defaults);
                save(config);
                LoggerUtil.info(logger, "CONFIG_SRV_006", "Merged new defaults into existing config",
                        Map.of("category", category));
            }

            return merged;
        }

        return config.getAll();
    }

    /**
     * Update single configuration value
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @param key Configuration key
     * @param value New value
     */
    public void update(String category, String language, ConfigType type, String key, String value) {
        Config config = load(category, language, type);
        config.set(key, value);
        save(config);

        LoggerUtil.info(logger, "CONFIG_SRV_007", "Config key updated",
                Map.of("category", category, "key", key));
    }

    /**
     * Delete configuration key
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @param key Configuration key to delete
     */
    public void deleteKey(String category, String language, ConfigType type, String key) {
        Config config = load(category, language, type);
        Map<String, String> values = config.getAll();
        values.remove(key);
        config.load(values);
        config.setModified(true);
        save(config);

        LoggerUtil.info(logger, "CONFIG_SRV_008", "Config key deleted",
                Map.of("category", category, "key", key));
    }

    /**
     * Delete entire configuration
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @return true if deleted successfully
     */
    public boolean delete(String category, String language, ConfigType type) {
        boolean deleted = repository.delete(category, language, type);

        if (deleted) {
            String cacheKey = getCacheKey(category, language, type);
            cache.remove(cacheKey);

            LoggerUtil.info(logger, "CONFIG_SRV_009", "Config deleted",
                    Map.of("category", category));
        }

        return deleted;
    }

    /**
     * List all categories
     *
     * @param type Config type
     * @param language Language code (null for all)
     * @return List of category names
     */
    public List<String> listCategories(ConfigType type, String language) {
        return repository.listCategories(type, language);
    }

    /**
     * Clear cache
     *
     * Useful for development/testing or when configs are edited externally
     */
    public void clearCache() {
        cache.clear();
        LoggerUtil.info(logger, "CONFIG_SRV_010", "Cache cleared", Map.of());
    }

    /**
     * Reload configuration from file (bypass cache)
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @return Reloaded Config object
     */
    public Config reload(String category, String language, ConfigType type) {
        String cacheKey = getCacheKey(category, language, type);
        cache.remove(cacheKey);
        return load(category, language, type);
    }

    // Private helpers

    /**
     * Generate cache key
     */
    private String getCacheKey(String category, String language, ConfigType type) {
        if (type == ConfigType.I18N && language != null) {
            return type + "_" + category + "_" + language;
        }
        return type + "_" + category;
    }
}
