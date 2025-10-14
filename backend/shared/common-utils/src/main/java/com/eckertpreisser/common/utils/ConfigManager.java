package com.eckertpreisser.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Config Manager for External Configuration
 *
 * Generates and manages external configuration files
 * No .env files - everything is managed through YAML configs
 *
 * Usage:
 * ConfigManager.initializeConfigIfNotExists();
 */
public class ConfigManager {

    private static final Logger logger = LoggerFactory.getLogger(ConfigManager.class);
    private static final String CONFIG_DIR = "config";
    private static final String CONFIG_FILE = "application.yml";
    private static final String DATABASE_CONFIG_FILE = "database.yml";
    private static final String MAIL_CONFIG_FILE = "mail.yml";
    private static final String LANGUAGE_CONFIG_FILE = "language.yml";

    private ConfigManager() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * Initialize all configuration files if they don't exist
     */
    public static void initializeConfigIfNotExists() {
        try {
            createConfigDirectory();
            createApplicationConfig();
            createDatabaseConfig();
            createMailConfig();
            createLanguageConfig();

            LoggerUtil.info(logger, "CONFIG_001", "Configuration initialized successfully",
                Map.of("configDir", CONFIG_DIR));
        } catch (Exception e) {
            LoggerUtil.error(logger, "CONFIG_ERR_001", "Failed to initialize configuration", e);
            throw new RuntimeException("Failed to initialize configuration", e);
        }
    }

    /**
     * Create config directory if it doesn't exist
     */
    private static void createConfigDirectory() throws IOException {
        Path configPath = Paths.get(CONFIG_DIR);
        if (!Files.exists(configPath)) {
            Files.createDirectories(configPath);
            LoggerUtil.info(logger, "CONFIG_002", "Created config directory",
                Map.of("path", configPath.toAbsolutePath()));
        }
    }

    /**
     * Create main application configuration
     */
    private static void createApplicationConfig() throws IOException {
        Path configFile = Paths.get(CONFIG_DIR, CONFIG_FILE);
        if (Files.exists(configFile)) {
            LoggerUtil.info(logger, "CONFIG_003", "Application config already exists",
                Map.of("file", configFile.getFileName()));
            return;
        }

        Map<String, Object> config = new LinkedHashMap<>();

        // Server configuration
        Map<String, Object> server = new LinkedHashMap<>();
        server.put("port", 8080);
        config.put("server", server);

        // Application configuration
        Map<String, Object> application = new LinkedHashMap<>();
        application.put("name", "eckert-preisser-enterprise");
        application.put("version", "1.0.0");
        application.put("default-language", "de");
        config.put("application", application);

        // Security configuration
        Map<String, Object> security = new LinkedHashMap<>();
        Map<String, Object> jwt = new LinkedHashMap<>();
        jwt.put("secret", "CHANGE_THIS_SECRET_KEY_IN_PRODUCTION");
        jwt.put("expiration", 86400000); // 24 hours
        security.put("jwt", jwt);
        config.put("security", security);

        writeYamlFile(configFile, config);
        LoggerUtil.info(logger, "CONFIG_004", "Created application config",
            Map.of("file", configFile.getFileName()));
    }

    /**
     * Create database configuration
     */
    private static void createDatabaseConfig() throws IOException {
        Path configFile = Paths.get(CONFIG_DIR, DATABASE_CONFIG_FILE);
        if (Files.exists(configFile)) {
            return;
        }

        Map<String, Object> config = new LinkedHashMap<>();

        Map<String, Object> datasource = new LinkedHashMap<>();
        datasource.put("url", "jdbc:postgresql://localhost:5432/eckert_preisser");
        datasource.put("username", "postgres");
        datasource.put("password", "CHANGE_THIS_PASSWORD");
        datasource.put("driver-class-name", "org.postgresql.Driver");
        config.put("datasource", datasource);

        Map<String, Object> jpa = new LinkedHashMap<>();
        Map<String, Object> hibernate = new LinkedHashMap<>();
        hibernate.put("ddl-auto", "validate");
        jpa.put("hibernate", hibernate);
        jpa.put("show-sql", false);
        config.put("jpa", jpa);

        Map<String, Object> pool = new LinkedHashMap<>();
        pool.put("maximum-pool-size", 10);
        pool.put("minimum-idle", 5);
        config.put("connection-pool", pool);

        writeYamlFile(configFile, config);
        LoggerUtil.info(logger, "CONFIG_005", "Created database config",
            Map.of("file", configFile.getFileName()));
    }

