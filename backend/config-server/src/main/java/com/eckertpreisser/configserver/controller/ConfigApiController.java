package com.eckertpreisser.configserver.controller;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.configserver.model.ConfigType;
import com.eckertpreisser.configserver.service.ConfigService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * ConfigApiController - REST API for configuration management
 *
 * Enterprise-level RESTful API for configuration access.
 * Provides endpoints for CRUD operations on all config types.
 *
 * API Endpoints:
 * - POST   /api/config/i18n/{category}/{language}        - Get or register i18n config
 * - GET    /api/config/i18n/{category}/{language}        - Get i18n config (read-only)
 * - PUT    /api/config/i18n/{category}/{language}/{key}  - Update single key
 * - DELETE /api/config/i18n/{category}/{language}/{key}  - Delete single key
 * - DELETE /api/config/i18n/{category}/{language}        - Delete entire config
 * - GET    /api/config/i18n/categories/{language}        - List all categories
 *
 * - POST   /api/config/app/{category}                    - Get or register app config
 * - GET    /api/config/app/{category}                    - Get app config
 * - PUT    /api/config/app/{category}/{key}              - Update app config key
 * - DELETE /api/config/app/{category}                    - Delete app config
 *
 * - GET    /api/config/cache/clear                       - Clear cache
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
@RestController
@RequestMapping("/api/config")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend access
public class ConfigApiController {

    private static final Logger logger = LoggerFactory.getLogger(ConfigApiController.class);
    private final ConfigService configService;

    // ========================================
    // I18N Endpoints
    // ========================================

    /**
     * Get or register i18n configuration
     *
     * POST /api/config/i18n/{category}/{language}
     * Body: { "home.title": "Welcome", "home.subtitle": "..." }
     *
     * If config doesn't exist → creates with defaults
     * If exists → merges (existing values win)
     *
     * @param category Config category (e.g., "homepage", "concept")
     * @param language Language code (e.g., "de", "en")
     * @param defaults Default key-value pairs (EN)
     * @return Merged configuration
     */
    @PostMapping("/i18n/{category}/{language}")
    public ResponseEntity<Map<String, String>> getOrRegisterI18n(
            @PathVariable String category,
            @PathVariable String language,
            @RequestBody(required = false) Map<String, String> defaults
    ) {
        LoggerUtil.info(logger, "CONFIG_API_001", "I18n config requested",
                Map.of("category", category, "language", language,
                        "hasDefaults", String.valueOf(defaults != null && !defaults.isEmpty())));

        Map<String, String> config = configService.getOrCreate(
                category,
                language,
                ConfigType.I18N,
                defaults
        );

        return ResponseEntity.ok(config);
    }

    /**
     * Get i18n configuration (read-only)
     *
     * GET /api/config/i18n/{category}/{language}
     *
     * @param category Config category
     * @param language Language code
     * @return Configuration map
     */
    @GetMapping("/i18n/{category}/{language}")
    public ResponseEntity<Map<String, String>> getI18n(
            @PathVariable String category,
            @PathVariable String language
    ) {
        LoggerUtil.info(logger, "CONFIG_API_002", "I18n config read request",
                Map.of("category", category, "language", language));

        Map<String, String> config = configService.load(category, language, ConfigType.I18N).getAll();
        return ResponseEntity.ok(config);
    }

    /**
     * Update single i18n key
     *
     * PUT /api/config/i18n/{category}/{language}/{key}
     * Body: { "value": "New translation" }
     *
     * @param category Config category
     * @param language Language code
     * @param key Configuration key
     * @param body Request body with new value
     * @return Success response
     */
    @PutMapping("/i18n/{category}/{language}/{key}")
    public ResponseEntity<Void> updateI18nKey(
            @PathVariable String category,
            @PathVariable String language,
            @PathVariable String key,
            @RequestBody Map<String, String> body
    ) {
        String value = body.get("value");

        LoggerUtil.info(logger, "CONFIG_API_003", "I18n key update request",
                Map.of("category", category, "language", language, "key", key));

        configService.update(category, language, ConfigType.I18N, key, value);
        return ResponseEntity.ok().build();
    }

    /**
     * Delete single i18n key
     *
     * DELETE /api/config/i18n/{category}/{language}/{key}
     *
     * @param category Config category
     * @param language Language code
     * @param key Configuration key
     * @return Success response
     */
    @DeleteMapping("/i18n/{category}/{language}/{key}")
    public ResponseEntity<Void> deleteI18nKey(
            @PathVariable String category,
            @PathVariable String language,
            @PathVariable String key
    ) {
        LoggerUtil.info(logger, "CONFIG_API_004", "I18n key delete request",
                Map.of("category", category, "language", language, "key", key));

        configService.deleteKey(category, language, ConfigType.I18N, key);
        return ResponseEntity.ok().build();
    }

