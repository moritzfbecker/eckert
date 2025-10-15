package com.eckertpreisser.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Message Source for Multi-Language Support
 *
 * Loads messages from external i18n files
 * Supports: DE (German) and EN (English)
 *
 * Usage:
 * String message = MessageSource.getMessage("user.created", "de");
 * String formatted = MessageSource.getMessage("user.welcome", "en", "John");
 */
public class MessageSource {

    private static final Logger logger = LoggerFactory.getLogger(MessageSource.class);
    private static final String I18N_DIR = "config/i18n";
    private static final String DEFAULT_LANGUAGE = "de";
    private static final Map<String, Properties> messageCache = new HashMap<>();

    static {
        initializeMessageFiles();
    }

    private MessageSource() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * Initialize message files for all supported languages
     */
    private static void initializeMessageFiles() {
        try {
            createI18nDirectory();
            createMessageFile("de");
            createMessageFile("en");
            loadAllMessages();
        } catch (Exception e) {
            LoggerUtil.error(logger, "I18N_ERR_001", "Failed to initialize i18n", e);
        }
    }

    /**
     * Create i18n directory
     */
    private static void createI18nDirectory() throws IOException {
        Path i18nPath = Paths.get(I18N_DIR);
        if (!Files.exists(i18nPath)) {
            Files.createDirectories(i18nPath);
        }
    }

