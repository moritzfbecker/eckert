package com.eckertpreisser.config.client;

import com.eckertpreisser.common.utils.LoggerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ConfigClient - Client for accessing Config Server API
 *
 * Enterprise-level client for microservices to access configurations.
 * Provides fluent API similar to frontend useConfig hook.
 *
 * Usage in microservices:
 * Config config = configClient.load("email", "de");
 * String subject = config.get("email.welcome.subject", "Welcome!");
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
@Component
public class ConfigClient {

    private static final Logger logger = LoggerFactory.getLogger(ConfigClient.class);

    @Value("${config.server.url:http://config-server:8888}")
    private String configServerUrl;

    private final RestTemplate restTemplate;
    private final Map<String, ServiceConfig> cache = new ConcurrentHashMap<>();

    public ConfigClient() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Load i18n configuration
     *
     * Usage:
     * Config config = configClient.load("email", "de");
     * String subject = config.get("email.welcome.subject", "Welcome!");
     *
     * @param category Config category (e.g., "email", "homepage")
     * @param language Language code (e.g., "de", "en")
     * @return ServiceConfig with fluent API
     */
    public ServiceConfig load(String category, String language) {
        return load(category, language, ConfigClientType.I18N, new HashMap<>());
    }

    /**
     * Load configuration with defaults
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @param defaults Default values (EN)
     * @return ServiceConfig with fluent API
     */
    public ServiceConfig load(String category, String language, ConfigClientType type, Map<String, String> defaults) {
        String cacheKey = getCacheKey(category, language, type);

        // Check cache first
        if (cache.containsKey(cacheKey)) {
            LoggerUtil.info(logger, "CONFIG_CLIENT_001", "Config loaded from cache",
                    Map.of("category", category, "language", language != null ? language : "none"));
            return cache.get(cacheKey);
        }

        // Load from Config Server
        Map<String, String> values = fetchFromServer(category, language, type, defaults);

        // Create ServiceConfig
        ServiceConfig config = new ServiceConfig(category, language, values, defaults);

        // Cache it
        cache.put(cacheKey, config);

        LoggerUtil.info(logger, "CONFIG_CLIENT_002", "Config loaded from server",
                Map.of("category", category, "language", language != null ? language : "none",
                        "entries", values.size()));

        return config;
    }

    /**
     * Load app configuration
     *
     * Usage:
     * Config config = configClient.loadApp("api-gateway");
     * int port = config.getInt("server.port", 8080);
     *
     * @param category App config category (e.g., "api-gateway")
     * @return ServiceConfig with fluent API
     */
    public ServiceConfig loadApp(String category) {
        return load(category, null, ConfigClientType.APP, new HashMap<>());
    }

    /**
     * Load app configuration with defaults
     *
     * @param category App config category
     * @param defaults Default key-value pairs
     * @return ServiceConfig with fluent API
     */
    public ServiceConfig loadApp(String category, Map<String, String> defaults) {
        return load(category, null, ConfigClientType.APP, defaults);
    }

    /**
     * Clear cache
     *
     * Useful for development or when configs are updated
     */
    public void clearCache() {
        cache.clear();
        LoggerUtil.info(logger, "CONFIG_CLIENT_003", "Cache cleared", Map.of());
    }

    /**
     * Reload config from server (bypass cache)
     *
     * @param category Config category
     * @param language Language code
     * @param type Config type
     * @return Fresh ServiceConfig
     */
    public ServiceConfig reload(String category, String language, ConfigClientType type) {
        String cacheKey = getCacheKey(category, language, type);
        cache.remove(cacheKey);
        return load(category, language, type, new HashMap<>());
    }

    // Private helpers

    /**
     * Fetch configuration from Config Server API
     */
    private Map<String, String> fetchFromServer(String category, String language, ConfigClientType type, Map<String, String> defaults) {
        try {
            String url = buildUrl(category, language, type);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(defaults, headers);

            ResponseEntity<Map<String, String>> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    new ParameterizedTypeReference<Map<String, String>>() {
                    }
            );

            return response.getBody() != null ? response.getBody() : new HashMap<>();

        } catch (Exception e) {
            LoggerUtil.warn(logger, "CONFIG_CLIENT_WARN_001", "Config Server unavailable, using defaults",
                    Map.of("category", category, "error", e.getMessage()));
            return defaults;
        }
    }

    /**
     * Build API URL
     */
    private String buildUrl(String category, String language, ConfigClientType type) {
        if (type == ConfigClientType.I18N && language != null) {
            return configServerUrl + "/api/config/i18n/" + category + "/" + language;
        } else if (type == ConfigClientType.APP) {
            return configServerUrl + "/api/config/app/" + category;
        }
        throw new IllegalArgumentException("Invalid config type: " + type);
    }

    /**
     * Generate cache key
     */
    private String getCacheKey(String category, String language, ConfigClientType type) {
        if (type == ConfigClientType.I18N && language != null) {
            return type + "_" + category + "_" + language;
        }
        return type + "_" + category;
    }
}