    /**
     * Delete entire i18n configuration
     *
     * DELETE /api/config/i18n/{category}/{language}
     *
     * @param category Config category
     * @param language Language code
     * @return Success response
     */
    @DeleteMapping("/i18n/{category}/{language}")
    public ResponseEntity<Void> deleteI18n(
            @PathVariable String category,
            @PathVariable String language
    ) {
        LoggerUtil.info(logger, "CONFIG_API_005", "I18n config delete request",
                Map.of("category", category, "language", language));

        boolean deleted = configService.delete(category, language, ConfigType.I18N);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    /**
     * List all i18n categories for language
     *
     * GET /api/config/i18n/categories/{language}
     *
     * @param language Language code
     * @return List of category names
     */
    @GetMapping("/i18n/categories/{language}")
    public ResponseEntity<List<String>> listI18nCategories(@PathVariable String language) {
        LoggerUtil.info(logger, "CONFIG_API_006", "List i18n categories request",
                Map.of("language", language));

        List<String> categories = configService.listCategories(ConfigType.I18N, language);
        return ResponseEntity.ok(categories);
    }

    // ========================================
    // App Config Endpoints
    // ========================================

    /**
     * Get or register app configuration
     *
     * POST /api/config/app/{category}
     * Body: { "server.port": "8080", "app.name": "My Service" }
     *
     * @param category Config category (e.g., "api-gateway", "user-service")
     * @param defaults Default key-value pairs
     * @return Merged configuration
     */
    @PostMapping("/app/{category}")
    public ResponseEntity<Map<String, String>> getOrRegisterApp(
            @PathVariable String category,
            @RequestBody(required = false) Map<String, String> defaults
    ) {
        LoggerUtil.info(logger, "CONFIG_API_007", "App config requested",
                Map.of("category", category,
                        "hasDefaults", String.valueOf(defaults != null && !defaults.isEmpty())));

        Map<String, String> config = configService.getOrCreate(
                category,
                null, // No language for app configs
                ConfigType.APP,
                defaults
        );

        return ResponseEntity.ok(config);
    }

    /**
     * Get app configuration (read-only)
     *
     * GET /api/config/app/{category}
     *
     * @param category Config category
     * @return Configuration map
     */
    @GetMapping("/app/{category}")
    public ResponseEntity<Map<String, String>> getApp(@PathVariable String category) {
        LoggerUtil.info(logger, "CONFIG_API_008", "App config read request",
                Map.of("category", category));

        Map<String, String> config = configService.load(category, null, ConfigType.APP).getAll();
        return ResponseEntity.ok(config);
    }

    /**
     * Update single app config key
     *
     * PUT /api/config/app/{category}/{key}
     * Body: { "value": "new-value" }
     *
     * @param category Config category
     * @param key Configuration key
     * @param body Request body with new value
     * @return Success response
     */
    @PutMapping("/app/{category}/{key}")
    public ResponseEntity<Void> updateAppKey(
            @PathVariable String category,
            @PathVariable String key,
            @RequestBody Map<String, String> body
    ) {
        String value = body.get("value");

        LoggerUtil.info(logger, "CONFIG_API_009", "App config key update request",
                Map.of("category", category, "key", key));

        configService.update(category, null, ConfigType.APP, key, value);
        return ResponseEntity.ok().build();
    }

    /**
     * Delete app configuration
     *
     * DELETE /api/config/app/{category}
     *
     * @param category Config category
     * @return Success response
     */
    @DeleteMapping("/app/{category}")
    public ResponseEntity<Void> deleteApp(@PathVariable String category) {
        LoggerUtil.info(logger, "CONFIG_API_010", "App config delete request",
                Map.of("category", category));

        boolean deleted = configService.delete(category, null, ConfigType.APP);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    /**
     * List all app config categories
     *
     * GET /api/config/app/categories
     *
     * @return List of category names
     */
    @GetMapping("/app/categories")
    public ResponseEntity<List<String>> listAppCategories() {
        LoggerUtil.info(logger, "CONFIG_API_011", "List app categories request", Map.of());

        List<String> categories = configService.listCategories(ConfigType.APP, null);
        return ResponseEntity.ok(categories);
    }

    // ========================================
    // Cache Management
    // ========================================

    /**
     * Clear configuration cache
     *
     * GET /api/config/cache/clear
     *
     * Useful for development or when configs are edited externally
     *
     * @return Success response
     */
    @GetMapping("/cache/clear")
    public ResponseEntity<Map<String, String>> clearCache() {
        LoggerUtil.info(logger, "CONFIG_API_012", "Cache clear request", Map.of());

        configService.clearCache();

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Cache cleared successfully"
        ));
    }

    /**
     * Health check endpoint
     *
     * GET /api/config/health
     *
     * @return Health status
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Config Server API",
                "version", "2.0.0"
        ));
    }
}
