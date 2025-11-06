package com.eckertpreisser.configserver.repository;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.configserver.model.ConfigType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.yaml.snakeyaml.Yaml;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

/**
 * ConfigRepository - File-based configuration storage
 *
 * Handles reading and writing configuration files in modular structure.
 * Supports .properties (i18n) and .yml (app configs, feature flags).
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
@Repository
public class ConfigRepository {

    private static final Logger logger = LoggerFactory.getLogger(ConfigRepository.class);
    private static final String CONFIG_DIR = "config";
    private final Yaml yaml = new Yaml();

    /**
     * Load configuration from file
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @return Map of configuration key-value pairs
     */
    public Map<String, String> load(String category, String language, ConfigType type) {
        Path filePath = getFilePath(category, language, type);

        if (!Files.exists(filePath)) {
            LoggerUtil.info(logger, "CONFIG_REPO_001", "Config file does not exist yet",
                    Map.of("path", filePath.toString()));
            return new HashMap<>();
        }

        try {
            if (type == ConfigType.I18N) {
                return loadProperties(filePath);
            } else {
                return loadYaml(filePath);
            }
        } catch (IOException e) {
            LoggerUtil.error(logger, "CONFIG_REPO_ERR_001", "Failed to load config", e,
                    Map.of("path", filePath.toString()));
            return new HashMap<>();
        }
    }

    /**
     * Save configuration to file
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @param values Configuration key-value pairs
     */
    public void save(String category, String language, ConfigType type, Map<String, String> values) {
        Path filePath = getFilePath(category, language, type);

        try {
            // Ensure parent directory exists
            Files.createDirectories(filePath.getParent());

            if (type == ConfigType.I18N) {
                saveProperties(filePath, values, category, language);
            } else {
                saveYaml(filePath, values, category);
            }

            LoggerUtil.info(logger, "CONFIG_REPO_002", "Config saved successfully",
                    Map.of("path", filePath.toString(), "entries", values.size()));

        } catch (IOException e) {
            LoggerUtil.error(logger, "CONFIG_REPO_ERR_002", "Failed to save config", e,
                    Map.of("path", filePath.toString()));
        }
    }

    /**
     * Check if config file exists
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @return true if file exists
     */
    public boolean exists(String category, String language, ConfigType type) {
        Path filePath = getFilePath(category, language, type);
        return Files.exists(filePath);
    }

    /**
     * List all categories for a given type
     *
     * @param type Config type
     * @param language Language code (null for all)
     * @return List of category names
     */
    public List<String> listCategories(ConfigType type, String language) {
        Path basePath = getBasePath(type, language);

        if (!Files.exists(basePath)) {
            return new ArrayList<>();
        }

        try {
            return Files.list(basePath)
                    .filter(Files::isRegularFile)
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .map(name -> name.replaceFirst("\\.(properties|yml|yaml)$", ""))
                    .collect(Collectors.toList());
        } catch (IOException e) {
            LoggerUtil.error(logger, "CONFIG_REPO_ERR_003", "Failed to list categories", e,
                    Map.of("type", type.toString()));
            return new ArrayList<>();
        }
    }

    /**
     * Delete configuration file
     *
     * @param category Config category
     * @param language Language code (null for non-i18n)
     * @param type Config type
     * @return true if deleted successfully
     */
    public boolean delete(String category, String language, ConfigType type) {
        Path filePath = getFilePath(category, language, type);

        try {
            boolean deleted = Files.deleteIfExists(filePath);
            if (deleted) {
                LoggerUtil.info(logger, "CONFIG_REPO_003", "Config deleted",
                        Map.of("path", filePath.toString()));
            }
            return deleted;
        } catch (IOException e) {
            LoggerUtil.error(logger, "CONFIG_REPO_ERR_004", "Failed to delete config", e,
                    Map.of("path", filePath.toString()));
            return false;
        }
    }

    /**
     * List all available languages in i18n directory
     *
     * Scans config/i18n/ for language subdirectories (de, en, fr, etc.)
     *
     * @return List of language codes (e.g., ["de", "en"])
     */
    public List<String> listLanguages() {
        Path i18nPath = Paths.get(CONFIG_DIR, "i18n");

        if (!Files.exists(i18nPath)) {
            LoggerUtil.info(logger, "CONFIG_REPO_004", "i18n directory does not exist yet", Map.of());
            return new ArrayList<>();
        }

        try {
            return Files.list(i18nPath)
                    .filter(Files::isDirectory)
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .sorted()
                    .collect(Collectors.toList());
        } catch (IOException e) {
            LoggerUtil.error(logger, "CONFIG_REPO_ERR_005", "Failed to list languages", e, Map.of());
            return new ArrayList<>();
        }
    }

    // Private helper methods

    /**
     * Get file path for configuration
     */
    private Path getFilePath(String category, String language, ConfigType type) {
        String extension = (type == ConfigType.I18N) ? ".properties" : ".yml";

        return switch (type) {
            case I18N -> Paths.get(CONFIG_DIR, "i18n", language, category + extension);
            case APP -> Paths.get(CONFIG_DIR, "app", category + extension);
            case FEATURE_FLAG -> Paths.get(CONFIG_DIR, "features", category + extension);
            case CUSTOM -> Paths.get(CONFIG_DIR, "custom", category + extension);
        };
    }

    /**
     * Get base path for type
     */
    private Path getBasePath(ConfigType type, String language) {
        return switch (type) {
            case I18N -> Paths.get(CONFIG_DIR, "i18n", language != null ? language : "de");
            case APP -> Paths.get(CONFIG_DIR, "app");
            case FEATURE_FLAG -> Paths.get(CONFIG_DIR, "features");
            case CUSTOM -> Paths.get(CONFIG_DIR, "custom");
        };
    }

    /**
     * Load .properties file
     */
    private Map<String, String> loadProperties(Path filePath) throws IOException {
        Properties properties = new Properties();
        try (InputStream input = Files.newInputStream(filePath);
             InputStreamReader reader = new InputStreamReader(input, StandardCharsets.UTF_8)) {
            properties.load(reader);
        }

        Map<String, String> result = new HashMap<>();
        for (String key : properties.stringPropertyNames()) {
            result.put(key, properties.getProperty(key));
        }
        return result;
    }

    /**
     * Save .properties file
     */
    private void saveProperties(Path filePath, Map<String, String> values, String category, String language) throws IOException {
        Properties properties = new Properties();
        properties.putAll(values);

        try (BufferedWriter writer = Files.newBufferedWriter(filePath, StandardCharsets.UTF_8)) {
            // Write header
            writer.write("# Eckert Preisser Enterprise - i18n Configuration\n");
            writer.write("# Category: " + category + "\n");
            writer.write("# Language: " + language.toUpperCase() + "\n");
            writer.write("# Generated: " + new Date() + "\n");
            writer.write("#\n");
            writer.write("# DO NOT EDIT MANUALLY - Managed by Config Server\n");
            writer.write("\n");

            // Write sorted properties
            properties.stringPropertyNames().stream()
                    .sorted()
                    .forEach(key -> {
                        try {
                            writer.write(key + "=" + properties.getProperty(key) + "\n");
                        } catch (IOException e) {
                            throw new UncheckedIOException(e);
                        }
                    });
        }
    }

    /**
     * Load .yml file
     */
    @SuppressWarnings("unchecked")
    private Map<String, String> loadYaml(Path filePath) throws IOException {
        try (InputStream input = Files.newInputStream(filePath)) {
            Map<String, Object> yamlData = yaml.load(input);
            return flattenYaml(yamlData);
        }
    }

    /**
     * Save .yml file
     */
    private void saveYaml(Path filePath, Map<String, String> values, String category) throws IOException {
        Map<String, Object> nestedMap = unflattenYaml(values);

        try (BufferedWriter writer = Files.newBufferedWriter(filePath, StandardCharsets.UTF_8)) {
            // Write header
            writer.write("# Eckert Preisser Enterprise - Configuration\n");
            writer.write("# Category: " + category + "\n");
            writer.write("# Generated: " + new Date() + "\n");
            writer.write("#\n");
            writer.write("# DO NOT EDIT MANUALLY - Managed by Config Server\n");
            writer.write("\n");

            // Write YAML
            yaml.dump(nestedMap, writer);
        }
    }

    /**
     * Flatten nested YAML map to dot notation
     */
    private Map<String, String> flattenYaml(Map<String, Object> map) {
        Map<String, String> result = new HashMap<>();
        flattenYamlRecursive("", map, result);
        return result;
    }

    @SuppressWarnings("unchecked")
    private void flattenYamlRecursive(String prefix, Map<String, Object> map, Map<String, String> result) {
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String key = prefix.isEmpty() ? entry.getKey() : prefix + "." + entry.getKey();
            Object value = entry.getValue();

            if (value instanceof Map) {
                flattenYamlRecursive(key, (Map<String, Object>) value, result);
            } else {
                result.put(key, value != null ? value.toString() : "");
            }
        }
    }

    /**
     * Unflatten dot notation to nested map for YAML
     */
    @SuppressWarnings("unchecked")
    private Map<String, Object> unflattenYaml(Map<String, String> flatMap) {
        Map<String, Object> result = new HashMap<>();

        for (Map.Entry<String, String> entry : flatMap.entrySet()) {
            String[] keys = entry.getKey().split("\\.");
            Map<String, Object> current = result;

            for (int i = 0; i < keys.length - 1; i++) {
                current = (Map<String, Object>) current.computeIfAbsent(keys[i], k -> new HashMap<>());
            }

            current.put(keys[keys.length - 1], entry.getValue());
        }

        return result;
    }
}
