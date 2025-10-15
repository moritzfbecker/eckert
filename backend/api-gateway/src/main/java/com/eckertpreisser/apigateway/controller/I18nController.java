package com.eckertpreisser.apigateway.controller;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.common.utils.MessageSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * I18n Controller
 *
 * Provides translation endpoints for frontend
 * Serves messages from external i18n files
 *
 * Endpoints:
 * GET /api/i18n/messages/{language} - Get all messages for a language
 * GET /api/config/language - Get language configuration
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class I18nController {

    private static final Logger logger = LoggerFactory.getLogger(I18nController.class);

    /**
     * Get all messages for a specific language
     *
     * @param language Language code (de or en)
     * @return Map of all translations
     */
    @GetMapping("/i18n/messages/{language}")
    public ResponseEntity<Map<String, String>> getMessages(@PathVariable String language) {
        try {
            LoggerUtil.info(logger, "I18N_API_001", "Loading messages for language",
                Map.of("language", language));

            // Get all supported languages
            String[] supportedLanguages = MessageSource.getSupportedLanguages();
            boolean isSupported = false;
            for (String lang : supportedLanguages) {
                if (lang.equals(language)) {
                    isSupported = true;
                    break;
                }
            }

            if (!isSupported) {
                LoggerUtil.warn(logger, "I18N_API_WARN_001", "Unsupported language requested",
                    Map.of("language", language, "fallback", "de"));
                language = "de";
            }

            // Get all messages
            Map<String, String> messages = getAllMessagesForLanguage(language);

            LoggerUtil.info(logger, "I18N_API_002", "Messages loaded successfully",
                Map.of("language", language, "count", messages.size()));

            return ResponseEntity.ok(messages);

        } catch (Exception e) {
            LoggerUtil.error(logger, "I18N_API_ERR_001", "Failed to load messages", e,
                Map.of("language", language));
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get language configuration
     *
     * @return Language configuration
     */
    @GetMapping("/config/language")
    public ResponseEntity<Map<String, Object>> getLanguageConfig() {
        try {
            LoggerUtil.info(logger, "I18N_API_003", "Loading language configuration");

            Map<String, Object> config = new HashMap<>();
            config.put("defaultLanguage", "de");
            config.put("supportedLanguages", MessageSource.getSupportedLanguages());
            config.put("fallbackLanguage", "en");

            return ResponseEntity.ok(config);

        } catch (Exception e) {
            LoggerUtil.error(logger, "I18N_API_ERR_002", "Failed to load language config", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get all messages for a language
     */
    private Map<String, String> getAllMessagesForLanguage(String language) {
        Map<String, String> messages = new HashMap<>();

        // Load all predefined keys
        // This is a simple implementation - in production you might want to load from Properties file directly
        String[] keys = {
            "app.name", "app.welcome",
            "nav.home", "nav.products", "nav.dashboard", "nav.account", "nav.login", "nav.logout",
            "nav.solutions", "nav.archive", "nav.contact",
            "user.profile", "user.settings", "user.created", "user.updated", "user.deleted",
            "user.not.found", "user.already.exists", "user.welcome",
            "button.save", "button.cancel", "button.delete", "button.edit", "button.submit",
            "button.back", "button.next", "button.get.started", "button.learn.more",
            "form.email", "form.password", "form.first.name", "form.last.name", "form.phone", "form.address",
            "validation.required", "validation.email.invalid", "validation.password.weak", "validation.password.mismatch",
            "error.something.went.wrong", "error.try.again", "error.internal", "error.unauthorized",
            "error.forbidden", "error.not.found",
            "success.saved", "success.deleted", "success.updated",
            "home.hero.title", "home.hero.subtitle", "home.features.title",
            "home.feature.fast.title", "home.feature.fast.desc",
            "home.feature.secure.title", "home.feature.secure.desc",
            "home.feature.scalable.title", "home.feature.scalable.desc"
        };

        for (String key : keys) {
            messages.put(key, MessageSource.getMessage(key, language));
        }

        return messages;
    }
}
