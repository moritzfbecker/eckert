package com.eckertpreisser.apigateway.controller;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.common.utils.MessageSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

/**
 * I18n Controller (WebFlux/Reactive for Spring Cloud Gateway)
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
     * @return Mono of Map with all translations
     */
    @GetMapping("/i18n/messages/{language}")
    public Mono<ResponseEntity<Map<String, String>>> getMessages(@PathVariable String language) {
        return Mono.fromCallable(() -> {
            try {
                LoggerUtil.info(logger, "I18N_API_001", "Loading messages for language",
                    Map.of("language", language));

                // Get all supported languages
                String[] supportedLanguages = MessageSource.getSupportedLanguages();
                String finalLanguage = language;
                boolean isSupported = false;
                for (String lang : supportedLanguages) {
                    if (lang.equals(finalLanguage)) {
                        isSupported = true;
                        break;
                    }
                }

                if (!isSupported) {
                    LoggerUtil.warn(logger, "I18N_API_WARN_001", "Unsupported language requested",
                        Map.of("language", finalLanguage, "fallback", "de"));
                    finalLanguage = "de";
                }

                // Get all messages
                Map<String, String> messages = getAllMessagesForLanguage(finalLanguage);

                LoggerUtil.info(logger, "I18N_API_002", "Messages loaded successfully",
                    Map.of("language", finalLanguage, "count", messages.size()));

                return ResponseEntity.ok(messages);

            } catch (Exception e) {
                LoggerUtil.error(logger, "I18N_API_ERR_001", "Failed to load messages", e,
                    Map.of("language", language));
                return ResponseEntity.internalServerError().<Map<String, String>>build();
            }
        });
    }

    /**
     * Get language configuration
     *
     * @return Mono of Language configuration
     */
    @GetMapping("/config/language")
    public Mono<ResponseEntity<Map<String, Object>>> getLanguageConfig() {
        return Mono.fromCallable(() -> {
            try {
                LoggerUtil.info(logger, "I18N_API_003", "Loading language configuration");

                Map<String, Object> config = new HashMap<>();
                config.put("defaultLanguage", "de");
                config.put("supportedLanguages", MessageSource.getSupportedLanguages());
                config.put("fallbackLanguage", "en");

                return ResponseEntity.ok(config);

            } catch (Exception e) {
                LoggerUtil.error(logger, "I18N_API_ERR_002", "Failed to load language config", e);
                return ResponseEntity.internalServerError().<Map<String, Object>>build();
            }
        });
    }

    /**
     * Get all messages for a language
     * Dynamically loads ALL keys from MessageSource
     */
    private Map<String, String> getAllMessagesForLanguage(String language) {
        // Use MessageSource.getAllMessages() to dynamically get ALL translation keys
        // This ensures new keys are automatically included without manual updates
        return MessageSource.getAllMessages(language);
    }
}
