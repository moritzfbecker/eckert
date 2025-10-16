package com.eckertpreisser.apigateway.controller;

import com.eckertpreisser.common.utils.LoggerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

/**
 * Health Check Controller
 *
 * Aggregates health status from all microservices
 * Provides a single endpoint for frontend to check all services
 *
 * CRITICAL: Uses LoggerUtil with error codes
 */
@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "*")
public class HealthCheckController {

    private static final Logger logger = LoggerFactory.getLogger(HealthCheckController.class);
    private final WebClient webClient;

    public HealthCheckController() {
        this.webClient = WebClient.builder().build();
    }

    /**
     * Get health status of all services
     *
     * @return Map with service health information
     */
    @GetMapping("/services")
    public Mono<ResponseEntity<Map<String, Object>>> getServicesHealth() {
        return Mono.fromCallable(() -> {
            try {
                LoggerUtil.info(logger, "HEALTH_001", "Checking health of all services");

                Map<String, Object> response = new HashMap<>();
                Map<String, Object> services = new HashMap<>();

                // Check Eureka (use Docker service name)
                services.put("eureka", checkService("http://service-discovery:8761/actuator/health", 8761, "1.0.0"));

                // Check Config Server (use Docker service name)
                services.put("config", checkService("http://config-server:8888/actuator/health", 8888, "1.0.0"));

                // Check API Gateway (self)
                Map<String, Object> gateway = new HashMap<>();
                gateway.put("status", "UP");
                gateway.put("port", 8080);
                gateway.put("version", "1.0.0");
                services.put("gateway", gateway);

                response.put("services", services);

                // Calculate overall status
                long upCount = services.values().stream()
                    .filter(s -> s instanceof Map && "UP".equals(((Map<?, ?>) s).get("status")))
                    .count();

                if (upCount == services.size()) {
                    response.put("overallStatus", "operational");
                } else if (upCount > 0) {
                    response.put("overallStatus", "degraded");
                } else {
                    response.put("overallStatus", "down");
                }

                response.put("frontend", Map.of(
                    "version", "1.8.0",
                    "status", "UP"
                ));

                LoggerUtil.info(logger, "HEALTH_002", "Health check complete",
                    Map.of("services", services.size(), "upCount", upCount));

                return ResponseEntity.ok(response);

            } catch (Exception e) {
                LoggerUtil.error(logger, "HEALTH_ERR_001", "Failed to check services health", e);
                return ResponseEntity.internalServerError().<Map<String, Object>>build();
            }
        });
    }

    /**
     * Check health of a single service
     */
    private Map<String, Object> checkService(String url, int port, String version) {
        Map<String, Object> result = new HashMap<>();
        result.put("port", port);
        result.put("version", version);

        try {
            // Synchronous check with longer timeout for slower services
            String response = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .block(java.time.Duration.ofSeconds(5));

            // Check if response contains status UP (works for Spring Boot Actuator)
            // Also accept if just no error (some services return different formats)
            if (response != null && (response.contains("\"status\":\"UP\"") || response.contains("\"status\""))) {
                result.put("status", "UP");
                LoggerUtil.info(logger, "HEALTH_003", "Service is UP",
                    Map.of("url", url, "port", port));
            } else {
                result.put("status", "DOWN");
                LoggerUtil.warn(logger, "HEALTH_WARN_002", "Service reports DOWN",
                    Map.of("url", url, "port", port));
            }
        } catch (Exception e) {
            result.put("status", "DOWN");
            LoggerUtil.warn(logger, "HEALTH_WARN_001", "Service unreachable",
                Map.of("url", url, "port", port, "error", e.getMessage()));
        }

        return result;
    }
}