    /**
     * Create message file for specific language
     */
    private static void createMessageFile(String language) throws IOException {
        Path messageFile = Paths.get(I18N_DIR, "messages_" + language + ".properties");
        if (Files.exists(messageFile)) {
            return;
        }

        Properties messages = new Properties();

        if ("de".equals(language)) {
            // German messages
            messages.setProperty("app.name", "Eckert Preisser Enterprise");
            messages.setProperty("app.welcome", "Willkommen bei Eckert Preisser");

            // Navigation
            messages.setProperty("nav.home", "Startseite");
            messages.setProperty("nav.products", "Produkte");
            messages.setProperty("nav.dashboard", "Dashboard");
            messages.setProperty("nav.account", "Konto");
            messages.setProperty("nav.login", "Anmelden");
            messages.setProperty("nav.logout", "Abmelden");
            messages.setProperty("nav.solutions", "Lösungen");
            messages.setProperty("nav.archive", "Archiv");
            messages.setProperty("nav.contact", "Kontakt");

            // User messages
            messages.setProperty("user.profile", "Profil");
            messages.setProperty("user.settings", "Einstellungen");
            messages.setProperty("user.created", "Benutzer erfolgreich erstellt");
            messages.setProperty("user.updated", "Benutzer erfolgreich aktualisiert");
            messages.setProperty("user.deleted", "Benutzer erfolgreich gelöscht");
            messages.setProperty("user.not.found", "Benutzer nicht gefunden");
            messages.setProperty("user.already.exists", "Benutzer existiert bereits");
            messages.setProperty("user.welcome", "Willkommen, {0}!");

            // Buttons
            messages.setProperty("button.save", "Speichern");
            messages.setProperty("button.cancel", "Abbrechen");
            messages.setProperty("button.delete", "Löschen");
            messages.setProperty("button.edit", "Bearbeiten");
            messages.setProperty("button.submit", "Absenden");
            messages.setProperty("button.back", "Zurück");
            messages.setProperty("button.next", "Weiter");
            messages.setProperty("button.get.started", "Jetzt starten");
            messages.setProperty("button.learn.more", "Mehr erfahren");

            // Forms
            messages.setProperty("form.email", "E-Mail");
            messages.setProperty("form.password", "Passwort");
            messages.setProperty("form.first.name", "Vorname");
            messages.setProperty("form.last.name", "Nachname");
            messages.setProperty("form.phone", "Telefon");
            messages.setProperty("form.address", "Adresse");

            // Validation messages
            messages.setProperty("validation.required", "Dieses Feld ist erforderlich");
            messages.setProperty("validation.email.invalid", "Ungültige E-Mail-Adresse");
            messages.setProperty("validation.password.weak", "Passwort ist zu schwach");
            messages.setProperty("validation.password.mismatch", "Passwörter stimmen nicht überein");

            // Error messages
            messages.setProperty("error.something.went.wrong", "Etwas ist schief gelaufen");
            messages.setProperty("error.try.again", "Bitte versuchen Sie es erneut");
            messages.setProperty("error.internal", "Ein interner Fehler ist aufgetreten");
            messages.setProperty("error.unauthorized", "Nicht autorisiert");
            messages.setProperty("error.forbidden", "Zugriff verweigert");
            messages.setProperty("error.not.found", "Ressource nicht gefunden");

            // Success messages
            messages.setProperty("success.saved", "Erfolgreich gespeichert");
            messages.setProperty("success.deleted", "Erfolgreich gelöscht");
            messages.setProperty("success.updated", "Erfolgreich aktualisiert");

            // Home Page
            messages.setProperty("home.hero.title", "Willkommen bei");
            messages.setProperty("home.hero.subtitle", "Enterprise-Level-Lösungen für moderne Unternehmen. Gebaut mit modernster Technologie und für Skalierbarkeit konzipiert.");
            messages.setProperty("home.features.title", "Warum");
            messages.setProperty("home.feature.fast.title", "Blitzschnell");
            messages.setProperty("home.feature.fast.desc", "Mit Blick auf Performance gebaut. Optimiert für Geschwindigkeit und Effizienz.");
            messages.setProperty("home.feature.secure.title", "Sicher");
            messages.setProperty("home.feature.secure.desc", "Enterprise-Grade-Sicherheit mit JWT-Authentifizierung und OAuth2-Unterstützung.");
            messages.setProperty("home.feature.scalable.title", "Skalierbar");
            messages.setProperty("home.feature.scalable.desc", "Microservices-Architektur entwickelt, um mit Ihrem Unternehmen zu wachsen.");

        } else if ("en".equals(language)) {
            // English messages
            messages.setProperty("app.name", "Eckert Preisser Enterprise");
            messages.setProperty("app.welcome", "Welcome to Eckert Preisser");

            // Navigation
            messages.setProperty("nav.home", "Home");
            messages.setProperty("nav.products", "Products");
            messages.setProperty("nav.dashboard", "Dashboard");
            messages.setProperty("nav.account", "Account");
            messages.setProperty("nav.login", "Login");
            messages.setProperty("nav.logout", "Logout");
            messages.setProperty("nav.solutions", "Solutions");
            messages.setProperty("nav.archive", "Archive");
            messages.setProperty("nav.contact", "Contact");

            // User messages
            messages.setProperty("user.profile", "Profile");
            messages.setProperty("user.settings", "Settings");
            messages.setProperty("user.created", "User created successfully");
            messages.setProperty("user.updated", "User updated successfully");
            messages.setProperty("user.deleted", "User deleted successfully");
            messages.setProperty("user.not.found", "User not found");
            messages.setProperty("user.already.exists", "User already exists");
            messages.setProperty("user.welcome", "Welcome, {0}!");

            // Buttons
            messages.setProperty("button.save", "Save");
            messages.setProperty("button.cancel", "Cancel");
            messages.setProperty("button.delete", "Delete");
            messages.setProperty("button.edit", "Edit");
            messages.setProperty("button.submit", "Submit");
            messages.setProperty("button.back", "Back");
            messages.setProperty("button.next", "Next");
            messages.setProperty("button.get.started", "Get Started");
            messages.setProperty("button.learn.more", "Learn More");

            // Forms
            messages.setProperty("form.email", "Email");
            messages.setProperty("form.password", "Password");
            messages.setProperty("form.first.name", "First Name");
            messages.setProperty("form.last.name", "Last Name");
            messages.setProperty("form.phone", "Phone");
            messages.setProperty("form.address", "Address");

            // Validation messages
            messages.setProperty("validation.required", "This field is required");
            messages.setProperty("validation.email.invalid", "Invalid email address");
            messages.setProperty("validation.password.weak", "Password is too weak");
            messages.setProperty("validation.password.mismatch", "Passwords do not match");

            // Error messages
            messages.setProperty("error.something.went.wrong", "Something went wrong");
            messages.setProperty("error.try.again", "Please try again");
            messages.setProperty("error.internal", "An internal error occurred");
            messages.setProperty("error.unauthorized", "Unauthorized");
            messages.setProperty("error.forbidden", "Access denied");
            messages.setProperty("error.not.found", "Resource not found");

            // Success messages
            messages.setProperty("success.saved", "Successfully saved");
            messages.setProperty("success.deleted", "Successfully deleted");
            messages.setProperty("success.updated", "Successfully updated");

            // Home Page
            messages.setProperty("home.hero.title", "Welcome to");
            messages.setProperty("home.hero.subtitle", "Enterprise-level solutions for modern businesses. Built with cutting-edge technology and designed for scale.");
            messages.setProperty("home.features.title", "Why Choose");
            messages.setProperty("home.feature.fast.title", "Lightning Fast");
            messages.setProperty("home.feature.fast.desc", "Built with performance in mind. Optimized for speed and efficiency.");
            messages.setProperty("home.feature.secure.title", "Secure");
            messages.setProperty("home.feature.secure.desc", "Enterprise-grade security with JWT authentication and OAuth2 support.");
            messages.setProperty("home.feature.scalable.title", "Scalable");
            messages.setProperty("home.feature.scalable.desc", "Microservices architecture designed to scale with your business.");
        }

        try (var writer = Files.newBufferedWriter(messageFile, StandardCharsets.UTF_8)) {
            messages.store(writer, "Eckert Preisser i18n - " + language.toUpperCase());
        }

        LoggerUtil.info(logger, "I18N_001", "Created message file",
            Map.of("language", language, "file", messageFile.getFileName()));
    }