    /**
     * Create mail configuration
     */
    private static void createMailConfig() throws IOException {
        Path configFile = Paths.get(CONFIG_DIR, MAIL_CONFIG_FILE);
        if (Files.exists(configFile)) {
            return;
        }

        Map<String, Object> config = new LinkedHashMap<>();

        Map<String, Object> mail = new LinkedHashMap<>();
        mail.put("host", "smtp.gmail.com");
        mail.put("port", 587);
        mail.put("username", "your-email@example.com");
        mail.put("password", "CHANGE_THIS_PASSWORD");
        mail.put("from", "noreply@eckert-preisser.com");
        mail.put("from-name", "Eckert Preisser");

        Map<String, Object> properties = new LinkedHashMap<>();
        Map<String, Object> smtp = new LinkedHashMap<>();
        smtp.put("auth", true);
        smtp.put("starttls-enable", true);
        properties.put("smtp", smtp);
        mail.put("properties", properties);

        config.put("mail", mail);

        writeYamlFile(configFile, config);
        LoggerUtil.info(logger, "CONFIG_006", "Created mail config",
            Map.of("file", configFile.getFileName()));
    }

    /**
     * Create language configuration
     */
    private static void createLanguageConfig() throws IOException {
        Path configFile = Paths.get(CONFIG_DIR, LANGUAGE_CONFIG_FILE);
        if (Files.exists(configFile)) {
            return;
        }

        Map<String, Object> config = new LinkedHashMap<>();

        Map<String, Object> languages = new LinkedHashMap<>();
        languages.put("default", "de");
        languages.put("supported", java.util.Arrays.asList("de", "en"));
        languages.put("fallback", "en");
        config.put("languages", languages);

        Map<String, Object> i18n = new LinkedHashMap<>();
        i18n.put("messages-path", "config/i18n/messages");
        i18n.put("encoding", "UTF-8");
        config.put("i18n", i18n);

        writeYamlFile(configFile, config);
        LoggerUtil.info(logger, "CONFIG_007", "Created language config",
            Map.of("file", configFile.getFileName()));
    }

    /**
     * Write YAML file
     */
    private static void writeYamlFile(Path file, Map<String, Object> data) throws IOException {
        DumperOptions options = new DumperOptions();
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
        options.setPrettyFlow(true);

        Yaml yaml = new Yaml(options);

        try (Writer writer = new FileWriter(file.toFile())) {
            writer.write("# Eckert Preisser Enterprise Configuration\n");
            writer.write("# Generated automatically - Please configure before production use\n");
            writer.write("# Last modified: " + java.time.LocalDateTime.now() + "\n\n");
            yaml.dump(data, writer);
        }
    }

    /**
     * Load configuration from external file
     */
    public static Map<String, Object> loadConfig(String configFileName) throws IOException {
        Path configFile = Paths.get(CONFIG_DIR, configFileName);

        if (!Files.exists(configFile)) {
            LoggerUtil.warn(logger, "CONFIG_WARN_001", "Config file not found",
                Map.of("file", configFileName));
            return new LinkedHashMap<>();
        }

        Yaml yaml = new Yaml();
        try (InputStream inputStream = new FileInputStream(configFile.toFile())) {
            Map<String, Object> config = yaml.load(inputStream);
            LoggerUtil.info(logger, "CONFIG_008", "Loaded config file",
                Map.of("file", configFileName));
            return config;
        }
    }

    /**
     * Get config directory path
     */
    public static String getConfigDirectory() {
        return Paths.get(CONFIG_DIR).toAbsolutePath().toString();
    }
}
