package com.eckertpreisser.configserver.model;

/**
 * Config Type Enumeration
 *
 * Defines different types of configurations that can be managed
 * by the Config Server.
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
public enum ConfigType {
    /**
     * Internationalization (i18n) translations
     * File location: config/i18n/{language}/{category}.properties
     * Example: config/i18n/de/homepage.properties
     */
    I18N,

    /**
     * Application configuration
     * File location: config/app/{service}.yml
     * Example: config/app/api-gateway.yml
     */
    APP,

    /**
     * Feature flags
     * File location: config/features/flags.yml
     * Example: config/features/flags.yml
     */
    FEATURE_FLAG,

    /**
     * Custom configuration
     * File location: config/custom/{name}.yml or .properties
     * Example: config/custom/email-templates.yml
     */
    CUSTOM
}