    /**
     * Load all message files into cache
     */
    private static void loadAllMessages() {
        loadMessages("de");
        loadMessages("en");
    }

    /**
     * Load messages for specific language
     */
    private static void loadMessages(String language) {
        try {
            Path messageFile = Paths.get(I18N_DIR, "messages_" + language + ".properties");

            if (!Files.exists(messageFile)) {
                LoggerUtil.warn(logger, "I18N_WARN_001", "Message file not found",
                    Map.of("language", language));
                return;
            }

            Properties messages = new Properties();
            try (InputStream input = Files.newInputStream(messageFile);
                 InputStreamReader reader = new InputStreamReader(input, StandardCharsets.UTF_8)) {
                messages.load(reader);
                messageCache.put(language, messages);
                LoggerUtil.info(logger, "I18N_002", "Loaded messages",
                    Map.of("language", language, "count", messages.size()));
            }
        } catch (IOException e) {
            LoggerUtil.error(logger, "I18N_ERR_002", "Failed to load messages", e,
                Map.of("language", language));
        }
    }

    /**
     * Get message by key and language
     */
    public static String getMessage(String key, String language) {
        Properties messages = messageCache.get(language);

        if (messages == null) {
            messages = messageCache.get(DEFAULT_LANGUAGE);
        }

        if (messages == null) {
            return key;
        }

        return messages.getProperty(key, key);
    }

    /**
     * Get message with default language (German)
     */
    public static String getMessage(String key) {
        return getMessage(key, DEFAULT_LANGUAGE);
    }

    /**
     * Get formatted message with parameters
     */
    public static String getMessage(String key, String language, Object... params) {
        String message = getMessage(key, language);
        return formatMessage(message, params);
    }

    /**
     * Format message with parameters
     */
    private static String formatMessage(String message, Object... params) {
        if (params == null || params.length == 0) {
            return message;
        }

        String result = message;
        for (int i = 0; i < params.length; i++) {
            result = result.replace("{" + i + "}", String.valueOf(params[i]));
        }
        return result;
    }

    /**
     * Reload all messages (useful for hot-reload)
     */
    public static void reloadMessages() {
        messageCache.clear();
        loadAllMessages();
        LoggerUtil.info(logger, "I18N_003", "Reloaded all messages");
    }

    /**
     * Get all supported languages
     */
    public static String[] getSupportedLanguages() {
        return new String[]{"de", "en"};
    }
}
