package com.eckertpreisser.medicallixservice;

import com.eckertpreisser.common.utils.LoggerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import java.util.Map;

/**
 * Medicallix Service Application
 *
 * AI-powered Medical Documentation Microservice
 *
 * Features:
 * - Speech-to-text conversation recording
 * - AI extraction of patient info from doctor's voice
 * - ICD-10 code suggestion
 * - Automatic structuring (Anamnese, Befund, Therapie, Procedere)
 * - Patient management
 *
 * Port: 8085
 * Eureka: Enabled
 * Database: PostgreSQL (medicallix_db)
 */
@SpringBootApplication(scanBasePackages = {
        "com.eckertpreisser.medicallixservice",
        "com.eckertpreisser.common"
})
@EnableDiscoveryClient
public class MedicallixServiceApplication {

    private static final Logger logger = LoggerFactory.getLogger(MedicallixServiceApplication.class);

    public static void main(String[] args) {
        LoggerUtil.info(logger, "MEDICALLIX_STARTUP_001", "Starting Medicallix Service",
                Map.of("port", "8085"));

        SpringApplication.run(MedicallixServiceApplication.class, args);

        LoggerUtil.info(logger, "MEDICALLIX_STARTUP_002", "Medicallix Service started successfully",
                Map.of("status", "UP"));
    }
}
